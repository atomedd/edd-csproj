import { useState, useEffect } from "react";
import API from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [steamId, setSteamId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setSteamId(storedUser?.steamId || "");
  }, []);

  const handleLink = async () => {
    try {
      await API.put("/steam/link", { steamId });
      setMessage("Steam account linked successfully.");
      // Update localStorage
      const updatedUser = { ...user, steamId, steamLinked: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to link Steam.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Steam ID:</strong> {user?.steamId || "Not linked"}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Link Steam Account</h2>
        <input
          type="text"
          placeholder="Enter your Steam ID"
          className="w-full p-2 border rounded mb-2"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
        />
        <button
          onClick={handleLink}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Link Steam
        </button>
        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
