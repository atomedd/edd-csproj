import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/user/");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}