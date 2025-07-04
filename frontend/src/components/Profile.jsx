import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "./Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);

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
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

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
        
        {/*STEAM CONNECT */}
        <ul className="space-y-6">
          <li className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Steam</h2>
            <p className="text-gray-600 mb-4">
              By connecting your Steam account, you acknowledge and agree 
              that your Steam ID will be publicly visible in the GameHUB API
              while your accounts are connected.
            </p>
            {isSteamLinked ? (
              <button className="bg-green-700 text-white px-4 py-2 rounded cursor-not-allowed"
                disabled>Connected</button>
            ) : (
              <a href="http://localhost:3165/api/auth/steam"
              className="inline-block bg-slate-800 text-white px-4 py-2 rounded hover:bg-green-950">Connect</a>
            )}
          </li>

          {/*XBOX CONNECT */}
          <li className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Xbox</h2>
            <p className="text-gray-600 mb-4">
              By connecting your Xbox account, you acknowledge and agree 
              that your Xbox Gamertag will be publicly visible in the GameHUB API.</p>
            <a href="https://login.live.com/oauth20_authorize.srf?client_id=1f907974-e22b-4810-a9de-d9647380c97e&scope=xboxlive.signin+openid+profile+offline_access&redirect_uri=https%3a%2f%2fwww.xbox.com%2fauth%2fmsa%3faction%3dloggedIn%26locale_hint%3den-CA&response_type=code&state=eyJpZCI6IjAxOTdkMjFiLWJkMzgtN2M4Yi04Yzg0LTJjMjhkYzBiMjNkYyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7chttps%253A%252F%252Fwww.xbox.com%252Fen-CA%252Flive&response_mode=fragment&nonce=0197d21b-bd38-7d0b-b855-dc2894aee17b&prompt=select_account"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Connect</a>
          </li>

          {/*PLAYSTATION CONNECT */}
          <li className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-2">PlayStation</h2>
            <p className="text-gray-600 mb-4">
              By connecting your PlayStation ID, you acknowledge and agree 
              that your PSN ID will be publicly visible in the GameHUB API.
            </p>
            <a href="https://my.account.sony.com/sonyacct/signin/?duid=0000000700090100610c04ca2d57a6142be5fea0fc82b55b04ca116f7f00d4048db090450353dc4e&response_type=code&client_id=e4a62faf-4b87-4fea-8565-caaabb3ac918&scope=web%3Acore&access_type=offline&state=f6fec5e0d74e97a2250a2530eed91dd2269794de056ef6f0c9209cd2e9898703&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&smcid=web%3Apdc&redirect_uri=https%3A%2F%2Fweb.np.playstation.com%2Fapi%2Fsession%2Fv1%2Fsession%3Fredirect_uri%3Dhttps%253A%252F%252Fio.playstation.com%252Fcentral%252Fauth%252Flogin%253Flocale%253Den_CA%2526postSignInURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F%2526cancelURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F"
              className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-950">Connect</a>
          </li>
        </ul>
      </div>
    </>
  );
}
