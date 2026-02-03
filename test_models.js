import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("API Key not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // There isn't a direct listModels method on the client instance in the JS SDK easily accessible 
        // in the same way as python, but we can try to just run a generation on a few likely candidates
        // or use the model manager if exposed. 
        // Actually, the JS SDK doesn't expose listModels directly in the main entry point easily in all versions.
        // Let's try to just test a few models.

        const modelsToTest = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-flash-002",
            "gemini-1.5-pro",
            "gemini-1.5-pro-001",
            "gemini-1.5-pro-002",
            "gemini-pro-vision",
            "gemini-1.0-pro-vision-latest",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        console.log("Testing models...");

        for (const modelName of modelsToTest) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                console.log(`✅ ${modelName} is AVAILABLE`);
            } catch (error) {
                if (error.message.includes("404")) {
                    console.log(`❌ ${modelName} is NOT FOUND (404)`);
                } else {
                    console.log(`⚠️ ${modelName} error: ${error.message}`);
                }
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
