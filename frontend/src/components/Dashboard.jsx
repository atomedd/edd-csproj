import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTopGames, setShowTopGames] = useState(false);
  const [username, setUsername] = useState("");
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.username) {
      setUsername(storedUser.username);
    }

    const fetchSteamOverview = async () => {
      try {
        const res = await API.get("/steam/overview");
        setOverview(res.data);

        // Fetch recent achievements if steamId is available
        if (res.data?.steamId) {
          const achRes = await API.get(`/steam/achievements/${res.data.steamId}`);
          setAchievements(achRes.data.achievements || []);
        }
      } catch (err) {
        console.error("Failed to fetch Steam overview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamOverview();
  }, []);

  return (
    <>
      {/* NAVIGATION BAR */}
      <Navbar />
      <div className="p-6">
        {loading ? (
          <p className="text-gray-500">Loading user data...</p>
        ) : !overview ? (
          // ACCOUNT WITHOUT ANY GAMING ACCOUNTS LINKED
          <>
            <h1 className="text-4xl font-bold mb-2">Welcome, {username}</h1>
            <h2 className="text-xl font-bold mb-6">You haven't linked any accounts yet...</h2>
            <p className="text-gray-600 mb-4">
              Link your first account to see your games, playtime and achievements!
            </p>
            <a
              href="http://localhost:3165/api/auth/steam"
              className="inline-block bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-950"
            >
              Link Steam Account
            </a>
          </>
        ) : (
          // ACCOUNT READY
          <>
            <div className="flex items-center gap-4 mb-6">
              {/* WELCOME BLOCK */}
              <div>
                <h1 className="text-4xl font-bold">Welcome, {username}</h1>

                {/* PROFILE PIC */}
                <img
                  src={overview.avatar}
                  alt="Steam Avatar"
                  className="w-40 h-40 rounded-full shadow m-10"
                />

                <p className="text-gray-700">
                  Total Hours Played: {(overview.totalPlaytime / 60).toFixed(1)}
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

            {/* MOST PLAYED GAMES */}
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
            </div>

            {/* RECENT ACHIEVEMENTS */}
            {achievements.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
                <ul className="space-y-3">
                  {achievements.map((a, idx) => (
                    <li key={idx} className="bg-white p-4 rounded shadow">
                      <p className="text-lg font-medium">
                        <span className="text-blue-600">{a.achievement}</span> unlocked in{" "}
                        <span className="italic">{a.gameName}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(a.unlockTime * 1000).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
