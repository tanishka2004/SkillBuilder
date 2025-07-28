const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-roadmap", async (req, res) => {
  const { goal, level, timePerDay } = req.body;

  if (!goal || !level || !timePerDay) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const prompt = `
You are an expert curriculum designer.
Create a detailed, ${level} level learning roadmap to master "${goal}" by studying ${timePerDay} minutes per day.
Break it into weekly modules. For each week include:
- Week title
- Learning objectives
- Topics
- (Optional) practice/project ideas
Return the response as clean JSON in this format:

{
  "title": "...",
  "summary": "...",
  "weeks": [
    {
      "title": "...",
      "objectives": ["..."],
      "topics": ["..."],
      "practice": ["..."]
    }
  ]
}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let roadmap;
    try {
      roadmap = JSON.parse(text);
    } catch {
      roadmap = { raw: text };
    }

    res.json({ roadmap });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ msg: "Failed to generate roadmap" });
  }
});

module.exports = router;
