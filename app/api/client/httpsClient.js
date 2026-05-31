import axios from "axios";

import logger from "../../utils/logger.utils";

export const httpsClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BE_API_BASE_URL + "/v1",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

httpsClient.interceptors.request.use((config) => {
  const url = (config.baseURL ?? "") + (config.url ?? "");
  logger.warn(`[API] ${config.method?.toUpperCase()} ${url}`);
  return config;
});
