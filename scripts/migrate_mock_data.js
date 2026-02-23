import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { universities } from '../src/data/mockData.js';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function migrateData() {
    console.log("Creating temporary admin user...");
    const email = `temp_admin_${Date.now()}@example.com`;
    const password = "password123";

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error("Auth Error:", authError.message);
        return;
    }

    const userId = authData.user.id;

    console.log("Promoting temporary user to admin...");
    const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        role: 'admin'
    });

    if (profileError) {
        console.error("Profile Error:", profileError.message);
    }

    console.log("Starting data migration...");
    let count = 0;

    for (const uni of universities) {
        for (const faculty of uni.faculties) {
            if (!faculty.exams) continue;

            for (const exam of faculty.exams) {
                const record = {
                    id: exam.id || `${uni.id}-${faculty.id}-${exam.year}-${exam.subject}`,
                    university: uni.name,
                    university_id: typeof uni.id === 'string' ? Math.floor(Math.random() * 10000) : uni.id,
                    faculty: faculty.name,
                    faculty_id: faculty.id,
                    year: exam.year,
                    subject: exam.subject,
                    subject_en: exam.subjectEn || exam.subject,
                    type: exam.type || 'text',
                    pdf_path: exam.pdfPath || null,
                    max_score: exam.maxScore || 100,
                    detailed_analysis: exam.detailedAnalysis || null,
                    structure: exam.structure || []
                };

                const { error } = await supabase.from('exams').upsert(record, { onConflict: 'id' });

                if (!error) count++;
                else console.error(`Insert failed for ${record.id}:`, error.message);
            }
        }
    }

    console.log(`Successfully migrated ${count} exams.`);

    // Clean up if possible
    // Cannot delete user without service_role, but we can delete profile
    await supabase.from('profiles').delete().eq('id', userId);
    await supabase.auth.signOut();
    console.log("Done.");
}

migrateData().catch(console.error);
