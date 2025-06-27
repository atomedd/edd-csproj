import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnedGames from "./components/OwnedGames";
import Profile from "./components/Profile";

function App() {
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

  //  if (token) {
  //    localStorage.setItem("token", token);
  //    window.location.href = "/dashboard";
  //  }
  //}, []);

  if (token) {
  localStorage.setItem("token", token);

  // Fetch and store user info
      fetch("http://localhost:3165/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
          window.location.href = "/login";
        });
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
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
