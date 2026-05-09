import { taskStatuses, eventStatuses } from "../constants/statuses";

export const mapTaskForUI = (task, event) => {
  const status = taskStatuses[task.taskStatus] || taskStatuses.not_started;

  return {
    ...task,
    type: status.badgeColor,
    taskStatus: status.status,
    taskIcon: status.icon,
    eventName: event?.eventName,
    taskAssignedTo: task.taskAssignedTo,
  };
};

export const mapEventForUI = (event) => {
  const status = eventStatuses[event.status] || eventStatuses.pending;

  return {
    ...event,
    type: status.badgeColor,
    statusLabel: status.status,
    statusIcon: status.icon,
  };
};
