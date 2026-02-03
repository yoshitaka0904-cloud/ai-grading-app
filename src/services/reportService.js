import { supabase } from './supabaseClient'

export const reportGradingError = async (userId, reportData) => {
    const { data, error } = await supabase
        .from('grading_reports')
        .insert([{
            user_id: userId,
            university_name: reportData.universityName,
            exam_subject: reportData.examSubject,
            question_id: reportData.questionId,
            user_answer: reportData.userAnswer,
            correct_answer: reportData.correctAnswer,
            ai_explanation: reportData.aiExplanation,
            user_comment: reportData.userComment,
            created_at: new Date().toISOString()
        }])

    return { data, error }
}
