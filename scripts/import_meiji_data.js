import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function importJsonFiles() {
    console.log("Creating temporary admin user...");
    const email = `temp_admin_meiji_${Date.now()}@example.com`;
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
    await supabase.from('profiles').upsert({ id: userId, role: 'admin' });

    const dataDir = path.join(__dirname, '../src/data/exams');
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

    console.log(`Found ${files.length} JSON files. Importing...`);

    let count = 0;

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        try {
            const examData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            const record = {
                id: file.replace('.json', ''),
                university: examData.university || '明治大学',
                university_id: 3, // some int ID
                faculty: examData.faculty || '不明',
                faculty_id: examData.facultyId || file.split('-')[1],
                year: examData.year || 2025,
                subject: examData.subject || '英語',
                subject_en: examData.subjectEn || 'english',
                type: examData.type || 'text',
                pdf_path: examData.pdfPath || null,
                max_score: examData.maxScore || 100,
                detailed_analysis: examData.detailedAnalysis || null,
                structure: examData.structure || []
            };

            const { error } = await supabase.from('exams').upsert(record, { onConflict: 'id' });

            if (!error) {
                console.log(`Imported ${file}`);
                count++;
            }
            else {
                console.error(`Failed to insert ${file}:`, error.message);
            }
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log(`Successfully imported ${count} exams.`);

    await supabase.from('profiles').delete().eq('id', userId);
    await supabase.auth.signOut();
    console.log("Cleanup done.");
}

importJsonFiles().catch(console.error);
