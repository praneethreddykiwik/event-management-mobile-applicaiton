import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createEventInputs: [],
  createTaskInputs: [],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    updateEventInputs(state, action) {
      const { value, name } = action.payload;
      const i = state.createEventInputs.findIndex((fi) => fi.name === name);
      if (i !== -1) {
        state.createEventInputs[i].value = value;
        state.createEventInputs[i].error = null;
      }
    },
    updateAllEventInputs(state, action) {
      state.createEventInputs = action.payload;
    },
    updateTaskInputs(state, action) {
      const { value, name } = action.payload;
      const i = state.createTaskInputs.findIndex((fi) => fi.name === name);
      if (i !== -1) {
        state.createTaskInputs[i].value = value;
        state.createTaskInputs[i].error = null;
      }
    },
    updateAllTaskInputs(state, action) {
      state.createTaskInputs = action.payload;
    },
    clearTaskInputs(state) {
      state.createTaskInputs = [];
    },
  },
});

export const formsSelector = (st) => st.forms;
export const {
  updateEventInputs,
  updateAllEventInputs,
  updateTaskInputs,
  updateAllTaskInputs,
  clearTaskInputs,
} = formsSlice.actions;
export default formsSlice.reducer;
