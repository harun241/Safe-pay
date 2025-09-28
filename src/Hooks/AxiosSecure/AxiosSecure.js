import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", // All requests will prepend /api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosSecure;
