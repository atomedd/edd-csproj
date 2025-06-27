import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnedGames from "./components/OwnedGames";
import Profile from "./components/Profile";
import SteamCallback from "./components/SteamCallback";





function App() {
  // Handle Steam OAuth redirect with token
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.replace("/dashboard");
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/steam-callback" element={<SteamCallback />} />
          <Route element={<ProtectedRoute />}> {/* PROTECTED ROUTES */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games" element={<OwnedGames />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* DEFAUTL CALLBACK */}
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;