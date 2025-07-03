import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function SteamRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);

      API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Steam login failed to fetch user:", err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p className="text-center p-6">Linking your Steam account...</p>;
}
