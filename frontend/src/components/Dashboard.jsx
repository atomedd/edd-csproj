import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {overview.username || "Player"}</h1>
      <p className="mb-6 text-gray-700">
        🎮 Total Hours Played: {(overview.totalPlaytime / 60).toFixed(1)}
      </p>

             {overview?.ownedGames?.length > 0 ? (
            <>
            <h2 className="text-xl font-semibold mb-4">Owned Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overview.ownedGames.map((game) => (
                <div key={game.appid} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                    <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                    alt={game.name}
                    className="w-32 h-auto"
                    />
                    <div>
                    <h2 className="text-lg font-bold">{game.name}</h2>
                    <p>Hours Played: {(game.playtime_forever / 60).toFixed(1)}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </>
        ) : (
        <p className="text-gray-600">No Steam games found or Steam not linked.</p>
        )}
    </div>
  );
}
