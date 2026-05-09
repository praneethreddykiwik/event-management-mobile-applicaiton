import axios from "axios";

export const httpsClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BE_API_BASE_URL + "/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
