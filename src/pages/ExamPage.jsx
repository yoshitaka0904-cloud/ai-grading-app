import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { gradeExamWithGemini } from '../services/geminiService';

const ExamPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { exam, universityName, universityId } = location.state || {};

    // Debug: Check what is actually being passed
    // alert(`Debug State: ID=${universityId}, Exam=${!!exam}`);
    console.log("ExamPage State:", location.state);

    const [answers, setAnswers] = useState({});
    const [grading, setGrading] = useState(false);
    const [gradingProgress, setGradingProgress] = useState('');
    const [logs, setLogs] = useState([]);
    // Initialize directly from the passed exam object
    // This restores the behavior to the "first version" where we relied on mock data
    const [examData, setExamData] = useState(exam || null);

    // Timer states
    const [timerStarted, setTimerStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
    const [timerExpired, setTimerExpired] = useState(false);

    const addLog = React.useCallback((msg) => {
        console.log(msg);
        setLogs(prev => [...prev, msg]);
    }, []);

    // Timer countdown effect
    useEffect(() => {
        if (!timerStarted || timerExpired) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setTimerExpired(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerStarted, timerExpired]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Start timer function
    const startTimer = () => {
        setTimerStarted(true);
        setTimeRemaining(60 * 60); // Reset to 60 minutes
        setTimerExpired(false);
    };

    // Removed useEffect fetching logic to restore stability
    // We now rely solely on the structure defined in mockData.js

    if (!exam) {
        return <div className="container">Exam not found. Please go back to home.</div>;
    }

    const handleAnswerChange = (questionId, value, isMultiple) => {
        setAnswers(prev => {
            if (isMultiple) {
                const current = prev[questionId] || [];
                // If value is already selected, remove it
                if (current.includes(value)) {
                    return { ...prev, [questionId]: current.filter(v => v !== value) };
                }
                // Otherwise add it
                return { ...prev, [questionId]: [...current, value] };
            }
            // Single selection (Radio)
            return { ...prev, [questionId]: value };
        });
    };

    const handleSubmit = async () => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            alert('APIキーが設定されていません。');
            return;
        }

        try {
            setGrading(true);
            setLogs(['採点を開始します...']);

            // Re-fetch images for grading context
            setGradingProgress("PDFを画像に変換中...");
            addLog("Step 1: 採点用にPDFを再読み込み中...");
            const images = await import('../utils/pdfUtils').then(m => m.convertPdfToImages(exam.pdfPath, (msg) => {
                addLog(msg);
                if (msg.includes("Page")) {
                    setGradingProgress(`PDF変換中: ${msg}`);
                }
            }));

            setGradingProgress("AIによる採点を実行中...");
            addLog("Step 2: 採点データを送信中...");

            // Format answers for submission (join arrays with comma)
            const formattedAnswers = Object.entries(answers).reduce((acc, [key, val]) => {
                acc[key] = Array.isArray(val) ? val.sort().join(', ') : val;
                return acc;
            }, {});

            let result;
            try {
                // Pass the loaded examData (with structure/answers) to the grading service
                result = await gradeExamWithGemini(apiKey, examData, formattedAnswers, images);
                console.log("Grading Result Raw:", result);
            } catch (apiError) {
                console.error("API Error:", apiError);
                throw new Error(`API Error: ${apiError.message}`);
            }

            if (!result) {
                throw new Error("採点結果が空でした。");
            }

            addLog("採点完了！結果画面へ移動します。");

            setGrading(false);
            navigate('/result', {
                state: {
                    result,
                    universityName,
                    examSubject: exam.subject,
                    isNewResult: true // Flag to indicate this is a new result that needs saving
                }
            });
        } catch (error) {
            console.error("Submit Error:", error);
            setGrading(false);
            addLog(`エラー発生: ${error.message}`);
            alert(`エラーが発生しました: ${error.message}`);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{
                padding: '1rem 2rem',
                background: 'var(--color-bg-glass)',
                borderBottom: 'var(--border-glass)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h1 style={{ fontSize: '1.2rem', margin: 0 }}>{universityName} - {exam.subject}</h1>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{exam.year}年度</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    {timerStarted && (
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            color: timerExpired ? '#ef4444' : (timeRemaining < 300 ? '#f59e0b' : '#10b981'),
                            padding: '0.5rem 1rem',
                            background: 'rgba(255,255,255,0.9)',
                            borderRadius: '8px',
                            border: `2px solid ${timerExpired ? '#ef4444' : (timeRemaining < 300 ? '#f59e0b' : '#10b981')}`
                        }}>
                            {timerExpired ? '時間切れ' : formatTime(timeRemaining)}
                        </div>
                    )}
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>
                        終了する
                    </button>
                </div>
            </header>



            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* PDF Viewer Area */}
                <div style={{ flex: 1, borderRight: 'var(--border-glass)', background: '#525659' }}>
                    {exam.type === 'pdf' ? (
                        <iframe
                            src={exam.pdfPath}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title="Exam PDF"
                        />
                    ) : (
                        <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
                            PDF not available for this exam type.
                        </div>
                    )}
                </div>

                {/* Answer Sheet Area */}
                <div style={{ width: '400px', background: 'var(--color-bg-primary)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {/* Start Screen Overlay */}
                    {!timerStarted && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255, 255, 255, 0.98)',
                            zIndex: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}>
                            <div style={{ textAlign: 'center', maxWidth: '320px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏱️</div>
                                <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1e293b' }}>
                                    試験を開始する前に
                                </h2>
                                <div style={{
                                    background: '#f8fafc',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    marginBottom: '2rem',
                                    textAlign: 'left',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', fontWeight: '600' }}>
                                        以下を確認してください：
                                    </p>
                                    <ul style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.8', paddingLeft: '1.2rem', margin: 0 }}>
                                        <li>筆記用具の準備</li>
                                        <li>静かな環境の確保</li>
                                        <li>制限時間は60分です</li>
                                        <li>途中で中断できません</li>
                                    </ul>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={startTimer}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 2rem',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                                    }}
                                >
                                    試験を開始
                                </button>
                            </div>
                        </div>
                    )}

                    <div style={{ padding: '1.5rem', borderBottom: 'var(--border-glass)' }}>
                        <h2 style={{ fontSize: '1.1rem' }}>解答用紙</h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                            問題を見て解答を入力してください。
                        </p>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {examData && examData.structure ? (
                            examData.structure.map((section) => (
                                <div key={section.id}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                                        {section.label || section.title || 'Section'}
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {/* Use specific questions array if available, otherwise generate based on count */}
                                        {(section.questions && section.questions.length > 0
                                            ? section.questions
                                            : Array.from({ length: section.count || 1 }).map((_, i) => ({ id: `${section.id}-${i + 1}`, type: section.type, options: section.options }))
                                        ).map((q, i) => {
                                            // Handle both object (from questions array) and generated index
                                            const questionId = q.id || `${section.id}-${i + 1}`;
                                            const qType = q.type || section.type || 'text';
                                            const qOptions = q.options || section.options || [];

                                            // Determine if multiple selection is allowed
                                            // Check if correctAnswer contains comma (e.g., "c, a")
                                            const isMultiple = q.correctAnswer && q.correctAnswer.includes(',');

                                            return (
                                                <div key={questionId} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                                    <span style={{ minWidth: '30px', fontWeight: '600', fontSize: '0.9rem', paddingTop: '0.2rem' }}>
                                                        {q.label || `(${i + 1})`}
                                                    </span>
                                                    {qType === 'selection' ? (
                                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                                            {qOptions.map(option => (
                                                                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                                    <input
                                                                        type={isMultiple ? "checkbox" : "radio"}
                                                                        name={questionId}
                                                                        value={option}
                                                                        checked={
                                                                            isMultiple
                                                                                ? (answers[questionId] || []).includes(option)
                                                                                : answers[questionId] === option
                                                                        }
                                                                        onChange={(e) => handleAnswerChange(questionId, e.target.value, isMultiple)}
                                                                        disabled={!timerStarted}
                                                                    />
                                                                    <span>{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <textarea
                                                            className="glass-panel"
                                                            style={{
                                                                width: '100%',
                                                                minHeight: section.height === 'medium' ? '120px' : '80px',
                                                                padding: '0.75rem',
                                                                resize: 'vertical',
                                                                background: 'white',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '8px',
                                                                fontFamily: 'inherit',
                                                                opacity: !timerStarted ? 0.5 : 1,
                                                                cursor: !timerStarted ? 'not-allowed' : 'text'
                                                            }}
                                                            placeholder="解答を入力..."
                                                            value={answers[questionId] || ''}
                                                            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                                                            disabled={!timerStarted}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                                Loading exam data...
                            </div>
                        )}
                    </div>

                    <div style={{ padding: '1.5rem', borderTop: 'var(--border-glass)', background: 'var(--color-bg-glass)' }}>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            onClick={handleSubmit}
                        >
                            AIで採点する
                        </button>
                    </div>
                </div>
            </div>
            {/* Log Overlay */}
            {logs.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    fontSize: '0.8rem',
                    fontFamily: 'monospace'
                }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '1px solid #555' }}>採点ログ</div>
                    {logs.map((log, i) => (
                        <div key={i}>{log}</div>
                    ))}
                    {grading && (
                        <div style={{ marginTop: '0.5rem', color: '#4ade80' }}>
                            <div style={{ fontWeight: 'bold' }}>{gradingProgress}</div>
                            <div className="animate-pulse">採点中...</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExamPage;
