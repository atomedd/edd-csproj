import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // Add this import
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnedGames from "./components/OwnedGames";


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


  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games" element={<OwnedGames />} />
          </Route>
          {/* Add a default redirect */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;