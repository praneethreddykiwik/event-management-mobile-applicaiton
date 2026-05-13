import {
  EVENT_TYPE_OPTIONS,
  EVENT_STATUSES,
} from "../../../constants/events.constants";
import { validationList } from "../../../constants/validations.constants";
import { isoToInputDateTime } from "../../../utils/utils";

export const BASE_EVENT_METADATA = [
  {
    type: "text",
    name: "eventName",
    value: "",
    placeholder: "e.g. Annual Conference",
    label: "Event Name",
    validations: [validationList.REQUIRED],
  },
  {
    type: "textarea",
    name: "comments",
    value: "",
    placeholder: "Provide your event details...",
    label: "Event Description",
    validations: [validationList.REQUIRED],
  },
  {
    type: "dropdown",
    name: "eventType",
    value: "",
    placeholder: "Event Type",
    options: EVENT_TYPE_OPTIONS,
    label: "Event Type",
    validations: [validationList.REQUIRED],
  },
  {
    type: "date",
    name: "eventDate",
    value: "",
    placeholder: "YYYY-MM-DD",
    label: "Event Date",
    validations: [validationList.REQUIRED],
  },
  {
    type: "time",
    name: "eventTime",
    value: "",
    placeholder: "HH:MM",
    label: "Event Time",
    validations: [validationList.REQUIRED],
  },
  {
    type: "number",
    name: "expectedAttendees",
    value: "",
    placeholder: "e.g. 150",
    label: "Expected Attendees",
    validations: [validationList.REQUIRED],
  },
  {
    type: "dropdown",
    name: "assignedToUid",
    value: "",
    placeholder: "Assign Event Manager",
    options: [],
    label: "Assign Event Manager",
    validations: [validationList.REQUIRED],
  },
  {
    type: "dropdown",
    name: "status",
    value: "",
    placeholder: "Status",
    options: EVENT_STATUSES,
    label: "Status",
  },
  {
    type: "text",
    name: "venue",
    value: "",
    placeholder: "e.g. Some Good Place",
    label: "Venue",
    validations: [validationList.REQUIRED],
  },
];

const generateEventManagersOptions = (manager) => ({
  value: manager.uid,
  label: `${manager.firstName} ${manager.lastName}`,
});

export const generateNewEventsInputs = (eventManagers = []) => {
  return BASE_EVENT_METADATA.map((el) => {
    if (el.name === "assignedToUid") {
      return {
        ...el,
        options: eventManagers.map(generateEventManagersOptions),
      };
    }
    return { ...el, error: null };
  });
};

export const generateEventDataToEdit = (eventManagers = [], event = {}) => {
  const scheduled = event.scheduledAt || event.scheduled_at || event.scheduled;
  const { date: eventDate, time: eventTime } = isoToInputDateTime(
    scheduled || "",
  );

  const valueMap = { ...event, eventDate, eventTime };

  return BASE_EVENT_METADATA.map((el) => {
    const value = valueMap[el.name] ?? "";
    if (el.name === "assignedToUid") {
      return {
        ...el,
        options: eventManagers.map(generateEventManagersOptions),
        value,
      };
    }
    return { ...el, value };
  });
};
