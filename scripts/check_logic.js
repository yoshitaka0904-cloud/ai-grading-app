import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getUniversities = async () => {
    try {
        const { data: exams, error } = await supabase.from('exams').select('*');
        if (error) { console.error('Error fetching exams:', error); return []; }

        const mergedUniversities = [];

        exams.forEach(exam => {
            let university = mergedUniversities.find(u => u.id === exam.university_id || u.name === exam.university);
            if (!university) {
                university = { id: exam.university_id || Date.now(), name: exam.university, type: '私立', faculties: [] };
                mergedUniversities.push(university);
            }

            let faculty = university.faculties.find(f => f.id === exam.faculty_id || f.name === exam.faculty);
            if (!faculty) {
                faculty = { id: exam.faculty_id || exam.faculty.toLowerCase(), name: exam.faculty, exams: [] };
                university.faculties.push(faculty);
            }

            const formattedExam = { id: exam.id, university: exam.university, universityId: exam.university_id, faculty: exam.faculty, facultyId: exam.faculty_id, year: exam.year, subject: exam.subject, subjectEn: exam.subject_en, type: exam.type, pdfPath: exam.pdf_path, maxScore: exam.max_score, detailedAnalysis: exam.detailed_analysis, mapStructure: exam.structure };
            if (!faculty.exams.find(e => e.id === formattedExam.id)) { faculty.exams.push(formattedExam); }
        });

        return mergedUniversities;
    } catch (err) { console.error('Failed to fetch:', err); return []; }
};

getUniversities().then(unis => {
    console.log('Got', unis.length, 'unis');
    unis.forEach(u => console.log('-', u.name, '(ID:', u.id, ')', 'Faculties:', u.faculties.length));
});
