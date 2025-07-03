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
    const token = res.data.token;
    
    localStorage.setItem("token", token);

    const userRes = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.setItem("user", JSON.stringify(userRes.data));

    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">GameHUB</h1>
        
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
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Login</button>
        </form>

        <p className="mt-4 text-center">
          New here?{" "}
          <Link to="/register" className="font-bold text-blue-500 hover:underline">
            Sign Up{" "}
          </Link>
            or login with:
        </p>  

        <div className="mt-4 text-center">
          <a href="http://localhost:3165/api/auth/steam" className="block p-2 bg-slate-800 text-white rounded hover:bg-slate-950">Steam</a> </div>
        
        <div className="mt-4 text-center">
          <a href="http://localhost:3165/api/auth/steam" className="block p-2 bg-green-600 text-white rounded hover:bg-green-700">Xbox</a> </div>
        
        <div className="mt-4 text-center">
          <a href="http://localhost:3165/api/auth/steam" className="block p-2 bg-blue-800 text-white rounded hover:bg-blue-950">Playstation</a> </div>

        
      </div>
    </div>
  );
}