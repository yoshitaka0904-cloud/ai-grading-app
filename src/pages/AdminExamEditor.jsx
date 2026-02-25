import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminExamById, saveAdminExam, uploadExamPdf } from '../services/adminExamService';
import { generateExamMasterData, regenerateQuestionExplanation } from '../services/adminGeminiService';

function AdminExamEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form states
    const [examId, setExamId] = useState('');
    const [university, setUniversity] = useState('');
    const [universityId, setUniversityId] = useState('');
    const [faculty, setFaculty] = useState('');
    const [facultyId, setFacultyId] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [subject, setSubject] = useState('');
    const [subjectEn, setSubjectEn] = useState('english');
    const [type, setType] = useState('pdf');
    const [generateDetailed, setGenerateDetailed] = useState(true);

    // PDF/Image files
    const [questionFiles, setQuestionFiles] = useState([]);
    const [answerFiles, setAnswerFiles] = useState([]);

    // JSON Data
    const [examData, setExamData] = useState(null);


    useEffect(() => {
        if (!isNew) {
            fetchExam();
        }
    }, [id]);

    const fetchExam = async () => {
        const { data, error } = await getAdminExamById(id);
        if (error) {
            alert('データの取得に失敗しました');
            navigate('/admin');
        } else if (data) {
            setExamId(data.id);
            setUniversity(data.university);
            setUniversityId(data.university_id);
            setFaculty(data.faculty);
            setFacultyId(data.faculty_id);
            setYear(data.year);
            setSubject(data.subject);
            setSubjectEn(data.subject_en);
            setType(data.type);
            setExamData({
                max_score: data.max_score,
                detailed_analysis: data.detailed_analysis,
                structure: data.structure,
                pdf_path: data.pdf_path
            });
        }
        setLoading(false);
    };

    const handleGenerate = async () => {
        if (questionFiles.length === 0 || answerFiles.length === 0 || !examId) {
            alert('ID、問題ファイル、解答ファイルは少なくとも1つずつ必須です。');
            return;
        }

        setGenerating(true);
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY_V2 || import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
                alert('【エラー】Gemini APIキーが設定されていません。\n\n' +
                    'ローカル環境の場合: .env.local に VITE_GEMINI_API_KEY または VITE_GEMINI_API_KEY_V2 を記述して再起動してください。\n' +
                    'Vercel環境の場合: Settings > Environment Variables に値を設定し、Redeployしてください。');
                setGenerating(false);
                return;
            }

            const result = await generateExamMasterData(
                apiKey,
                subjectEn,
                questionFiles,
                answerFiles,
                { id: examId, university, universityId: parseInt(universityId), faculty, facultyId, year: parseInt(year), subject, generateDetailed }
            );

            setExamData({
                max_score: result.max_score,
                detailed_analysis: result.detailed_analysis,
                structure: result.structure,
                pdf_path: result.pdf_path
            });
            alert('マスターデータの生成が完了しました！内容を確認・編集して保存してください。');
        } catch (error) {
            alert('生成中にエラーが発生しました。\n' + error.message);
        } finally {
            setGenerating(false);
        }
    };

    const handleSave = async () => {
        if (!examData || !examId) {
            alert('保存するデータがありません。');
            return;
        }

        setSaving(true);
        let finalPdfPath = examData.pdf_path || '';

        // If a new PDF file was selected, upload it to storage
        if (questionFiles && questionFiles.length > 0) {
            try {
                const { publicUrl, error: uploadError } = await uploadExamPdf(questionFiles[0], examId);
                if (uploadError) throw uploadError;
                if (publicUrl) {
                    finalPdfPath = publicUrl;
                }
            } catch (err) {
                alert('PDFのアップロードに失敗しました:\n' + err.message);
                setSaving(false);
                return;
            }
        }

        const payload = {
            id: examId,
            university,
            university_id: parseInt(universityId) || 0,
            faculty,
            faculty_id: facultyId,
            year: parseInt(year),
            subject,
            subject_en: subjectEn,
            type,
            pdf_path: finalPdfPath,
            max_score: parseInt(examData.max_score),
            detailed_analysis: examData.detailed_analysis,
            structure: examData.structure
        };

        const { error } = await saveAdminExam(payload);
        setSaving(false);

        if (error) {
            alert('保存に失敗しました:\n' + error.message);
        } else {
            alert('保存しました！');
            navigate('/admin');
        }
    };

    const handleSaveAndPreview = async () => {
        if (!examData || !examId) {
            alert('保存するデータがありません。');
            return;
        }

        setSaving(true);
        let finalPdfPath = examData.pdf_path || '';

        if (questionFiles && questionFiles.length > 0) {
            try {
                const { publicUrl, error: uploadError } = await uploadExamPdf(questionFiles[0], examId);
                if (uploadError) throw uploadError;
                if (publicUrl) {
                    finalPdfPath = publicUrl;
                }
            } catch (err) {
                alert('PDFのアップロードに失敗しました:\n' + err.message);
                setSaving(false);
                return;
            }
        }

        const payload = {
            id: examId,
            university,
            university_id: parseInt(universityId) || 0,
            faculty,
            faculty_id: facultyId,
            year: parseInt(year),
            subject,
            subject_en: subjectEn,
            type,
            pdf_path: finalPdfPath,
            max_score: parseInt(examData.max_score),
            detailed_analysis: examData.detailed_analysis,
            structure: examData.structure
        };

        const { error } = await saveAdminExam(payload);
        setSaving(false);

        if (error) {
            alert('保存に失敗しました:\n' + error.message);
        } else {
            const formattedExam = {
                id: payload.id,
                university: payload.university,
                universityId: payload.university_id,
                faculty: payload.faculty,
                facultyId: payload.faculty_id,
                year: payload.year,
                subject: payload.subject,
                subjectEn: payload.subject_en,
                type: payload.type,
                pdfPath: payload.pdf_path,
                maxScore: payload.max_score,
                detailedAnalysis: payload.detailed_analysis,
                structure: payload.structure
            };
            navigate(`/exam/${formattedExam.universityId}-${formattedExam.facultyId}-preview`, {
                state: {
                    exam: formattedExam,
                    universityName: formattedExam.university,
                    universityId: formattedExam.universityId
                }
            });
        }
    };

    const handleStructureChange = (sectionIdx, qIdx, field, value) => {
        const newStructure = [...examData.structure];
        if (qIdx === null) {
            newStructure[sectionIdx][field] = value;
        } else {
            if (field === 'options') {
                newStructure[sectionIdx].questions[qIdx][field] = value.split(',').map(s => s.trim());
            } else {
                newStructure[sectionIdx].questions[qIdx][field] = value;
            }
        }
        setExamData({ ...examData, structure: newStructure });
    };

    const handleRegenerateExplanation = async (sIdx, qIdx, q) => {
        if (!confirm(`問題 ${q.label || q.id} の解説を再生成しますか？\nGemini APIを呼び出します。`)) return;

        let oldExplanation = q.explanation;
        handleStructureChange(sIdx, qIdx, 'explanation', '再生成中...');

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY_V2 || import.meta.env.VITE_GEMINI_API_KEY;
            const newExplanation = await regenerateQuestionExplanation(
                apiKey,
                q,
                questionFiles,
                answerFiles
            );
            handleStructureChange(sIdx, qIdx, 'explanation', newExplanation);
        } catch (error) {
            alert('解説の再生成に失敗しました:\n' + error.message);
            handleStructureChange(sIdx, qIdx, 'explanation', oldExplanation || '');
        }
    };

    const handleAddQuestion = (sectionIdx) => {
        const newStructure = [...examData.structure];
        const questionsLength = newStructure[sectionIdx].questions.length;
        const lastQ = newStructure[sectionIdx].questions[questionsLength - 1];
        let nextId = "new";
        if (lastQ && !isNaN(parseInt(lastQ.id))) {
            nextId = String(parseInt(lastQ.id) + 1);
        }
        newStructure[sectionIdx].questions.push({
            id: nextId,
            label: `問${nextId}`,
            points: 0,
            correctAnswer: "",
            explanation: ""
        });
        setExamData({ ...examData, structure: newStructure });
    };

    const handleDeleteQuestion = (sectionIdx, qIdx) => {
        if (!confirm('この小問を削除しますか？')) return;
        const newStructure = [...examData.structure];
        newStructure[sectionIdx].questions.splice(qIdx, 1);
        setExamData({ ...examData, structure: newStructure });
    };

    const totalAllocatedPoints = examData?.structure?.reduce((acc, section) => {
        return acc + section.questions.reduce((qAcc, q) => qAcc + (parseInt(q.points) || 0), 0);
    }, 0) || 0;

    if (loading) return <div className="p-8 text-center text-gray-500">読み込み中...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pb-48">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-serif text-navy-blue">
                        {isNew ? '新規マスターデータ作成' : 'マスターデータ編集'}
                    </h1>
                    <button onClick={() => navigate('/admin')} className="text-gray-500 hover:text-gray-900">
                        戻る
                    </button>
                </div>

                {/* ID命名ルール */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <span className="text-yellow-400 text-xl font-bold">💡</span>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-bold text-yellow-800">各IDの命名ルール（重要）</h3>
                            <div className="mt-2 text-sm text-yellow-700 space-y-1">
                                <p><strong>ID (一意な英数字):</strong> URLの一部になります。必ず <code>[大学]-[学部]-[西暦]-[科目]</code> の形式にしてください。<br />例: <code>meiji-law-2025-english</code>, <code>kanda-2025-english</code></p>
                                <p><strong>大学ID (数値):</strong> 大学ごとの固定数値です。早慶(1,2)、MARCH(3~7)、日東駒専(8~11)...の順に番号を振ってください。</p>
                                <p><strong>学部ID (英数字):</strong> 学部ごとの固定文字列です。例: 法学部=<code>law</code>, 文学部=<code>bungaku</code></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 基本情報フォーム */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-bold border-b pb-2 mb-4">基本情報</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID (一意な英数字)</label>
                            <input type="text" value={examId} onChange={e => setExamId(e.target.value)} disabled={!isNew} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">大学名</label>
                            <input type="text" value={university} onChange={e => setUniversity(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">大学ID (数値)</label>
                            <input type="number" value={universityId} onChange={e => setUniversityId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">学部名</label>
                            <input type="text" value={faculty} onChange={e => setFaculty(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">学部ID (英数字)</label>
                            <input type="text" value={facultyId} onChange={e => setFacultyId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">年度</label>
                            <input type="number" value={year} onChange={e => setYear(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">科目名 (表示用)</label>
                            <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">科目ID (english, social...)</label>
                            <select value={subjectEn} onChange={e => setSubjectEn(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-blue focus:ring-navy-blue sm:text-sm p-2 border">
                                <option value="english">英語 (english)</option>
                                <option value="social">社会 (social)</option>
                                <option value="math">数学 (math)</option>
                                <option value="japanese">国語 (japanese)</option>
                                <option value="science">理科 (science)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* PDF生成 (新規時または再生成時) */}
                <div className="bg-white rounded-xl shadow p-6 border border-accent-gold">
                    <h2 className="text-xl font-bold border-b pb-2 mb-4 text-accent-gold">AIによる自動生成</h2>
                    <p className="text-sm text-gray-600 mb-4">問題と解答のファイル (PDF または 画像) をアップロードして、配点・解答・解説を自動生成します。複数ファイルの選択が可能です。</p>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">問題ファイル ({questionFiles.length}個選択中)</label>
                            <input type="file" multiple accept="application/pdf,image/webp,image/jpeg,image/png" onChange={e => setQuestionFiles(Array.from(e.target.files))} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">解答ファイル ({answerFiles.length}個選択中)</label>
                            <input type="file" multiple accept="application/pdf,image/webp,image/jpeg,image/png" onChange={e => setAnswerFiles(Array.from(e.target.files))} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                        <div className="flex items-center">
                            <input
                                id="generateDetailed"
                                type="checkbox"
                                checked={generateDetailed}
                                onChange={(e) => setGenerateDetailed(e.target.checked)}
                                className="h-4 w-4 text-navy-blue focus:ring-navy-blue border-gray-300 rounded"
                            />
                            <label htmlFor="generateDetailed" className="ml-2 block text-sm text-gray-900 font-medium">
                                Step2詳細解説 (英語長文等) をAIで生成する (時間がかかります)
                            </label>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="bg-accent-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded shadow transition-colors disabled:opacity-50"
                        >
                            {generating ? '生成中...' : 'AIで生成する'}
                        </button>
                    </div>
                </div>

                {/* データエディタ */}
                {examData && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded shadow-sm">
                            <h3 className="text-sm font-bold text-green-800">✅ PDFの自動アップロード機能</h3>
                            <p className="mt-1 text-sm text-green-700">
                                保存ボタンを押すと、選択したPDF（問題用紙）が自動的にセキュアサーバー（Supabase Storage）にアップロードされ、生徒のテスト画面で表示されるようになります。
                            </p>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h2 className="text-xl font-bold">マスターデータ編集</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSaveAndPreview}
                                    disabled={saving}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded shadow transition-colors disabled:opacity-50"
                                >
                                    {saving ? '保存中...' : '保存して解答プレビュー'}
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded shadow transition-colors disabled:opacity-50"
                                >
                                    {saving ? '保存中...' : 'データベースに保存'}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6 flex gap-6 items-end">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">満点 (合計配点)</label>
                                <input
                                    type="number"
                                    value={examData.max_score}
                                    onChange={e => setExamData({ ...examData, max_score: e.target.value })}
                                    className="block w-32 rounded-md border-gray-300 shadow-sm p-2 border"
                                />
                            </div>
                            <div className="pb-2">
                                <span className={`text-sm font-bold ${totalAllocatedPoints !== parseInt(examData.max_score) ? 'text-red-600' : 'text-green-600'}`}>
                                    現在の割当合計: {totalAllocatedPoints} 点
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {examData.structure.map((section, sIdx) => (
                                <div key={sIdx} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex items-center gap-4 mb-4">
                                        <input
                                            type="text"
                                            value={section.id}
                                            onChange={e => handleStructureChange(sIdx, null, 'id', e.target.value)}
                                            className="w-24 p-1 border rounded"
                                        />
                                        <input
                                            type="text"
                                            value={section.label}
                                            onChange={e => handleStructureChange(sIdx, null, 'label', e.target.value)}
                                            className="flex-1 p-1 border rounded"
                                            placeholder="大問ラベル"
                                        />
                                    </div>

                                    <table className="min-w-full bg-white border border-gray-200 text-sm">
                                        <thead className="bg-gray-100 border-b">
                                            <tr>
                                                <th className="px-2 py-2 text-left w-12">ID</th>
                                                <th className="px-2 py-2 text-left w-20">ラベル</th>
                                                <th className="px-2 py-2 text-left w-16">形式</th>
                                                <th className="px-2 py-2 text-left w-32">選択肢(カンマ区切り)</th>
                                                <th className="px-2 py-2 text-left w-16">配点</th>
                                                <th className="px-2 py-2 text-left w-20">正解</th>
                                                <th className="px-2 py-2 text-left">解説</th>
                                                <th className="px-2 py-2 text-center w-10">削除</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.questions.map((q, qIdx) => (
                                                <tr key={qIdx} className="border-b hover:bg-gray-50">
                                                    <td className="px-2 py-2">
                                                        <input type="text" value={q.id} onChange={e => handleStructureChange(sIdx, qIdx, 'id', e.target.value)} className="w-full p-1 border rounded text-xs" />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <input type="text" value={q.label} onChange={e => handleStructureChange(sIdx, qIdx, 'label', e.target.value)} className="w-full p-1 border rounded text-xs" />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <select value={q.type || 'text'} onChange={e => handleStructureChange(sIdx, qIdx, 'type', e.target.value)} className="w-full p-1 border rounded text-xs">
                                                            <option value="text">記述</option>
                                                            <option value="selection">選択</option>
                                                            <option value="complete">完答</option>
                                                            <option value="unordered">順不同</option>
                                                            <option value="mixed">併用(マーク/記述)</option>
                                                            <option value="correction">訂正</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <input type="text" value={q.options ? q.options.join(',') : ''} onChange={e => handleStructureChange(sIdx, qIdx, 'options', e.target.value)} disabled={!['selection', 'complete', 'unordered', 'mixed'].includes(q.type)} className="w-full p-1 border rounded text-xs disabled:bg-gray-200" placeholder="a,b,c,d" />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <input type="number" value={q.points} onChange={e => handleStructureChange(sIdx, qIdx, 'points', parseInt(e.target.value))} className="w-full p-1 border rounded text-xs" />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <input type="text" value={q.correctAnswer} onChange={e => handleStructureChange(sIdx, qIdx, 'correctAnswer', e.target.value)} className="w-full p-1 border rounded text-xs" />
                                                    </td>
                                                    <td className="px-2 py-2">
                                                        <div className="flex flex-col gap-1">
                                                            <textarea value={q.explanation || ''} onChange={e => handleStructureChange(sIdx, qIdx, 'explanation', e.target.value)} className="w-full p-1 border rounded text-xs h-10" />
                                                            <button
                                                                onClick={() => handleRegenerateExplanation(sIdx, qIdx, q)}
                                                                className="text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200 text-center w-full"
                                                                title="この問題の解説のみをAIで再生成する"
                                                            >
                                                                解説を再生成
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <button
                                                            onClick={() => handleDeleteQuestion(sIdx, qIdx)}
                                                            className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                                                            title="小問を削除"
                                                        >×</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="mt-3 text-right">
                                        <button
                                            onClick={() => handleAddQuestion(sIdx)}
                                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-1 px-4 rounded text-sm border border-blue-200 transition-colors"
                                        >
                                            ＋ 小問を追加
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <label className="block text-sm font-bold text-gray-700 mb-2">全体詳細解説 (Markdown)</label>
                            <textarea
                                value={examData.detailed_analysis}
                                onChange={e => setExamData({ ...examData, detailed_analysis: e.target.value })}
                                className="w-full p-4 border rounded shadow-sm font-mono text-sm leading-relaxed bg-gray-50 focus:bg-white transition-colors"
                                style={{ height: '800px', resize: 'vertical', overflowY: 'scroll', display: 'block' }}
                            />
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminExamEditor;
