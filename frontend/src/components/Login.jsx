import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);

      const meRes = await API.get("/auth/me");
      localStorage.setItem("user", JSON.stringify(meRes.data));      
      

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button 
            type="submit" 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">

          <a
          href="http://localhost:3165/api/auth/steam"
          className="block p-2 bg-[#171a21] text-white rounded hover:bg-[#363c44]"
        >
          <div className="flex items-center justify-center gap-2">
            <img
              src="https://store.steampowered.com/favicon.ico"
              alt="Steam"
              className="h-5 w-5"
            />
            Login with Steam
          </div>
        </a>
        </div>
        <p className="mt-4 text-center">
          New here?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}