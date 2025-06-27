import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnedGames from "./components/OwnedGames";
import Profile from "./components/Profile";
import SteamRedirectHandler from "./components/SteamRedirectHandler"; 

function App() {
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


          <Route path="/" element={<SteamRedirectHandler />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
