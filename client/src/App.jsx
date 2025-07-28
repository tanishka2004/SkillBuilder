import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
// import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SkillSelection from "./pages/SkillSelection"; 
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-140px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-selection" element={<SkillSelection />} /> 
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
