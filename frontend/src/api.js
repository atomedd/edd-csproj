import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3165",
});

// Attach JWT to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;