import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', preferences: '' });

  // Fetch all users
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission to add user
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', {
      username: form.username,
      email: form.email,
      preferences: { theme: form.preferences }
    })
      .then(res => setUsers([...users, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <div className="p-4">
            <h1 className="text-2xl mb-4">User List</h1>

            <ul className="mb-4">
              {users.map(user => (
                <li key={user._id}>
                  {user.username} - {user.email} - {user.preferences?.theme}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input name="username" placeholder="Username" onChange={handleChange} className="border p-2" required />
              <input name="email" placeholder="Email" onChange={handleChange} className="border p-2" required />
              <input name="preferences" placeholder="Theme (dark/light)" onChange={handleChange} className="border p-2" required />
              <button type="submit" className="bg-blue-500 text-white p-2">Add User</button>
            </form>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
