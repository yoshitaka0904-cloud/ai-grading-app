import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing env variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// We need a way to create a user in auth.users. 
// Since we can't easily do that via the client without admin keys, 
// we will assume the user has created an account, 
// or we will provide instructions.
// However, we can seed the 'profiles' and 'exam_results' if we have a valid ID.

async function seed() {
    console.log('Seeding data...');

    // Attempting to see if we can find a user ID to link to.
    // In a real scenario, we might use service role key to create a user.
    // For now, let's just make a script that can be run after the user signs up.

    const testUserId = 'a659434b-7083-4ceb-a56c-384aea1a1f7f'; // As observed in browser logs

    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: testUserId,
            username: 'testuser',
            first_choice_university: '早稲田大学',
            grade: '高3'
        });

    if (profileError) {
        console.error('Error seeding profile:', profileError.message);
    } else {
        console.log('Profile seeded or already exists.');
    }

    const { error: resultError } = await supabase
        .from('exam_results')
        .insert([
            {
                user_id: testUserId,
                university_name: '早稲田大学',
                exam_subject: '日本史',
                exam_year: 2025,
                score: 85,
                max_score: 100,
                pass_probability: 'A',
                weakness_analysis: '近現代史に若干の課題がありますが、古代・中世は完璧です。',
                section_scores: [
                    { sectionId: 'I', score: 20, maxScore: 25 },
                    { sectionId: 'II', score: 25, maxScore: 25 },
                    { sectionId: 'III', score: 20, maxScore: 25 },
                    { sectionId: 'IV', score: 20, maxScore: 25 }
                ]
            }
        ]);

    if (resultError) {
        console.error('Error seeding exam result:', resultError.message);
    } else {
        console.log('Exam result seeded.');
    }
}

seed();
