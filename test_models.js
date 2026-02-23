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
        const modelsToTest = [
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-2.5-pro",
            "gemini-2.5-flash-preview-09-2025"
        ];

        console.log("Testing models with key:", apiKey.substring(0, 10), "...");

        for (const modelName of modelsToTest) {
            try {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    tools: [{ googleSearch: {} }]
                });
                const result = await model.generateContentStream("Hello! Tell me a joke.");
                let text = "";
                for await (const chunk of result.stream) {
                    text += chunk.text();
                }
                console.log(`✅ ${modelName} with generateContentStream is AVAILABLE`);
            } catch (error) {
                console.log(`❌ ${modelName} with generateContentStream error: ${error.message}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
