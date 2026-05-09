import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchEventsApi,
  assignEventApi,
  deleteEventApi,
} from "../../api/events.api";

export const fetchEventsAction = createAsyncThunk(
  "events/fetchEventsAction",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("fetchEventsAction API called.");

      console.log("payload query: ", payload.query);
      const fetchEventsRes = await fetchEventsApi(payload?.query || "");
      console.log("fetchEventsRes: ", fetchEventsRes.data);
      return fetchEventsRes.data;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error?.response?.data || "Failed to fetch events");
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
