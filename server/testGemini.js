require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Say hello from Gemini!");
    const text = result.response.text();
    console.log("✅ Gemini says:", text);
  } catch (err) {
    console.error("❌ Gemini Error:", err.message);
  }
}

testGemini();
