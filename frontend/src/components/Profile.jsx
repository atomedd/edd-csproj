import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "./Navbar";

/*STILL WORKING ON THIS*/

export default function Profile() {
  const [user, setUser] = useState(null);
  const [steamId, setSteamId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setSteamId(storedUser.steamId || "");
    }
  }, []);

  const handleLink = async () => {
    try {
      const res = await API.put("/steam/link", { steamId });

      const updatedUser = {
        ...user,
        steamId: res.data.steamId,
        steamLinked: true,
      };

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
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Steam ID:</strong> {user.steamId || "Not linked"}</p>
        <p><strong>Xbox Gamertag:</strong> {user.steamId || "Not linked"}</p>
        <p><strong>PSN ID</strong> {user.steamId || "Not linked"}</p>
      </div>
  
    
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your connections</h1>
      <p class="text-gray-600 mb-6">Manage your connected accounts</p>

      <ul className="space-y-6">
        {/* Steam */}
        <li className="border p-4 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Steam</h2>
          <p class="text-gray-600 mb-4">
            By connecting your Steam account, you acknowledge and agree 
            that your Steam ID will be publicly visible in the GameHUB API
            while your accounts are connected. If you do not want this
            information shared, please disconnect your accounts.
            </p>
          <button
            onClick={handleLink}
            className="bg-sky-900 text-white px-4 py-2 rounded hover:bg-sky-950"
          >
            Connect
          </button>
          {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </li>

        {/* XBOX BUTTON*/}
        <li className="border p-4 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Xbox</h2>
          <p class="text-gray-600 mb-4">
            By connecting your Xbox account, you acknowledge and agree 
            that your Xbox Gamertag will be publicly visible in the GameHUB API
            while your accounts are connected. If you do not want this
            information shared, please disconnect your accounts.
            </p>
          <a href="https://login.live.com/oauth20_authorize.srf?client_id=1f907974-e22b-4810-a9de-d9647380c97e&scope=xboxlive.signin+openid+profile+offline_access&redirect_uri=https%3a%2f%2fwww.xbox.com%2fauth%2fmsa%3faction%3dloggedIn%26locale_hint%3den-CA&response_type=code&state=eyJpZCI6IjAxOTdkMjFiLWJkMzgtN2M4Yi04Yzg0LTJjMjhkYzBiMjNkYyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7chttps%253A%252F%252Fwww.xbox.com%252Fen-CA%252Flive&response_mode=fragment&nonce=0197d21b-bd38-7d0b-b855-dc2894aee17b&prompt=select_account&code_challenge=CtzQDKWjP3hjbzIyw7iuKa-H4EoLGbP4poZObYZju2o&code_challenge_method=S256&x-client-SKU=msal.js.browser&x-client-Ver=3.20.0&uaid=220cda47c6cd405d8e047337b2d383bd&msproxy=1&issuer=mso&tenant=consumers&ui_locales=en-CA&client_info=1&epct=PAQABDgEAAABVrSpeuWamRam2jAF1XRQEUA3VXdXG7m-eHzlFqWQ1lOlG0qtepiDwYC8Fb8Qi_r0vDTL0kYaRNTZ7EE0Hzk5UETCx-nPm54Gm-br2PXZjp1ZjnKom-yr_H8fUX3wTCVKIqUEEjM7GVaPPWoAjeHLKes2NdP-hBQWLRk-pE8m_uBzsv8Va8i6QNSAzF8iZEOfcSMRy2vdIOZp_mcAxzSNX7GuLd5l7AAi8O4kn7UTxKCAA&jshs=0#"
           rel="noopener noreferrer"
           className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
           target="_blank"> Connect </a>
        </li>

        {/* PlayStation */}
        <li className="border p-4 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-2">PlayStation</h2>
          <p class="text-gray-600 mb-4">
            By connecting your Playstation Network ID, you acknowledge and agree 
            that your Playstation Network ID will be publicly visible in the GameHUB API
            while your accounts are connected. If you do not want this
            information shared, please disconnect your accounts.
            </p>
          <a href="https://my.account.sony.com/sonyacct/signin/?duid=0000000700090100610c04ca2d57a6142be5fea0fc82b55b04ca116f7f00d4048db090450353dc4e&response_type=code&client_id=e4a62faf-4b87-4fea-8565-caaabb3ac918&scope=web%3Acore&access_type=offline&state=f6fec5e0d74e97a2250a2530eed91dd2269794de056ef6f0c9209cd2e9898703&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&smcid=web%3Apdc&redirect_uri=https%3A%2F%2Fweb.np.playstation.com%2Fapi%2Fsession%2Fv1%2Fsession%3Fredirect_uri%3Dhttps%253A%252F%252Fio.playstation.com%252Fcentral%252Fauth%252Flogin%253Flocale%253Den_CA%2526postSignInURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F%2526cancelURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F%26x-psn-app-ver%3D%2540sie-ppr-web-session%252Fsession%252Fv5.40.7&auth_ver=v3&error=login_required&error_code=4165&error_description=User+is+not+authenticated&no_captcha=true&cid=c1a63f28-a1ae-41fe-8d5c-ccb37d28be1e#/signin/input/id"
           rel="noopener noreferrer"
           className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-950"
           target="_blank"> Connect </a>
        </li>
      </ul>
    </div>
       </>
  );
}