import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", formData);
    setMsg(res.data.msg);
  } catch (err) {
    console.error(err); // for debugging
    setMsg(err?.response?.data?.msg || "Something went wrong. Please try again.");
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" onChange={handleChange} placeholder="Username" className="w-full p-2 border rounded" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
      {msg && <p className="mt-4 text-sm text-green-600">{msg}</p>}
    </div>
  );
};

export default Register;
