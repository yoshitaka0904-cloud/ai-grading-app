import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUniversities } from '../data/examRegistry';

const UniversityPage = () => {
    const { universityId } = useParams();
    const navigate = useNavigate();
    const universities = getUniversities();
    const university = universities.find(u => u.id.toString() === universityId);

    if (!university) {
        return <div className="container">University not found</div>;
    }

    // Aggregate all exams from all faculties
    const allExams = [];
    if (university.faculties) {
        university.faculties.forEach(faculty => {
            if (faculty.exams) {
                faculty.exams.forEach((exam, index) => {
                    allExams.push({
                        ...exam,
                        facultyId: faculty.id,
                        facultyName: faculty.name,
                        originalExam: exam,
                        originalIndex: index,
                        uniqueId: `${faculty.id}-${exam.id || index}`
                    });
                });
            }
        });
    }

    // Extract unique years and subjects for the matrix
    const years = [...new Set(allExams.map(e => e.year))].sort((a, b) => b - a);
    const subjects = [...new Set(allExams.map(e => e.subject))];

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{university.name}</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>学部を選択してください</p>
            </header>

            {/* Exam Matrix View - Per Year */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {years.map(year => (
                    <div key={year} className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-accent-primary)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                            {year}年度
                        </h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', color: 'var(--color-text-secondary)', width: '150px' }}>
                                        学部 \ 科目
                                    </th>
                                    {subjects.map(subject => (
                                        <th key={subject} style={{ padding: '1rem', textAlign: 'center', borderBottom: '2px solid #e2e8f0', color: 'var(--color-text-primary)', fontSize: '1rem' }}>
                                            {subject}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {university.faculties.map(faculty => (
                                    <tr key={faculty.id}>
                                        <td style={{ padding: '1rem', fontWeight: '600', borderBottom: '1px solid #f1f5f9', color: 'var(--color-text-primary)' }}>
                                            {faculty.name}
                                        </td>
                                        {subjects.map(subject => {
                                            const exam = allExams.find(e => e.year === year && e.subject === subject && e.facultyId === faculty.id);
                                            return (
                                                <td key={`${faculty.id}-${subject}`} style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>
                                                    {exam ? (
                                                        <button
                                                            className="btn btn-primary"
                                                            style={{
                                                                fontSize: '0.8rem',
                                                                padding: '0.4rem 1rem',
                                                                borderRadius: '20px',
                                                                width: '100%',
                                                                maxWidth: '100px'
                                                            }}
                                                            onClick={() => navigate(`/exam/${universityId}-${exam.facultyId}-${exam.originalIndex}`, {
                                                                state: {
                                                                    exam: exam.originalExam,
                                                                    universityName: university.name,
                                                                    universityId: university.id
                                                                }
                                                            })}
                                                        >
                                                            解答する
                                                        </button>
                                                    ) : (
                                                        <span style={{ color: '#e2e8f0', fontSize: '1.2rem' }}>-</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
                {allExams.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                        過去問データが見つかりませんでした。
                    </div>
                )}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    大学一覧に戻る
                </button>
            </div>
        </div>
    );
};

export default UniversityPage;
