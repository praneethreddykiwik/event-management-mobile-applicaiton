import { configureStore } from "@reduxjs/toolkit";

import eventsReducer from "./events/events.slice";
import usersReducer from "./users/users.slice";
import authReducer from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
    auth: authReducer,
  },
});
