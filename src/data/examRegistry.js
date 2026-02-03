import { universities as staticUniversities } from './mockData';

// Use Vite's import.meta.glob to load all generated JSON files
const generatedExamsModules = import.meta.glob('./exams/*.json', { eager: true });

const generatedExams = Object.values(generatedExamsModules).map(mod => mod.default || mod);

/**
 * Merges static university data with generated exam data.
 */
export const getUniversities = () => {
    // Deep clone static universities to avoid mutating the original mock data
    const mergedUniversities = JSON.parse(JSON.stringify(staticUniversities));

    generatedExams.forEach(exam => {
        let university = mergedUniversities.find(u => u.id === exam.universityId || u.name === exam.university);

        if (!university) {
            // Create new university if it doesn't exist
            university = {
                id: exam.universityId || Date.now(),
                name: exam.university,
                type: "私立", // Default
                faculties: []
            };
            mergedUniversities.push(university);
        }

        let faculty = university.faculties.find(f => f.id === exam.facultyId || f.name === exam.faculty);

        if (!faculty) {
            // Create new faculty if it doesn't exist
            faculty = {
                id: exam.facultyId || exam.faculty.toLowerCase(),
                name: exam.faculty,
                exams: []
            };
            university.faculties.push(faculty);
        }

        // Add exam if not already present
        if (!faculty.exams.find(e => e.id === exam.id)) {
            faculty.exams.push(exam);
        }
    });

    return mergedUniversities;
};
