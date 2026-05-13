import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_FILTERS } from "../../constants/events.constants";
import * as actions from "./events.action";

const initialState = {
  events: [],
  eventsLoading: false,
  eventsError: null,
  eventsStatusCounts: {},
  selectedEventFilters: INITIAL_FILTERS,
  assignEventLoading: false,
  deleteEventLoading: false,
  createEventLoading: false,
  updateEventLoading: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchEventsAction.pending, (state) => {
        state.eventsLoading = true;
        state.eventsError = null;
      })
      .addCase(actions.fetchEventsAction.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload?.details?.events || [];
        state.eventsStatusCounts = action.payload?.statusCounts || {};
      })
      .addCase(actions.fetchEventsAction.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.payload;
      });

    builder
      .addCase(actions.createEventAction.pending, (state) => {
        state.createEventLoading = true;
      })
      .addCase(actions.createEventAction.fulfilled, (state) => {
        state.createEventLoading = false;
      })
      .addCase(actions.createEventAction.rejected, (state) => {
        state.createEventLoading = false;
      });

    builder
      .addCase(actions.updateEventAction.pending, (state) => {
        state.updateEventLoading = true;
      })
      .addCase(actions.updateEventAction.fulfilled, (state) => {
        state.updateEventLoading = false;
      })
      .addCase(actions.updateEventAction.rejected, (state) => {
        state.updateEventLoading = false;
      })
      .addCase(actions.eventsFilterAction.pending, (state, action) => {
        state.eventsLoading = true;
        state.selectedEventFilters = action.meta.arg;
      })
      .addCase(actions.eventsFilterAction.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload?.details || [];
        state.eventsStatusCounts = action.payload?.statusCounts || {};
      })
      .addCase(actions.eventsFilterAction.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.payload;
      })
      .addCase(actions.assignEventAction.pending, (state) => {
        state.assignEventLoading = true;
      })
      .addCase(actions.assignEventAction.fulfilled, (state) => {
        state.assignEventLoading = false;
      })
      .addCase(actions.assignEventAction.rejected, (state) => {
        state.assignEventLoading = false;
      })
      .addCase(actions.deleteEventAction.pending, (state) => {
        state.deleteEventLoading = true;
      })
      .addCase(actions.deleteEventAction.fulfilled, (state, action) => {
        state.deleteEventLoading = false;
        state.events = state.events.filter(
          (e) => e.uid !== action.payload.eventUid,
        );
      })
      .addCase(actions.deleteEventAction.rejected, (state) => {
        state.deleteEventLoading = false;
      });
  },
});

export const eventsSelector = (st) => st.events;
export default eventSlice.reducer;