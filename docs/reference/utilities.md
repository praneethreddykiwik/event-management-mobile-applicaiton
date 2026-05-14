# Utilities

---

## General Utilities

**File:** `app/utils/utils.js`

### `formatDateTime(input)`

Formats an ISO date string for display using moment.js.

```js
formatDateTime("2026-02-15T09:00:00.000Z")
// → "15 Feb 2026 09:00AM"
```

---

### `modifyTimeToISO(date, time)`

Combines a `YYYY-MM-DD` date string and `HH:MM` time string into a full ISO 8601 timestamp.

```js
modifyTimeToISO("2026-02-15", "09:00")
// → "2026-02-15T09:00:00.000Z"
```

Internally calls `extractHoursAndMinutes` then `formatScheduleDate`.

---

### `isoToInputDateTime(iso)`

Parses an ISO string back into separate date and time strings for pre-filling form inputs.

```js
isoToInputDateTime("2026-02-15T09:00:00.000Z")
// → { date: "2026-02-15", time: "09:00" }
```

Returns `{ date: "", time: "" }` for empty or invalid input.

---

### `dateObj(iso)`

Returns a human-readable date and time object using the browser/device locale.

```js
dateObj("2026-02-15T09:00:00.000Z")
// → { date: "Sunday, February 15, 2026", time: "9:00 AM" }
```

---

### `snakeToCamel(str)`

Converts a `snake_case` string to `camelCase`.

```js
snakeToCamel("event_name") // → "eventName"
```

---

### `getStatusColor(key, taskCountObj)`

Returns a colour hex string (`#0cc657` green / `#edab27` amber / `#d83232` red) for a given status key based on its ratio against total count. Used for dashboard stat colouring.

| Status | Green condition | Amber condition | Red condition |
|---|---|---|---|
| `completed` | ratio ≥ 0.6 | ratio ≥ 0.3 | ratio < 0.3 |
| `cancelled` / `deleted` | ratio < 0.05 | ratio < 0.1 | ratio ≥ 0.1 |
| `declined` | ratio < 0.1 | ratio < 0.2 | ratio ≥ 0.2 |
| others | — | amber (default) | — |

---

## Haptics Utilities

**File:** `app/utils/haptics/haptics.utils.js`

Thin wrappers around `expo-haptics`.

### `triggerHaptics()`

Light haptic feedback. Used for standard interactions.

### `triggerHeavyHaptics()`

Heavy impact haptic feedback. Used on tab bar presses.

---

## Dashboard Helpers

**File:** `app/helpers/Dashboard.helper.js`

### `mapEventForUI(event)`

Enriches a raw event object from the API with UI-friendly fields by looking up `eventStatuses[event.status]`.

```js
mapEventForUI({ status: "pending", ...rest })
// adds: { type: "pending", statusLabel: "Pending", statusIcon: "pending_actions" }
```

`type` is the `badgeColor` key used to resolve `theme.badgeColors` in `EventItem`.

---

### `mapTaskForUI(task, event)`

Same pattern for tasks. Looks up `taskStatuses[task.taskStatus]` and merges in the parent event name.
