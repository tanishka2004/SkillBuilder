import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex justify-between">
        <span>© {new Date().getFullYear()} SkillBuilder.</span>
        <span>Built with MERN + GPT-4</span>
      </div>
    </footer>
  );
};

export default Footer;
