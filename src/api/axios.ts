import axios from "axios";
import { ENV } from "@/config/env";

const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosInstance;