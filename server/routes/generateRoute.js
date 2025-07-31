const express = require("express");
const router = express.Router();
require("dotenv").config();

// ✅ Safe dynamic fetch setup (works in Node.js 18+ and older)
let _fetch = typeof fetch === "function" ? fetch : null;
if (!_fetch) {
  _fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
}

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
Return the response as clean JSON like:
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
    const response = await _fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: {
            text: prompt,
          },
        }),
      }
    );

    const data = await response.json();

    const text = data?.candidates?.[0]?.output ?? "";

    let roadmap;
    try {
      roadmap = JSON.parse(text);
    } catch {
      roadmap = { raw: text };
    }

    res.json({ roadmap });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ msg: "Failed to generate roadmap" });
  }
});

module.exports = router;
