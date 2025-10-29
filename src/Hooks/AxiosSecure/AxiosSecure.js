import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // All requests will prepend /api
  // baseURL: "https://safe-pay-seven.vercel.app", // All requests will prepend /api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosSecure;
