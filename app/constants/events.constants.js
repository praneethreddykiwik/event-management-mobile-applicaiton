export const EVENT_TYPE_OPTIONS = [
  { value: "CONFERENCE", label: "Conference" },
  { value: "WORKSHOP", label: "Workshop" },
  { value: "SEMINAR", label: "Seminar" },
  { value: "PRODUCT_LAUNCH", label: "Product Launch" },
  { value: "CORPORATE_EVENT", label: "Corporate Event" },
  { value: "TOWNHALL", label: "Townhall" },
  { value: "EXHIBITION_EXPO", label: "Exhibition / Expo" },
  { value: "STARTUP_PITCH", label: "Startup Pitch Event" },
  { value: "NETWORKING_EVENT", label: "Networking Event" },
  { value: "TRAINING_PROGRAM", label: "Training Program" },
  { value: "WEBINAR", label: "Webinar" },
  { value: "HACKATHON", label: "Hackathon" },
  { value: "AWARD_CEREMONY", label: "Award Ceremony" },
  { value: "WEDDING", label: "Wedding" },
  { value: "SOCIAL_GATHERING", label: "Social Gathering" },
  { value: "GOVERNMENT_EVENT", label: "Government Event" },
];

export const EVENT_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "assigned", label: "Assigned" },
  { value: "accepted", label: "Accepted" },
  { value: "ready", label: "Ready" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "declined", label: "Declined" },
  { value: "cancelled", label: "Cancelled" },
  { value: "deleted", label: "Deleted" },
];

export const INITIAL_FILTERS = [
  { value: "pending", selected: true },
  { value: "assigned", selected: true },
  { value: "accepted", selected: true },
  { value: "ready", selected: true },
  { value: "in_progress", selected: true },
  { value: "completed", selected: true },
  { value: "declined", selected: true },
  { value: "cancelled", selected: true },
  { value: "deleted", selected: false },
];
