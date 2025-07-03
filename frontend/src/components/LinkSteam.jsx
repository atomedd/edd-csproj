import { useState } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext"; 

export default function LinkSteam() {
  const [steamId, setSteamId] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleLink = async () => {
    try {
      const res = await API.put("/steam/link", { steamId });
      setMessage(res.data.message || "Steam account linked!");

      const userRes = await API.get("/auth/me");
      setUser(userRes.data);

    } catch (err) {
      setMessage(err.response?.data?.message || "Linking failed.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manually Link Steam</h1>
      <input
        type="text"
        placeholder="Enter Steam ID"
        className="w-full p-2 mb-4 border rounded"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
      />

      {/*BUTTON*/}
      <button
        onClick={handleLink}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Link Steam Account
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
