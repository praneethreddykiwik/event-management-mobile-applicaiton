export const TASKS_OPTIONS = [
  { value: "not_started", label: "Not started" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "deleted", label: "Deleted" },
];

export const TASK_PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const tasksMetadata = [
  {
    title: "Finalize speakers list",
    description:
      "Confirm and lock the final list of keynote and panel speakers including session topics.",
    priority: "high",
    dueAt: "",
  },
  {
    title: "Confirm venue booking",
    description:
      "Ensure the convention center booking is finalized and advance payment is completed.",
    priority: "high",
    dueAt: "",
  },
  {
    title: "Setup stage and lighting",
    description:
      "Coordinate with vendors to complete stage, lighting, and audio setup as per event design.",
    priority: "high",
    dueAt: "",
  },
  {
    title: "Send delegate invitations",
    description:
      "Send formal invitations and registration links to all conference delegates.",
    priority: "medium",
    dueAt: "",
  },
  {
    title: "Confirm keynote speaker",
    description:
      "Finalize agreement and session details with the primary keynote speaker.",
    priority: "high",
    dueAt: "",
  },
  {
    title: "Design conference agenda",
    description:
      "Create the full conference agenda including session timing and speakers.",
    priority: "high",
    dueAt: "",
  },
];
