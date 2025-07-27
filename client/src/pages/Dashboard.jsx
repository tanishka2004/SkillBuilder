import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext) || { username: "Guest" }; // ✅ use logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ this handles clearing user + localStorage
    navigate("/");
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user?.username} 👋</h1>
      <p className="mt-2 text-gray-600">This is your SkillBuilder Dashboard.</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
