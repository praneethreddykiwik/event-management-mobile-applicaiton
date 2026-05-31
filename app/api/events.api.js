import { httpsClient } from "./client/httpsClient";

export const fetchEventsApi = (query = "") => {
  return httpsClient.get("/events" + query);
};

export const createEventApi = (payload) => {
  return httpsClient.post("/events/create-event", payload);
};

export const updateEventApi = (payload) => {
  return httpsClient.patch(`/events/${payload.eventUid}`, payload);
};

export const assignEventApi = (payload) => {
  return httpsClient.post(`/events/assign-event`, payload);
};

export const deleteEventApi = (payload) => {
  return httpsClient.delete(`/events/delete-event`, { data: payload });
};
