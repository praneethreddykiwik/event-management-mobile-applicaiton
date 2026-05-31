import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "react-native-toast-message";

import { getManagersApi, getUsersApi } from "../../api/users.api";
import { ROLES } from "../../constants/roles";
import logger from "../../utils/logger.utils";

export const fetchManagersAction = createAsyncThunk(
  "users/fetchManagersAction",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const tenantId = "helm";
      const query = `?tenantId=${tenantId}&role=${ROLES.eventManager}`;

      logger.info("payload fetchManagers: ", { payload, tenantId, query });

      const fetchManagersRes = await getManagersApi(query);

      logger.info("response fetchManagers: ", fetchManagersRes.data);

      if (payload?.callback) {
        payload.callback(fetchManagersRes.data?.details || []);
      }

      return fetchManagersRes.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Login failed");
    }
  },
);

export const fetchVendorsSupsQA = createAsyncThunk(
  "users/fetchVendorsSupsQA",
  async (payload, { rejectWithValue, getState }) => {
    const store = getState();
    const tenantId = store.auth?.tenantId || "helm";
    try {
      const query = `?tenantId=${tenantId}&role=${ROLES.supervisor},${ROLES.vendor},${ROLES.qa}`;
      const response = await getUsersApi(query);

      const users = (response.data?.details || []).reduce(
        (acu, cur) => {
          if (acu[cur.role]) acu[cur.role].push(cur);
          return acu;
        },
        { supervisor: [], vendor: [], qa: [] },
      );

      const res = {
        supervisors: users.supervisor,
        vendors: users.vendor,
        qa: users.qa,
      };

      if (payload?.callback) {
        payload.callback(res);
      }
      return res;
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          error?.response?.data?.message ||
          "Failed to fetch Supervisors and Vendors",
      });
      return rejectWithValue(
        error?.response?.data || "Failed to fetch Supervisors and Vendors",
      );
    }
  },
);
