import { httpsClient } from "./client/httpsClient";

export const getManagersApi = (queryParams) => {
  console.log("queryParams: ", queryParams);
  console.log(
    "process.env.EXPO_PUBLIC_BE_API_BASE_URL: ",
    process.env.EXPO_PUBLIC_BE_API_BASE_URL,
  );
  return httpsClient.get("users/event-managers" + queryParams);
};
