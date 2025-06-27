import { useEffect, useState } from "react";
import API from "../api";

export default function OwnedGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await API.get("/steam/overview");
        setGames(res.data.ownedGames || []);
      } catch (err) {
        console.error("Failed to load games", err);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Owned Games</h1>
      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
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
  );
}
