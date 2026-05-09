import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./users.actions";

const initialState = {
  eventManagersLoading: false,
  eventManagers: [],
  eventManagersError: false,
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
        state.eventManagersLoading = false;
      })
      .addCase(actions.fetchManagersAction.rejected, (state, action) => {
        state.eventManagersLoading = false;
        state.eventManagersError =
          action?.payload || "Something went wrong while fetching EMs";
      });
  },
});

export const userSelecter = (st) => st.users;
export const { logUsers } = usersSlice.actions;
export default usersSlice.reducer;
