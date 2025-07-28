import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SkillSelection = () => {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [timePerDay, setTimePerDay] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!goal || !level || !timePerDay) {
      alert("Please fill in all the fields");
      return;
    }

    // ✅ Pass data via state instead of query params
    navigate("/roadmap", {
      state: {
        goal,
        level,
        time: timePerDay,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Your Learning Roadmap
      </h2>

      <div className="space-y-4">
        {/* Goal Selection */}
        <div>
          <label className="block mb-1 font-medium">Choose your goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Goal --</option>
            <option value="web-dev">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="dsa">DSA Mastery</option>
            <option value="ai-ml">AI / Machine Learning</option>
          </select>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block mb-1 font-medium">Your current level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Level --</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Time per day */}
        <div>
          <label className="block mb-1 font-medium">Time per day</label>
          <select
            value={timePerDay}
            onChange={(e) => setTimePerDay(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Time --</option>
            <option value="30">30 mins</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleGenerate}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Generate Plan
        </button>
      </div>
    </div>
  );
};

export default SkillSelection;
