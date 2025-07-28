import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);

  const { goal, level, time } = location.state || {};

  useEffect(() => {
    if (!goal || !level || !time) {
      navigate("/skill-selection");
      return;
    }

    const fetchRoadmap = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/generate-roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goal, level, timePerDay: time }),
        });

        const data = await response.json();
        console.log("Fetched roadmap:", data);

        setRoadmap(data.roadmap || {});
        setLoading(false);
      } catch (err) {
        console.error("Error fetching roadmap:", err);
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [goal, level, time, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="loader mb-4" />
        <p className="text-gray-600">Generating your roadmap with AI...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{roadmap.title || "Your Learning Roadmap"}</h1>
      <p className="text-gray-600 mb-8">{roadmap.summary || "Here's your personalized learning plan."}</p>

      {Array.isArray(roadmap.weeks) && roadmap.weeks.map((week, idx) => (
        <div key={idx} className="mb-6 p-6 border rounded shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">{week.title}</h2>
          {week.objectives && (
            <p className="text-gray-700">
              <strong>Objectives:</strong> {week.objectives.join(", ")}
            </p>
          )}
          {week.topics && (
            <p className="text-gray-700">
              <strong>Topics:</strong> {week.topics.join(", ")}
            </p>
          )}
          {week.practice && week.practice.length > 0 && (
            <p className="text-gray-700">
              <strong>Practice:</strong> {week.practice.join(", ")}
            </p>
          )}
        </div>
      ))}

      {/* fallback if weeks not available */}
      {!Array.isArray(roadmap.weeks) && (
        <div className="text-center text-red-500 font-medium">
          Oops! Roadmap format invalid. Please try again or check the backend response.
        </div>
      )}
    </div>
  );
};

export default Roadmap;
