import logger from "../utils/logger.utils";
import { httpsClient } from "./client/httpsClient";

export const getManagersApi = (queryParams) => {
  logger.debug("queryParams: ", queryParams);
  logger.debug(
    "process.env.EXPO_PUBLIC_BE_API_BASE_URL: ",
    process.env.EXPO_PUBLIC_BE_API_BASE_URL,
  );
  return httpsClient.get("users/event-managers" + queryParams);
};
