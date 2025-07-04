import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTopGames, setShowTopGames] = useState(false);
  const [username, setUsername] = useState("");
  const [steamId, setSteamId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.username) setUsername(storedUser.username);
    if (storedUser?.steamId) setSteamId(storedUser.steamId);

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

  return (
    <>
      <Navbar />
      <div className="p-6">
        {loading ? (
          <p className="text-gray-500">Loading user data...</p>
        ) : !overview ? (
          <>
            <h1 className="text-4xl font-bold mb-2">Welcome, {username || steamId}</h1>
            <h2 className="text-xl font-bold mb-6">You haven't linked any accounts yet...</h2>
            <p className="text-gray-600 mb-4">
              Link your first account to see your games, playtime and achievements!
            </p>
            <div className="flex flex-col items-start gap-4">
              <a
                href="http://localhost:3165/api/auth/steam"
                className="inline-block bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-950"
              >
                Link Steam Account
              </a>
              <a
                href="https://login.live.com/oauth20_authorize.srf?client_id=1f907974-e22b-4810-a9de-d9647380c97e&scope=xboxlive.signin+openid+profile+offline_access&redirect_uri=https%3a%2f%2fwww.xbox.com%2fauth%2fmsa%3faction%3dloggedIn%26locale_hint%3den-CA&response_type=code&state=eyJpZCI6IjAxOTdkMjFiLWJkMzgtN2M4Yi04Yzg0LTJjMjhkYzBiMjNkYyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7chttps%253A%252F%252Fwww.xbox.com%252Fen-CA%252Flive&response_mode=fragment&nonce=0197d21b-bd38-7d0b-b855-dc2894aee17b&prompt=select_account&code_challenge=CtzQDKWjP3hjbzIyw7iuKa-H4EoLGbP4poZObYZju2o&code_challenge_method=S256&x-client-SKU=msal.js.browser&x-client-Ver=3.20.0"
                className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Link Xbox Account
              </a>
              <a
                href="https://my.account.sony.com/sonyacct/signin/?duid=0000000700090100610c04ca2d57a6142be5fea0fc82b55b04ca116f7f00d4048db090450353dc4e&response_type=code&client_id=e4a62faf-4b87-4fea-8565-caaabb3ac918&scope=web%3Acore&access_type=offline&state=f6fec5e0d74e97a2250a2530eed91dd2269794de056ef6f0c9209cd2e9898703&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&smcid=web%3Apdc&redirect_uri=https%3A%2F%2Fweb.np.playstation.com%2Fapi%2Fsession%2Fv1%2Fsession%3Fredirect_uri%3Dhttps%253A%252F%252Fio.playstation.com%252Fcentral%252Fauth%252Flogin%253Flocale%253Den_CA%2526postSignInURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F%2526cancelURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F"
                className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-950"
              >
                Link Playstation Account
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold">Welcome, {username || steamId}</h1>
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
          </>
        )}
      </div>
    </>
  );
}
