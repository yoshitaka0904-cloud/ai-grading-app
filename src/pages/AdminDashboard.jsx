import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminExams, deleteAdminExam, importMockData } from '../services/adminExamService';

function AdminDashboard() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        setLoading(true);
        const { data, error } = await getAdminExams();
        if (error) {
            console.error('Error fetching exams:', error);
            alert('試験データの取得に失敗しました。');
        } else {
            setExams(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('本当にこの試験マスターデータを削除しますか？\n削除すると元に戻せません。')) {
            const { error } = await deleteAdminExam(id);
            if (error) {
                console.error('Error deleting exam:', error);
                alert('削除に失敗しました。');
            } else {
                fetchExams();
            }
        }
    };

    const handlePreview = (rawExam) => {
        const formattedExam = {
            id: rawExam.id,
            university: rawExam.university,
            universityId: rawExam.university_id,
            faculty: rawExam.faculty,
            facultyId: rawExam.faculty_id,
            year: rawExam.year,
            subject: rawExam.subject,
            subjectEn: rawExam.subject_en,
            type: rawExam.type,
            pdfPath: rawExam.pdf_path,
            maxScore: rawExam.max_score,
            detailedAnalysis: rawExam.detailed_analysis,
            structure: rawExam.structure
        };

        navigate(`/exam/${formattedExam.universityId}-${formattedExam.facultyId}-preview`, {
            state: {
                exam: formattedExam,
                universityName: formattedExam.university,
                universityId: formattedExam.universityId
            }
        });
    };

    const handleImport = async () => {
        if (window.confirm('ダミーデータをSupabaseに一括登録します。よろしいですか？')) {
            setLoading(true);
            const count = await importMockData();
            alert(`${count}件の試験データを登録しました！`);
            fetchExams();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-navy-blue">管理者ページ: 試験マスター管理</h1>
                    <Link
                        to="/admin/exam/new"
                        className="bg-navy-blue hover:bg-navy-light text-white font-bold py-2 px-6 rounded shadow transition-colors"
                    >
                        ＋ 新規作成
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center my-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-blue"></div>
                    </div>
                ) : exams.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center flex flex-col items-center gap-4">
                        <p className="text-gray-500 mb-2">登録されている試験データがありません。</p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleImport}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow transition-colors"
                            >
                                初期データを読み込む
                            </button>
                            <Link to="/admin/exam/new" className="bg-navy-blue hover:bg-navy-light text-white font-bold py-2 px-6 rounded shadow transition-colors">
                                新しく作成する
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / ファイル名</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大学 / 学部</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年度 / 科目</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {exams.map((exam) => (
                                        <tr key={exam.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{exam.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-navy-blue">{exam.university}</div>
                                                <div className="text-sm text-gray-500">{exam.faculty}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{exam.year}年度</div>
                                                <div className="text-sm text-gray-500">{exam.subject} ({exam.subject_en})</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(exam.created_at).toLocaleDateString('ja-JP')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handlePreview(exam)} className="text-green-600 hover:text-green-900 mr-4 font-bold">
                                                    プレビュー
                                                </button>
                                                <Link to={`/admin/exam/${exam.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    編集
                                                </Link>
                                                <button onClick={() => handleDelete(exam.id)} className="text-red-600 hover:text-red-900">
                                                    削除
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
