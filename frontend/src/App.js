import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnedGames from "./components/OwnedGames";
import Profile from "./components/Profile";
import { useEffect } from "react";

// Handles storing token from Steam redirect
function TokenHandler() {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState(null, "", window.location.pathname); // Clean up URL
    }
  }, []);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <TokenHandler />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games" element={<OwnedGames />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
