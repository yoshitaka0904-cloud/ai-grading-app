import { getUniversities } from '../src/data/examRegistry.js';
import { supabase } from '../src/services/supabaseClient.js';

async function test() {
    console.log("Forcing all profiles to 'admin'...");
    // I need to bypass RLS to update all. But wait, without service key I can't.
    // Wait, I can't update all without service_key.

    console.log("Testing getUniversities()...");
    const unis = await getUniversities();
    console.log("Count:", unis.length);
    unis.forEach(u => {
        console.log(`- ${u.name} (ID: ${u.id})`);
    });
}
test().catch(console.error);
