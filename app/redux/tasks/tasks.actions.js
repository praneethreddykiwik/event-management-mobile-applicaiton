import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

import {
  acceptTasksApi,
  createTasksApi,
  declineTasksApi,
  deleteTasksApi,
  editTasksApi,
  fetchEventsAndTasksApi,
  fetchTasksApi,
} from "../../api/tasks.api";
import { clearTaskInputs } from "../forms/forms.slice";

export const fetchTasksApiAction = createAsyncThunk(
  "tasks/fetchTasksApiAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchTasksApi(payload.query);
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load Tasks",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);

export const fetchEventsAndTasksAction = createAsyncThunk(
  "tasks/fetchEventsAndTasksAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetchEventsAndTasksApi(payload);
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load Events & Tasks",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);

export const declineTasksAction = createAsyncThunk(
  "tasks/declineTasksAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await declineTasksApi(payload);
      Toast.show({ type: "success", text1: "Task declined successfully" });
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to decline task",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);

export const acceptTasksAction = createAsyncThunk(
  "tasks/acceptTasksAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await acceptTasksApi(payload);
      Toast.show({ type: "success", text1: "Task accepted successfully" });
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message || "Failed to accept task",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);

export const createTaskAction = createAsyncThunk(
  "tasks/createTaskAction",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await createTasksApi(payload.reqPayload);
      dispatch(clearTaskInputs());
      Toast.show({ type: "success", text1: "Task created successfully" });
      payload.navigation?.goBack();
      if (payload.onSuccess) payload.onSuccess(res.data);
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message || "Failed to create Task",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);

export const editTaskAction = createAsyncThunk(
  "tasks/editTaskAction",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await editTasksApi(payload.reqPayload);
      dispatch(clearTaskInputs());
      Toast.show({ type: "success", text1: "Task edited successfully" });
      payload.navigation?.goBack();
      if (payload.onSuccess) payload.onSuccess(res.data);
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message || "Failed to edit Task",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);

export const deleteTaskAction = createAsyncThunk(
  "tasks/deleteTaskAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await deleteTasksApi(payload.reqPayload);
      if (payload.callBack) {
        payload.callBack();
      }
      Toast.show({ type: "success", text1: "Task deleted successfully" });
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err?.response?.data?.message || "Failed to delete Task",
      });
      return rejectWithValue(err?.response?.data || "Error");
    }
  },
);
