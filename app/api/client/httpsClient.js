import axios from "axios";

import logger from "../../utils/logger.utils";

const getBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_BE_API_BASE_URL;
  if (envUrl && envUrl.trim() !== "") {
    const cleaned = envUrl.trim().replace(/\/+$/, "");
    return cleaned.endsWith("/v1") ? cleaned : `${cleaned}/v1`;
  }
  return "http://localhost:5000/v1";
};

export const httpsClient = axios.create({
  baseURL: getBaseUrl(),
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
