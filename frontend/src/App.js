import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // Add this import
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import API from './api';

function App() {
  // Handle Steam OAuth redirect with token
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard"; // Redirect to dashboard
    }
  }, []);

  // Test backend connection function
  const testBackend = async () => {
    try {
      const res = await API.get('/'); // Or any test endpoint
      console.log(res.data);
    } catch (err) {
      console.error("Backend connection failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <button 
        onClick={testBackend} 
        className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-lg shadow-lg"
      >
        Test Backend
      </button>
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* Add a default redirect */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;