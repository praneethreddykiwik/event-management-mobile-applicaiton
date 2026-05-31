import { createSlice } from "@reduxjs/toolkit";

import logger from "../../utils/logger.utils";

const initialState = {
  tenantId: "helm",
  authUser: {
    tenantUid: "c5b0b728-8dd1-414b-9e69-fa1ee00d13aa",
    uid: "0fcbe815-6d22-4a62-918b-8b2de3f36133",
    username: "abdul",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logAuth(state, action) {
      logger.info("logAuth: ", state);
    },
  },
});

export const authSelector = (st) => st.auth;

export const { logAuth } = authSlice.actions;

export default authSlice.reducer;
