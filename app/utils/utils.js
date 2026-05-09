import moment from "moment";

export const formatDateTime = (input) => {
  if (!input) return "";
  return moment(input).format("DD MMM YYYY hh:mmA");
};

export const extractHoursAndMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
};

export const formatScheduleDate = (date, hour, minute) => {
  let scheduledAt = new Date(
    `${date}T${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`,
  );
  return scheduledAt.toISOString();
};

export const dateObj = (iso) => {
  const myNewDate = new Date(iso);

  const date = myNewDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = myNewDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
};

export const isoToInputDateTime = (iso) => {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);
  if (isNaN(d)) return { date: "", time: "" };
  const pad = (v) => `${v}`.padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return { date: `${yyyy}-${mm}-${dd}`, time: `${hh}:${min}` };
};

export const modifyTimeToISO = (date, time) => {
  const { hour, minute } = extractHoursAndMinutes(time);
  const formatedTime = formatScheduleDate(date, hour, minute);
  return formatedTime;
};

export const snakeToCamel = (str) =>
  str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

export const getStatusColor = (key, taskCountObj) => {
  const total = taskCountObj.totalTaskCount || taskCountObj.total || 0;
  const count = taskCountObj[key] || 0;

  if (key === "totalTaskCount") return "#000";

  if (total === 0) return "#000";

  const ratio = count / total;

  if (key === "completed") {
    if (ratio >= 0.6) return "#0cc657";
    if (ratio >= 0.3) return "#edab27";
    return "#d83232";
  }

  if (["cancelled", "deleted"].includes(key)) {
    if (ratio < 0.05) return "#0cc657";
    if (ratio < 0.1) return "#edab27";
    return "#d83232";
  }

  if (key === "declined") {
    if (ratio < 0.1) return "#0cc657";
    if (ratio < 0.2) return "#edab27";
    return "#d83232";
  }

  return "#edab27";
};
