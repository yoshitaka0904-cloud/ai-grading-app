
const text = `
\`\`\`json
{
    "score": 85,
    "passProbability": "A",
    "weaknessAnalysis": "Good job! You are in the top 10\\% of students.",
    "questionFeedback": []
}
\`\`\`
`;

const textWithInvalidEscape = `
\`\`\`json
{
    "score": 85,
    "passProbability": "A",
    "weaknessAnalysis": "Good job! You are in the top 10\\% of students.",
    "questionFeedback": []
}
\`\`\`
`;

function parse(input) {
    console.log("Original:", input);
    let jsonString = input.replace(/```json/g, '').replace(/```/g, '').trim();
    console.log("After markdown strip:", jsonString);

    // The fix I applied
    jsonString = jsonString.replace(/\\%/g, '%');
    console.log("After sanitize:", jsonString);

    try {
        const obj = JSON.parse(jsonString);
        console.log("Parsed successfully:", obj);
    } catch (e) {
        console.error("Parse error:", e.message);
    }
}

console.log("--- Test 1: Normal ---");
parse(text);

console.log("\n--- Test 2: With Invalid Escape ---");
parse(textWithInvalidEscape);
