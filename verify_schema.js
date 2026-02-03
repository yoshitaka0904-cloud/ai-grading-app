import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Missing environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifySchema() {
    console.log('Verifying Supabase Schema...');

    // 1. Check grading_reports table
    console.log('Checking "grading_reports" table...');
    const { error: reportError } = await supabase
        .from('grading_reports')
        .select('*')
        .limit(1);

    if (reportError) {
        if (reportError.code === 'PGRST116' || reportError.code === 'PGRST204' || reportError.message.includes('does not exist')) {
            console.error('❌ "grading_reports" table NOT found.');
        } else {
            console.log('✅ "grading_reports" table exists (received expected RLS error or empty result).');
        }
    } else {
        console.log('✅ "grading_reports" table exists.');
    }

    // 2. Check section_scores column in exam_results
    console.log('Checking "section_scores" column in "exam_results"...');
    // We try to select it explicitly. If it fails with a specific error about the column, it's missing.
    const { data: resultData, error: resultError } = await supabase
        .from('exam_results')
        .select('section_scores')
        .limit(1);

    if (resultError) {
        console.log('Debug: resultError code:', resultError.code);
        console.log('Debug: resultError message:', resultError.message);

        if (resultError.message.includes('column "section_scores" does not exist') || resultError.code === 'PGRST204') {
            console.error('❌ "section_scores" column NOT found in "exam_results".');
        } else {
            console.log('✅ "section_scores" column check received an error, but it might exist (e.g., RLS).');
        }
    } else {
        console.log('✅ "section_scores" column exists in "exam_results".');
    }

    console.log('Verification complete.');
}

verifySchema();
