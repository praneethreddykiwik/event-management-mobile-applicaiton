import { httpsClient } from "./client/httpsClient";

export const fetchEventsApi = (query = "") => {
  return httpsClient.get("/events" + query);
};

export const createEventApi = (payload) => {
  return httpsClient.post("/events", payload);
};

export const updateEventApi = (payload) => {
  return httpsClient.patch(`/events/${payload.eventUid}`, payload);
};

export const assignEventApi = (payload) => {
  return httpsClient.patch(`/events/${payload.eventUid}/assign`, payload);
};

export const deleteEventApi = (eventUid, payload) => {
  return httpsClient.delete(`/events/${eventUid}`, { data: payload });
};