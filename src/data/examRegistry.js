import { supabase } from '../services/supabaseClient';

/**
 * Fetches exams from Supabase and builds the nested universities data structure.
 */
export const getUniversities = async () => {
    try {
        const { data: exams, error } = await supabase
            .from('exams')
            .select('*');

        if (error) {
            console.error('Error fetching exams from Supabase:', error);
            return [];
        }

        const mergedUniversities = [];

        exams.forEach(exam => {
            let university = mergedUniversities.find(u => u.id === exam.university_id || u.name === exam.university);

            if (!university) {
                // Create new university if it doesn't exist
                university = {
                    id: exam.university_id || Date.now(),
                    name: exam.university,
                    type: "私立", // Default
                    faculties: []
                };
                mergedUniversities.push(university);
            }

            let faculty = university.faculties.find(f => f.id === exam.faculty_id || f.name === exam.faculty);

            if (!faculty) {
                // Create new faculty if it doesn't exist
                faculty = {
                    id: exam.faculty_id || exam.faculty.toLowerCase(),
                    name: exam.faculty,
                    exams: []
                };
                university.faculties.push(faculty);
            }

            // Map DB fields back to the format components expect
            const formattedExam = {
                id: exam.id,
                university: exam.university,
                universityId: exam.university_id,
                faculty: exam.faculty,
                facultyId: exam.faculty_id,
                year: exam.year,
                subject: exam.subject,
                subjectEn: exam.subject_en,
                type: exam.type,
                pdfPath: exam.pdf_path,
                maxScore: exam.max_score,
                detailedAnalysis: exam.detailed_analysis,
                structure: exam.structure
            };

            // Add exam if not already present
            if (!faculty.exams.find(e => e.id === formattedExam.id)) {
                faculty.exams.push(formattedExam);
            }
        });

        return mergedUniversities;
    } catch (err) {
        console.error('Failed to fetch and process universities data:', err);
        return [];
    }
};
