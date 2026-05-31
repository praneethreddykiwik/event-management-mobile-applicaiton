import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_FILTERS } from "../../constants/events.constants";
import logger from "../../utils/logger.utils";
import * as actions from "./events.action";

const initialState = {
  events: [],
  eventsLoaded: false,
  eventsLoading: false,
  eventsError: null,
  eventsStatusCounts: {},
  selectedEventFilters: INITIAL_FILTERS,
  assignEventLoading: false,
  deleteEventLoading: false,
  createEventLoading: false,
  updateEventLoading: false,

  eventDetails: {},
  eventDetailsUid: null,
  eventDetailsLoading: false,
  eventDetailsError: null,
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
        state.eventsLoaded = true;
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
      .addCase(actions.createEventAction.fulfilled, (state, action) => {
        const raw = action.payload.details;
        const newEvent = {
          uid: raw.uid,
          eventName: raw.event_name,
          eventType: raw.event_type,
          scheduledAt: raw.scheduled_at,
          venue: raw.venue,
          status: raw.status,
          assignedToUid: raw.assigned_to_uid,
          tenantUid: raw.tenant_uid,
          comments: raw.comments,
          expectedAttendees: raw.expected_attendees,
          createdAt: raw.created_at,
          createdByUid: raw.created_by_uid,
          userName: null,
        };
        state.events = [newEvent, ...state.events];

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
        state.eventsLoaded = false;
        state.eventDetailsUid = null;
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
        state.eventsLoaded = true;
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
      .addCase(actions.assignEventAction.fulfilled, (state, action) => {
        const payload = action.payload.reqPayload;

        const event = state.events.find(
          (eventDetails) => eventDetails.uid === payload.eventUid,
        );

        if (event) {
          event.assignedToUid = payload.assignedToUid;
          event.userName = payload.userName;
        }

        state.assignEventLoading = false;
      })
      .addCase(actions.assignEventAction.rejected, (state, action) => {
        console.log("action error", action.payload);
        state.assignEventLoading = false;
      })
      .addCase(actions.deleteEventAction.pending, (state) => {
        state.deleteEventLoading = true;
      })
      .addCase(actions.deleteEventAction.fulfilled, (state, action) => {
        const { eventUid } = action.payload;
        state.events = state.events.filter((e) => e.uid !== eventUid);
        state.deleteEventLoading = false;
      })
      .addCase(actions.deleteEventAction.rejected, (state, action) => {
        state.deleteEventLoading = false;
        logger.info("error delete: ", action.payload);
      });

    builder
      .addCase(actions.fetchEventDetailsAction.pending, (state) => {
        state.eventDetailsLoading = true;
        state.eventDetailsError = null;
      })
      .addCase(actions.fetchEventDetailsAction.fulfilled, (state, action) => {
        state.eventDetails = action.payload || {};
        state.eventDetailsUid = action.meta?.arg?.eventUid ?? null;
        state.eventDetailsLoading = false;
      })
      .addCase(actions.fetchEventDetailsAction.rejected, (state) => {
        state.eventDetailsLoading = false;
        state.eventDetailsError =
          "Something went wrong while fetching Event details.";
      });
  },
});

export const eventsSelector = (st) => st.events;
export default eventSlice.reducer;
