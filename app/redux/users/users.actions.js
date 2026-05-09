import { createAsyncThunk } from "@reduxjs/toolkit";
import { ROLES } from "../../constants/roles";
import Toast from "react-native-toast-message";
import { getManagersApi } from "../../api/users.api";
import axios from "axios";

export const fetchManagersAction = createAsyncThunk(
  "users/fetchManagersAction",
  async (payload, { rejectWithValue, getState }) => {
    try {
      console.log("fetchManagersAction API called.");

      // const state = getState();
      // const { tenantId } = state.auth;

      const tenantId = "helm";

      const query = `?tenantId=${tenantId}&role=${ROLES.eventManager}`;

      console.log(query);
      const fetchManagersRes = await getManagersApi(query);

      return fetchManagersRes.data;
    } catch (error) {
      console.log("error: ", error);
      return rejectWithValue(error?.response?.data || "Login failed");
    }
  },
);
