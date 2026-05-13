import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEventsApi,
  createEventApi,
  updateEventApi,
  assignEventApi,
  deleteEventApi,
} from "../../api/events.api";
import Toast from "react-native-toast-message";

export const fetchEventsAction = createAsyncThunk(
  "events/fetchEventsAction",
  async (payload, { rejectWithValue }) => {
    try {
      const fetchEventsRes = await fetchEventsApi(payload?.query || "");
      return fetchEventsRes.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to fetch events");
    }
  },
);

export const createEventAction = createAsyncThunk(
  "events/createEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createEventApi(payload.reqPayload);
      Toast.show({ type: "success", text1: "Event created successfully" });
      payload.navigation.navigate("EventsDashboard");
      return res.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Failed to create event",
      });
      return rejectWithValue(error?.response?.data || "Failed to create event");
    }
  },
);

export const updateEventAction = createAsyncThunk(
  "events/updateEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateEventApi(payload.reqPayload);
      Toast.show({ type: "success", text1: "Event updated successfully" });
      payload.navigation.navigate("EventsDashboard");
      return res.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Failed to update event",
      });
      return rejectWithValue(error?.response?.data || "Failed to update event");
    }
  },
);

export const eventsFilterAction = createAsyncThunk(
  "events/eventsFilterAction",
  async (filters, { rejectWithValue }) => {
    try {
      const selected = filters.filter((f) => f.selected).map((f) => f.value);
      const query = `?status=${selected.join(",")}`;
      const res = await fetchEventsApi(query);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to filter events",
      );
    }
  },
);

export const assignEventAction = createAsyncThunk(
  "events/assignEventAction",
  async ({ reqPayload }, { rejectWithValue }) => {
    try {
      const res = await assignEventApi(reqPayload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to assign event");
    }
  },
);

export const deleteEventAction = createAsyncThunk(
  "events/deleteEventAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await deleteEventApi(payload.eventUid, payload);
      return { ...res.data, eventUid: payload.eventUid };
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Failed to delete event");
    }
  },
);
