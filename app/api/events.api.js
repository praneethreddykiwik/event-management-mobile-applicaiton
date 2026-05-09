import { httpsClient } from "./client/httpsClient";

export const fetchEventsApi = (query = "") => {
  return httpsClient.get("/events" + query);
};

// Compare here/
export const assignEventApi = (payload) => {
  return httpsClient.patch(`/events/${payload.eventUid}/assign`, payload);
};

export const deleteEventApi = (eventUid, payload) => {
  return httpsClient.delete(`/events/${eventUid}`, { data: payload });
};