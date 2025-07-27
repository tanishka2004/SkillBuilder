import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // ✅ Use logout instead of setUser
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Use context-provided logout
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-blue-600">
          SkillBuilder
        </Link>

        <div className="flex items-center gap-4">
          <a href="/#features" className="text-sm text-gray-600 hover:text-blue-600">
            Features
          </a>
          <a href="/#how-it-works" className="text-sm text-gray-600 hover:text-blue-600">
            How it works
          </a>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded border text-blue-600 border-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded border text-red-600 border-red-600 hover:bg-red-50 transition"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
