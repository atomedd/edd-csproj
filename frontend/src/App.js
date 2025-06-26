import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  if (token) {
    localStorage.setItem("token", token);
    window.location.href = "/dashboard"; // Redirect to dashboard
  }
}, []);

export default App;
