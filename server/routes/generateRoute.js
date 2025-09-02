const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.post("/", async (req, res) => {
  const { goal, level, timePerDay } = req.body;

  if (!goal || !level || !timePerDay) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const prompt = `
  Generate a structured learning roadmap in valid JSON only.
  Goal: ${goal}, Level: ${level}, Time per day: ${timePerDay} hours.

  Strictly output JSON in this format (no markdown, no extra text):
  {
    "title": "string",
    "steps": [
      { "title": "string", "description": "string", "resources": ["link1","link2"] }
    ]
  }
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("🔎 Full Gemini Response:", JSON.stringify(data, null, 2));

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // cleanup ```json ... ```
    text = text.replace(/```json|```/g, "").trim();

    let roadmap;
    try {
      roadmap = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON.parse failed. Raw output:", text);
      return res.status(500).json({
        msg: "Invalid roadmap format from Gemini",
        raw: text,
      });
    }

    // Validate structure
    if (roadmap?.steps && Array.isArray(roadmap.steps)) {
      return res.json({ roadmap });
    } else {
      console.warn("⚠️ Received invalid roadmap structure. Sending fallback.");
      return res.json({
        roadmap: {
          title: "Fallback Roadmap",
          steps: [
            {
              title: "Step 1",
              description: "Gemini response invalid, using mock roadmap.",
              resources: ["https://developer.mozilla.org/"],
            },
            {
              title: "Step 2",
              description: "Check server logs for Gemini output.",
              resources: ["https://ai.google.dev/"],
            },
          ],
        },
      });
    }
  } catch (err) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ msg: "Failed to generate roadmap" });
  }
});

module.exports = router;
