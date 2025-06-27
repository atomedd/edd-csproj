import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTopGames, setShowTopGames] = useState(false)

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
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        
        {/* WELCOME BLOCK START */}
        <div>
          <h1 className="text-2xl font-bold">Welcome, {overview.username || "Player"}</h1>
        {/* WELCOME BLOCK END */}

        {/* PROFILE PIC START */}
        <img
          src={overview.avatar}
          alt="Steam Avatar"
          className="w-16 h-16 rounded-full shadow"
        />
        {/* PROFILE PIC END */}


          <p className="text-gray-700">
            🎮 Total Hours Played: {(overview.totalPlaytime / 60).toFixed(1)}
          </p>
        </div>
      </div>


        {/* RECENT GAMES */}
        {overview.recentGames?.length > 0 && (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recently Played Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overview.recentGames.slice(0, 3).map((game) => (
                <div key={game.appid} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                    <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                    alt={game.name}
                    className="w-32 h-auto"
                    />
                    <div>
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p>Played for: {(game.playtime_forever / 60).toFixed(1)} hrs</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        )}


      {/*MOST PLAYED GAMES */}
      <div className="mb-6">
        <button
            onClick={() => setShowTopGames(!showTopGames)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
            {showTopGames ? "Hide Top 5 Games" : "Show Top 5 Games"}
        </button>

        {showTopGames && overview.topGames?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overview.topGames.map((game) => (
                <div key={game.appid} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                    <img
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                    alt={game.name}
                    className="w-32 h-auto"
                    />
                    <div>
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <p>Hours Played: {(game.playtime_forever / 60).toFixed(1)}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
            
        )}
        <Link
        to="/games" className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
         View All Owned Games
        </Link>
        </div>
    </div>
    </>
  );
}
