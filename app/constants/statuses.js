export const taskStatuses = {
  completed: {
    badgeColor: "completed",
    icon: "task_alt",
    status: "Completed",
  },

  assigned: {
    badgeColor: "assigned",
    icon: "assignment_ind",
    status: "Assigned",
  },

  not_started: {
    badgeColor: "notstarted",
    icon: "schedule",
    status: "Not Started",
  },

  in_progress: {
    badgeColor: "inprogress",
    icon: "hourglass_bottom",
    status: "In Progress",
  },

  cancelled: {
    badgeColor: "cancelled",
    icon: "cancel",
    status: "Cancelled",
  },

  deleted: {
    badgeColor: "deleted",
    icon: "delete",
    status: "Deleted",
  },
};

export const eventStatuses = {
  pending: {
    badgeColor: "pending",
    icon: "pending_actions",
    status: "Pending",
    count: 0,
  },

  assigned: {
    badgeColor: "assigned",
    icon: "assignment_ind",
    status: "Assigned",
    count: 0,
  },

  accepted: {
    badgeColor: "completed",
    icon: "thumb_up",
    status: "Accepted",
    count: 0,
  },

  ready: {
    badgeColor: "active",
    icon: "task",
    status: "Ready",
    count: 0,
  },

  in_progress: {
    badgeColor: "inprogress",
    icon: "hourglass_bottom",
    status: "In Progress",
    count: 0,
  },

  completed: {
    badgeColor: "completed",
    icon: "task_alt",
    status: "Completed",
    count: 0,
  },

  declined: {
    badgeColor: "declined",
    icon: "thumb_down",
    status: "Declined",
    count: 0,
  },

  cancelled: {
    badgeColor: "cancelled",
    icon: "cancel",
    status: "Cancelled",
    count: 0,
  },

  deleted: {
    badgeColor: "deleted",
    icon: "delete",
    status: "Deleted",
    count: 0,
  },
};

export const managersStatuses = {
  IDLE: {},
  DISABLED: {},
};

export const taskPriorities = {
  low: "low",
  medium: "medium",
  high: "high",
};
