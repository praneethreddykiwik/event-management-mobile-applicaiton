import {
  TASK_PRIORITY_OPTIONS,
  TASKS_OPTIONS,
} from "../../../constants/tasks.constants";
import { validationList } from "../../../constants/validations.constants";

export const taskMetaData = [
  {
    type: "text",
    name: "title",
    value: "",
    placeholder: "Enter Title of the Task",
    label: "Title",
    error: null,
    validations: [validationList.REQUIRED],
  },
  {
    type: "textarea",
    name: "description",
    value: "",
    placeholder: "Enter Task description",
    label: "Description",
    error: null,
    rows: 6,
  },
  {
    type: "dropdown",
    name: "priority",
    value: "",
    options: TASK_PRIORITY_OPTIONS,
    placeholder: "Add Priority",
    label: "Priority",
    error: null,
    validations: [validationList.REQUIRED],
  },
  {
    type: "dropdown",
    name: "status",
    value: "",
    options: TASKS_OPTIONS,
    placeholder: "Task status",
    label: "Status",
    error: null,
    validations: [validationList.REQUIRED],
  },
  {
    type: "date",
    // DTPicker calls `new Date(value)`, so we need a real ISO not "".
    name: "dueAt",
    value: new Date().toISOString(),
    placeholder: "Choose Due Date",
    label: "Due Date",
    error: null,
    validations: [validationList.REQUIRED],
  },
  {
    type: "radio-group",
    name: "assineeType",
    value: "Assign to Vendor",
    placeholder: "Choose Assignee type",
    list: ["Assign to Vendor", "Assign to Supervisor"],
    error: null,
  },
  {
    type: "dropdown",
    name: "assignedToUid",
    placeholder: "Assign to",
    options: [],
    value: "",
    label: "Assign to Vendor/Supervisors",
    error: null,
    validations: [validationList.REQUIRED],
  },
  {
    type: "dropdown",
    name: "qaAssignedTo",
    placeholder: "QA",
    options: [],
    value: "",
    label: "QA",
    error: null,
  },
];

export const generateUserOptions = (users = []) =>
  users.map((user) => ({
    value: user.uid,
    label: `${user.firstName} ${user.lastName}`,
  }));

export const generateAddTaskInpMetadata = (vendorsOrSuprvs = [], qa = []) => {
  return taskMetaData.map((k) => {
    const el = { ...k };
    if (el.name === "assignedToUid") {
      el.options = generateUserOptions(vendorsOrSuprvs);
    }
    if (el.name === "qaAssignedTo") {
      el.options = generateUserOptions(qa);
    }
    return el;
  });
};

export const generateTaskDataToEdit = (
  vendorsOrSuprvs = [],
  qa = [],
  data = {},
) => {
  const allowedFields = [
    "title",
    "description",
    "priority",
    "status",
    "dueAt",
    "assignedToUid",
  ];

  return allowedFields.map((field) => {
    const input = taskMetaData.find((fn) => fn.name === field);

    const incoming = data[field];
    const value =
      incoming === null || incoming === undefined || incoming === ""
        ? input.value
        : incoming;
    const output = { ...input, value };
    if (field === "assignedToUid") {
      output.options = generateUserOptions(vendorsOrSuprvs);
    }
    if (field === "qaAssignedTo") {
      output.options = generateUserOptions(qa);
    }
    return output;
  });
};
