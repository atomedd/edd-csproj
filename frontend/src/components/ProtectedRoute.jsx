import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthorized(!!token);
  }, []);

  if (authorized === null) {
    return <p className="p-6">Signing you in...</p>; 
  }

  return authorized ? <Outlet /> : <Navigate to="/login" />;
}
