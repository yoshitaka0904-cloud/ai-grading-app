import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserResults } from '../services/resultService';
import { useNavigate } from 'react-router-dom';

const WeaknessPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [weaknesses, setWeaknesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterSubject, setFilterSubject] = useState('all');

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const fetchWeaknesses = async () => {
            const { data, error } = await getUserResults(user.id);
            if (error) {
                console.error("Error fetching results:", error);
                setLoading(false);
                return;
            }

            const allWeaknesses = [];
            data.forEach(result => {
                if (result.question_feedback && Array.isArray(result.question_feedback)) {
                    result.question_feedback.forEach(item => {
                        if (!item.correct) {
                            allWeaknesses.push({
                                ...item,
                                universityName: result.university_name,
                                examSubject: result.exam_subject,
                                examDate: result.created_at,
                                resultId: result.id
                            });
                        }
                    });
                }
            });

            setWeaknesses(allWeaknesses);
            setLoading(false);
        };

        fetchWeaknesses();
    }, [user, navigate]);

    const subjects = ['all', ...new Set(weaknesses.map(w => w.examSubject))];

    const filteredWeaknesses = filterSubject === 'all'
        ? weaknesses
        : weaknesses.filter(w => w.examSubject === filterSubject);

    if (loading) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ fontSize: '1.2rem', color: '#888' }}>読み込み中...</div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '1000px', paddingBottom: '4rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📓 弱点克服ノート</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        過去に間違えた問題: 全{weaknesses.length}問
                    </p>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                    ダッシュボードに戻る
                </button>
            </header>

            {/* Filter */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {subjects.map(subject => (
                    <button
                        key={subject}
                        onClick={() => setFilterSubject(subject)}
                        style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: '20px',
                            border: '1px solid',
                            borderColor: filterSubject === subject ? 'var(--color-accent-primary)' : '#e2e8f0',
                            background: filterSubject === subject ? 'var(--color-accent-primary)' : 'white',
                            color: filterSubject === subject ? 'white' : '#64748b',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {subject === 'all' ? 'すべて' : subject}
                    </button>
                ))}
            </div>

            {/* List */}
            {filteredWeaknesses.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>素晴らしい！</h3>
                    <p style={{ color: '#888' }}>
                        {filterSubject === 'all'
                            ? '間違えた問題はまだありません。'
                            : 'この科目の間違えた問題はありません。'}
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {filteredWeaknesses.map((item, index) => (
                        <div key={`${item.resultId}-${item.id}-${index}`} className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid #ef4444' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <span style={{
                                        background: '#f1f5f9',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        color: '#64748b',
                                        fontWeight: '600'
                                    }}>
                                        {item.universityName} {item.examSubject}
                                    </span>
                                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                                        {new Date(item.examDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <span style={{ fontWeight: '700', color: '#ef4444' }}>不正解</span>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '700' }}>
                                問: {item.id}
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: '#fff1f2', padding: '1rem', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.25rem', fontWeight: '600' }}>あなたの解答</div>
                                    <div style={{ fontSize: '1.1rem' }}>{item.userAnswer || '(無回答)'}</div>
                                </div>
                                <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#10b981', marginBottom: '0.25rem', fontWeight: '600' }}>正解</div>
                                    <div style={{ fontSize: '1.1rem' }}>{item.correctAnswer}</div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>💡</span>
                                    <span style={{ fontWeight: '600', color: '#475569' }}>解説</span>
                                </div>
                                <p style={{ lineHeight: '1.7', color: '#334155' }}>
                                    {item.explanation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeaknessPage;
