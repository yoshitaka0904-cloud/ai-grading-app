import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

async function testWebp() {
    try {
        // Let's create a dummy webp or just test the API with a tiny base64 image
        // This is a 1x1 pixel transparent gif just as a concept, but let's use a real base64 webp if possible
        // Actually, maybe the error is that `fileToBase64` returns the base64 string WITH newlines? No, FileReader doesn't.
        // Let's try to just call the API with a tiny supported image.
        const tinyPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

        const result = await model.generateContent([
            { inlineData: { mimeType: "image/png", data: tinyPngBase64 } },
            { text: "Describe this image." }
        ]);
        console.log("Success:", result.response.text());
    } catch (err) {
        console.error("Error:", err);
    }
}

testWebp();
