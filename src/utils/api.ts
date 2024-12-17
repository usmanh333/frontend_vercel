import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://backend-vercel-blue.vercel.app/api",
});

export default api;
