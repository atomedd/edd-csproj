import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Extract token from URL query params
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const res = await fetch('http://localhost:3165/api/steam/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user data');
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.accountName}</h1>
      <img src={userData.avatar} alt="Avatar" className="w-20 h-20 rounded-full mb-4" />
      <p>Total Playtime: {userData.totalPlaytimeHours} hours</p>
      <p>Games Owned: {userData.gameCount}</p>
      {/* Add more user info as needed */}
    </div>
  );
}