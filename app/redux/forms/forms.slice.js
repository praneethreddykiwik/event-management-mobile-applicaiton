import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createEventInputs: [],
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
  },
});

export const formsSelector = (st) => st.forms;
export const { updateEventInputs, updateAllEventInputs } = formsSlice.actions;
export default formsSlice.reducer;
