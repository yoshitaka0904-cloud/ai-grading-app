import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Set up the worker
// In Node.js we don't need a worker file if we use the legacy build or configure it correctly, 
// but often it's easier to just disable worker or point to the file.
// For simplicity in this script, we'll try standard import.

const pdfPath = 'exam_data/hosei_english_2024.pdf';
const dataBuffer = fs.readFileSync(pdfPath);
const data = new Uint8Array(dataBuffer);

async function extractText() {
    try {
        const loadingTask = pdfjsLib.getDocument({ data: data });
        const doc = await loadingTask.promise;

        console.log('Number of pages:', doc.numPages);
        console.log('Info:', await doc.getMetadata());

        let fullText = '';
        // Read first 5 pages or all if less
        const numPagesToRead = Math.min(doc.numPages, 5);

        for (let i = 1; i <= numPagesToRead; i++) {
            const page = await doc.getPage(i);
            const textContent = await page.getTextContent();
            console.log(`Page ${i} items:`, textContent.items.length);
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        }

        console.log('Text Content Preview:');
        console.log(fullText.substring(0, 3000));

    } catch (err) {
        console.error('Error reading PDF:', err);
    }
}

extractText();
