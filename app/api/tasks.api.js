import { httpsClient } from "./client/httpsClient";

export const fetchTasksApi = (query) => httpsClient.get("/tasks?" + query);

export const createTasksApi = (data) => httpsClient.post("/tasks", data);

export const editTasksApi = (data) => httpsClient.post("/tasks/edit", data);

export const fetchEventsAndTasksApi = (query) =>
  httpsClient.get("/users/user-events-tasks?" + query);

export const declineTasksApi = (data) =>
  httpsClient.put("/tasks/decline-task", data);

export const acceptTasksApi = (data) =>
  httpsClient.put("/tasks/accept-task", data);

export const deleteTasksApi = (data) =>
  httpsClient.post("/tasks/delete-task", data);
