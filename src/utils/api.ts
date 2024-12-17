import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://desole-project-backend-9eflv3g0v-usmans-projects-a4a4fef2.vercel.app/api",
});

export default api;
