import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/auth.slice";
import eventsReducer from "./events/events.slice";
import formsReducer from "./forms/forms.slice";
import tasksReducer from "./tasks/tasks.slice";
import usersReducer from "./users/users.slice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
    auth: authReducer,
    forms: formsReducer,
    tasks: tasksReducer,
  },
});
