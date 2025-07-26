import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SkillBuilder
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/#features" className="text-sm text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-sm text-gray-600 hover:text-blue-600">
            How it works
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-sm px-4 py-2 rounded border text-blue-600 border-blue-600 hover:bg-blue-50">
                Login
              </Link>
              <Link to="/register" className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded border text-red-600 border-red-600 hover:bg-red-50"
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
