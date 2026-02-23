const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyCNvOnnLKCcC1k25goOUb1yDoqKNglFLTE";
const genAI = new GoogleGenerativeAI(apiKey);
async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello!");
    console.log("Success:", result.response.text());
  } catch (err) {
    console.error("Error:", err.message);
  }
}
run();
