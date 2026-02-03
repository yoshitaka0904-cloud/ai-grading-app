import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUniversities } from '../data/examRegistry';

const FacultyPage = () => {
    const { universityId, facultyId } = useParams();
    const navigate = useNavigate();
    const universities = getUniversities();
    const university = universities.find(u => u.id.toString() === universityId);
    const faculty = university?.faculties?.find(f => f.id === facultyId);

    if (!university || !faculty) {
        return <div className="container">Faculty not found</div>;
    }

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                    {university.name}
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{faculty.name}</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>受験する年度・科目を選択してください</p>
            </header>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {faculty.exams && faculty.exams.map((exam, index) => (
                    <div key={exam.id || index} className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                                    {exam.year}年 {exam.subject}
                                </h3>
                                {exam.type === 'pdf' && (
                                    <span style={{
                                        fontSize: '0.8rem',
                                        background: '#e0f2fe',
                                        color: '#0369a1',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '12px'
                                    }}>
                                        PDF採点対応
                                    </span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        if (exam.type === 'pdf' && exam.pdfPath) {
                                            window.open(exam.pdfPath, '_blank');
                                        } else {
                                            alert('印刷可能なPDFがありません。');
                                        }
                                    }}
                                >
                                    問題を表示
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/exam/${university.id}-${faculty.id}-${index}`, {
                                        state: {
                                            exam,
                                            universityName: university.name,
                                            universityId: university.id
                                        }
                                    })}
                                >
                                    解答する
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button className="btn btn-secondary" onClick={() => navigate(`/university/${universityId}`)}>
                    学部一覧に戻る
                </button>
            </div>
        </div>
    );
};

export default FacultyPage;
