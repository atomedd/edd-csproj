import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SteamRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p className="p-6">Logging you in with Steam...</p>;
}
