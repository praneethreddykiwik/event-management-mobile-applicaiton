import { createAsyncThunk } from "@reduxjs/toolkit";
import { ROLES } from "../../constants/roles";
import Toast from "react-native-toast-message";
import { getManagersApi } from "../../api/users.api";
import axios from "axios";

export const fetchManagersAction = createAsyncThunk(
  "users/fetchManagersAction",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const tenantId = "helm";
      const query = `?tenantId=${tenantId}&role=${ROLES.eventManager}`;
      const fetchManagersRes = await getManagersApi(query);

      if (payload?.callback) {
        payload.callback(fetchManagersRes.data?.details || []);
      }

      return fetchManagersRes.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Login failed");
    }
  },
);
