const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

    const result = await model.generateContent(["Say hello from Gemini"]);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini Response:\n", text);
  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
  }
}

test();
