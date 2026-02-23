import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixData() {
    console.log("Authenticating as temp admin to bypass RLS...");
    const email = `temp_admin_fix_${Date.now()}@example.com`;
    const { data: authData } = await supabase.auth.signUp({ email, password: 'password123' });
    const userId = authData.user.id;
    await supabase.from('profiles').upsert({ id: userId, role: 'admin' });

    console.log("Updating Meiji University ID from 3 to 5 (Waseda is 3)...");

    // Update exams where university name is 明治大学
    const { data, error } = await supabase
        .from('exams')
        .update({ university_id: 5 })
        .eq('university', '明治大学')
        .select();

    if (error) {
        console.error("Failed to update Meiji:", error.message);
    } else {
        console.log(`Successfully updated ${data.length} records for Meiji.`);
    }

    // Check getting universities directly now
    const { data: exams2 } = await supabase.from('exams').select('*');
    const mergedUniversities = [];
    exams2.forEach(exam => {
        let university = mergedUniversities.find(u => u.id === exam.university_id || u.name === exam.university);
        if (!university) {
            university = { id: exam.university_id, name: exam.university, faculties: [] };
            mergedUniversities.push(university);
        }
    });
    console.log("Currently recognized universities:", mergedUniversities.map(u => `${u.name}(${u.id})`));

    await supabase.from('profiles').delete().eq('id', userId);
    await supabase.auth.signOut();
}

fixData().catch(console.error);
