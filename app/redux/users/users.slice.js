import { createSlice } from "@reduxjs/toolkit";

import logger from "../../utils/logger.utils";
import * as actions from "./users.actions";

const initialState = {
  eventManagersLoaded: false,
  eventManagersLoading: false,
  eventManagers: [],
  eventManagersError: false,

  vendorsSupsQALoaded: false,
  vendorsLoading: false,
  vendors: [],
  vendorsError: false,

  supervisorsLoading: false,
  supervisors: [],
  supervisorsError: false,

  qaLoading: false,
  qa: [],
  qaError: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logUsers(state) {
      console.log(state.eventManagers);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchManagersAction.pending, (state) => {
        state.eventManagersLoading = true;
      })
      .addCase(actions.fetchManagersAction.fulfilled, (state, action) => {
        state.eventManagers = action?.payload?.details || [];
        state.eventManagersLoaded = true;
        state.eventManagersLoading = false;
      })
      .addCase(actions.fetchManagersAction.rejected, (state, action) => {
        state.eventManagersLoading = false;
        logger.info("erorr at fetch managers: ", action.payload);
        state.eventManagersError =
          action?.payload || "Something went wrong while fetching EMs";
      });

    builder
      .addCase(actions.fetchVendorsSupsQA.pending, (state) => {
        state.supervisorsLoading = true;
        state.vendorsLoading = true;
        state.qaLoading = true;
      })
      .addCase(actions.fetchVendorsSupsQA.fulfilled, (state, action) => {
        state.supervisors = action.payload.supervisors;
        state.vendors = action.payload.vendors;
        state.qa = action.payload.qa;

        state.vendorsSupsQALoaded = true;
        state.supervisorsLoading = false;
        state.vendorsLoading = false;
        state.qaLoading = false;

        state.supervisorsError = null;
        state.vendorsError = null;
        state.qaError = null;
      })
      .addCase(actions.fetchVendorsSupsQA.rejected, (state) => {
        state.supervisorsError = "Something went wrong";
        state.vendorsError = "Something went wrong";
        state.qaError = "Something went wrong";

        state.supervisorsLoading = false;
        state.vendorsLoading = false;
        state.qaLoading = false;
      });
  },
});

export const usersSelector = (st) => st.users;
export const { logUsers } = usersSlice.actions;
export default usersSlice.reducer;
