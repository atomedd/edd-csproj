import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "./Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [steamId, setSteamId] = useState("");
  const [message, setMessage] = useState("");

  const isSteamLinked = user?.steamId && user.steamId.length > 5;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        setSteamId(res.data.steamId || "");
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLink = async () => {
    try {
      const res = await API.put("/steam/link", { steamId });
      const updatedUser = { ...user, steamId: res.data.steamId };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage("Steam account was linked");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to link Steam account");
    }
  };

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Steam ID:</strong> {user.steamId || "Not linked"}</p>
        <p><strong>Xbox Gamertag:</strong> {user.xboxId || "Not linked"}</p>
        <p><strong>PSN ID:</strong> {user.psnId || "Not linked"}</p>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold">Your connections</h1>
        <p className="text-gray-600 mb-6">Manage your connected accounts</p>

        <ul className="space-y-6">
          <li className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Steam</h2>
            <p className="text-gray-600 mb-4">
              By connecting your Steam account, you acknowledge and agree 
              that your Steam ID will be publicly visible in the GameHUB API
              while your accounts are connected.
            </p>
            {isSteamLinked ? (
              <button
                className="bg-green-700 text-white px-4 py-2 rounded cursor-not-allowed"
                disabled>Connected
              </button>
            ) : (
              <button
                onClick={handleLink}
                className="bg-sky-900 text-white px-4 py-2 rounded hover:bg-sky-950">Connect</button>
            )}
            {message && (
              <p className="mt-2 text-sm text-blue-700">{message}</p>
            )}
          </li>

          <li className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Xbox</h2>
            <p className="text-gray-600 mb-4">
              By connecting your Xbox account, you acknowledge and agree 
              that your Xbox Gamertag will be publicly visible in the GameHUB API.
            </p>
            <a href="https://login.live.com/oauth20_authorize.srf?client_id=1f907974-e22b-4810-a9de-d9647380c97e&scope=xboxlive.signin+openid+profile+offline_access&redirect_uri=https%3a%2f%2fwww.xbox.com%2fauth%2fmsa%3faction%3dloggedIn%26locale_hint%3den-CA&response_type=code"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              target="_blank">Connect</a>
          </li>

          <li className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">PlayStation</h2>
            <p className="text-gray-600 mb-4">
              By connecting your PlayStation ID, you acknowledge and agree 
              that your PSN ID will be publicly visible in the GameHUB API.
            </p>
              <a href="https://my.account.sony.com/sonyacct/signin/"
              rel="noopener noreferrer"
              className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-950"
              target="_blank"> Connect</a>
          </li>
        </ul>
      </div>
    </>
  );
}
