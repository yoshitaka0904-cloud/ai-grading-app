/**
 * Hybrid Grading Engine
 * Programmatically grades objective questions (Selection, Terminology)
 * to save tokens and ensure 100% accuracy for fixed-answer questions.
 */

export const gradeObjectively = (examData, userAnswers) => {
    const questionFeedback = [];
    let score = 0;
    let maxScore = 0;

    examData.structure.forEach(section => {
        section.questions.forEach(q => {
            const userAnswer = userAnswers[q.id] || "";
            const correctAnswer = q.correctAnswer;
            maxScore += q.points || 0;

            // Only process objective types here
            // mixed and correction are always treated as subjective to allow AI evaluation of reasons/corrections
            const isObjective = ['selection', 'complete', 'unordered'].includes(q.type) || (q.type === 'text' && !q.gradingCriteria);

            if (isObjective) {
                const isCorrect = checkCorrectness(userAnswer, correctAnswer, q.type);
                if (isCorrect) {
                    score += q.points || 0;
                }

                questionFeedback.push({
                    id: q.id,
                    userAnswer: Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer,
                    correctAnswer: correctAnswer,
                    correct: isCorrect,
                    explanation: q.explanation || (isCorrect ? "正解です。" : "不正解です。正解を確認しましょう。"),
                    isSubjective: false
                });
            } else {
                // Mark for AI processing
                questionFeedback.push({
                    id: q.id,
                    userAnswer: userAnswer,
                    correctAnswer: correctAnswer,
                    points: q.points,
                    gradingCriteria: q.gradingCriteria,
                    isSubjective: true
                });
            }
        });
    });

    return {
        score,
        maxScore,
        questionFeedback,
        pendingAiGrading: questionFeedback.filter(f => f.isSubjective)
    };
};

const checkCorrectness = (userAnswer, correctAnswer, type) => {
    if (!userAnswer || !correctAnswer) return false;

    // Normalize for comparison
    const normalize = (val) => {
        if (!val) return "";
        return val.toString().trim().toLowerCase()
            .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)); // Full-width to half-width
    };

    const normUser = normalize(userAnswer);
    const normCorrect = normalize(correctAnswer);

    // Multi-selection (comma separated or array)
    if (correctAnswer.includes(',') || Array.isArray(userAnswer)) {
        const correctParts = normCorrect.split(',').map(s => s.trim()).filter(Boolean);
        const userParts = Array.isArray(userAnswer)
            ? userAnswer.map(normalize)
            : normUser.split(',').map(s => s.trim()).filter(Boolean);

        if (correctParts.length !== userParts.length) return false;

        if (type === 'unordered') {
            // Order does not matter
            return correctParts.every(p => userParts.includes(p));
        } else {
            // Strict order match for 'complete' or default
            return correctParts.every((p, i) => userParts[i] === p);
        }
    }

    return normUser === normCorrect;
};
