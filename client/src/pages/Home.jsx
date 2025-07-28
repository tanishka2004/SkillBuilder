import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Personalized, AI‑Powered Learning Roadmaps
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Tell us your goal, your level, and your time. SkillBuilder creates a
          structured, trackable plan—with summaries, quizzes, and an AI mentor.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/register" // <-- changed from "/register"
            className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/skill-selection"
            className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Create your roadmap
          </Link>

          <a
            href="#how-it-works"
            className="px-6 py-3 rounded border border-gray-300 hover:bg-gray-50"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Step
              num="1"
              title="Set your goal"
              desc="e.g., Data Science in 3 months, DSA in 45 days, Web Dev from scratch."
            />
            <Step
              num="2"
              title="Tell us your time"
              desc="Skill level + 1 hr/day, 2 hrs/day, etc. We schedule the plan for you."
            />
            <Step
              num="3"
              title="Learn with AI mentor"
              desc="Auto-summaries, quizzes, and an AI mentor that answers your doubts."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              title="GPT-powered roadmaps"
              desc="Adaptive, goal-based plans tailored to your level."
              emoji="🧠"
            />
            <Feature
              title="Time-based scheduling"
              desc="Daily modules planned around your availability."
              emoji="⏱️"
            />
            <Feature
              title="Progress tracking"
              desc="Mark modules done, visualize your journey."
              emoji="📈"
            />
            <Feature
              title="AI mentor chat"
              desc="Ask doubts related to your current module."
              emoji="💬"
            />
            <Feature
              title="Auto quizzes & summaries"
              desc="Reinforce learning with GPT-generated tests."
              emoji="📝"
            />
            <Feature
              title="MERN + GPT-4 stack"
              desc="Modern, scalable, industry-ready tech."
              emoji="🧰"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to build your roadmap?</h2>
        <p className="mt-2 text-blue-100">
          Get started for free. No credit card required.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100"
        >
          Create your account
        </Link>
      </section>
    </>
  );
};

const Step = ({ num, title, desc }) => (
  <div className="p-6 bg-white rounded border shadow-sm">
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
      {num}
    </div>
    <h3 className="mt-4 font-semibold text-lg">{title}</h3>
    <p className="text-gray-600 mt-2">{desc}</p>
  </div>
);

const Feature = ({ emoji, title, desc }) => (
  <div className="p-6 bg-white rounded border shadow-sm">
    <div className="text-3xl">{emoji}</div>
    <h3 className="mt-3 font-semibold text-lg">{title}</h3>
    <p className="text-gray-600 mt-2 text-sm">{desc}</p>
  </div>
);

export default Home;
