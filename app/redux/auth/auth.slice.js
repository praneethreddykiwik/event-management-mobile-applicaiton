import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tenantId: "helm",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logAuth(state, action) {
      console.log("logAuth: ", state);
    },
  },
});

export const authSelector = (st) => st.auth;

export const { logAuth } = authSlice.actions;

export default authSlice.reducer;
