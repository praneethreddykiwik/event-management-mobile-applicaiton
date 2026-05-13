import { configureStore } from "@reduxjs/toolkit";

import eventsReducer from "./events/events.slice";
import usersReducer from "./users/users.slice";
import authReducer from "./auth/auth.slice";
import formsReducer from "./forms/forms.slice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
    auth: authReducer,
    forms: formsReducer,
  },
});
