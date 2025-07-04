import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", formData);
    const token = res.data.token;
    
    localStorage.setItem("token", token);

    const userRes = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.setItem("user", JSON.stringify(userRes.data));

    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">GameHUB</h1>
        
        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {"Please check your username and password and try again."}
          </div>
        )}

        <form onSubmit={handleSubmit}>


          <input
            type="text"
            placeholder="User"
            className="w-full p-2 mb-4 border rounded"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />


          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Login</button>
        </form>

        <p className="mt-4 text-center">
          New here?{" "}
          <Link to="/register" className="font-bold text-blue-500 hover:underline">
            Sign Up{" "}
          </Link>
            or login with:
        </p>  
        {/* STEAM BUTTON */}
        <div className="mt-4 text-center">
          <a href="http://localhost:3165/api/auth/steam" className="block p-2 bg-slate-800 text-white rounded hover:bg-slate-950">Steam</a> </div>
        {/* XBOX BUTTON */}
        <div className="mt-4 text-center">
          <a href="https://login.live.com/oauth20_authorize.srf?client_id=1f907974-e22b-4810-a9de-d9647380c97e&scope=xboxlive.signin+openid+profile+offline_access&redirect_uri=https%3a%2f%2fwww.xbox.com%2fauth%2fmsa%3faction%3dloggedIn%26locale_hint%3den-CA&response_type=code&state=eyJpZCI6IjAxOTdkMjFiLWJkMzgtN2M4Yi04Yzg0LTJjMjhkYzBiMjNkYyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d%7chttps%253A%252F%252Fwww.xbox.com%252Fen-CA%252Flive&response_mode=fragment&nonce=0197d21b-bd38-7d0b-b855-dc2894aee17b&prompt=select_account&code_challenge=CtzQDKWjP3hjbzIyw7iuKa-H4EoLGbP4poZObYZju2o&code_challenge_method=S256&x-client-SKU=msal.js.browser&x-client-Ver=3.20.0&uaid=220cda47c6cd405d8e047337b2d383bd&msproxy=1&issuer=mso&tenant=consumers&ui_locales=en-CA&client_info=1&epct=PAQABDgEAAABVrSpeuWamRam2jAF1XRQEUA3VXdXG7m-eHzlFqWQ1lOlG0qtepiDwYC8Fb8Qi_r0vDTL0kYaRNTZ7EE0Hzk5UETCx-nPm54Gm-br2PXZjp1ZjnKom-yr_H8fUX3wTCVKIqUEEjM7GVaPPWoAjeHLKes2NdP-hBQWLRk-pE8m_uBzsv8Va8i6QNSAzF8iZEOfcSMRy2vdIOZp_mcAxzSNX7GuLd5l7AAi8O4kn7UTxKCAA&jshs=0#"
          className="block p-2 bg-green-600 text-white rounded hover:bg-green-700">Xbox</a> </div>
        {/* PLAYSTATION BUTTON */}
        <div className="mt-4 text-center">
          <a href="https://my.account.sony.com/sonyacct/signin/?duid=0000000700090100610c04ca2d57a6142be5fea0fc82b55b04ca116f7f00d4048db090450353dc4e&response_type=code&client_id=e4a62faf-4b87-4fea-8565-caaabb3ac918&scope=web%3Acore&access_type=offline&state=f6fec5e0d74e97a2250a2530eed91dd2269794de056ef6f0c9209cd2e9898703&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&smcid=web%3Apdc&redirect_uri=https%3A%2F%2Fweb.np.playstation.com%2Fapi%2Fsession%2Fv1%2Fsession%3Fredirect_uri%3Dhttps%253A%252F%252Fio.playstation.com%252Fcentral%252Fauth%252Flogin%253Flocale%253Den_CA%2526postSignInURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F%2526cancelURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-ca%25252Fplaystation-network%25252F%26x-psn-app-ver%3D%2540sie-ppr-web-session%252Fsession%252Fv5.40.7&auth_ver=v3&error=login_required&error_code=4165&error_description=User+is+not+authenticated&no_captcha=true&cid=c1a63f28-a1ae-41fe-8d5c-ccb37d28be1e#/signin/input/id"
          className="block p-2 bg-blue-800 text-white rounded hover:bg-blue-950">Playstation</a> </div>

        
      </div>
    </div>
  );
}