import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTopGames, setShowTopGames] = useState(false);

  useEffect(() => {
    const fetchSteamOverview = async () => {
      try {
        const res = await API.get("/steam/overview");
        setOverview(res.data);
      } catch (err) {
        console.error("Failed to fetch Steam overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamOverview();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading Steam data...</p>;
  if (!overview) return <p className="p-6 text-red-500">Steam data not available.</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {overview.accountName || "Player"}</h1>
            <p className="text-gray-600 mt-1">
              🎮 Total Hours Played: {overview.totalPlaytimeHours}
            </p>
          </div>
          <img
            src={overview.avatar}
            alt="Steam Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
        </div>

        {/* Recent Games */}
        {overview.recentGames?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recently Played Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {overview.recentGames.slice(0, 3).map((game) => (
                <div key={game.appid} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                    alt={game.name}
                    className="w-32 h-auto"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p className="text-sm text-gray-600">Played for: {(game.playtime_forever / 60).toFixed(1)} hrs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Games Dropdown */}
        <div className="mb-10">
          <button
            onClick={() => setShowTopGames(!showTopGames)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showTopGames ? "Hide Top 5 Games" : "Show Top 5 Games"}
          </button>

          {showTopGames && overview.topGames?.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {overview.topGames.map((game) => (
                <div key={game.appid} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                  <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                    alt={game.name}
                    className="w-32 h-auto"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p className="text-sm text-gray-600">Hours Played: {(game.playtime_forever / 60).toFixed(1)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Games */}
        <div className="text-center">
          <Link
            to="/games"
            className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            View All Owned Games
          </Link>
        </div>
      </div>
    </>
  );
}
