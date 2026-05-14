# Constants & Enums

---

## Event Types — `EVENT_TYPE_OPTIONS`

**File:** `app/constants/events.constants.js`

Used as dropdown options for the `eventType` field.

| Value | Label |
|---|---|
| `CONFERENCE` | Conference |
| `WORKSHOP` | Workshop |
| `SEMINAR` | Seminar |
| `PRODUCT_LAUNCH` | Product Launch |
| `CORPORATE_EVENT` | Corporate Event |
| `TOWNHALL` | Townhall |
| `EXHIBITION_EXPO` | Exhibition / Expo |
| `STARTUP_PITCH` | Startup Pitch Event |
| `NETWORKING_EVENT` | Networking Event |
| `TRAINING_PROGRAM` | Training Program |
| `WEBINAR` | Webinar |
| `HACKATHON` | Hackathon |
| `AWARD_CEREMONY` | Award Ceremony |
| `WEDDING` | Wedding |
| `SOCIAL_GATHERING` | Social Gathering |
| `GOVERNMENT_EVENT` | Government Event |

---

## Event Statuses — `EVENT_STATUSES`

**File:** `app/constants/events.constants.js`

Used as dropdown options for the `status` field.

| Value | Label |
|---|---|
| `pending` | Pending |
| `assigned` | Assigned |
| `accepted` | Accepted |
| `ready` | Ready |
| `in_progress` | In Progress |
| `completed` | Completed |
| `declined` | Declined |
| `cancelled` | Cancelled |
| `deleted` | Deleted |

---

## Initial Filters — `INITIAL_FILTERS`

**File:** `app/constants/events.constants.js`

The default filter state loaded on dashboard mount. All statuses are selected except `deleted`.

```js
[
  { value: "pending",     selected: true  },
  { value: "assigned",    selected: true  },
  { value: "accepted",    selected: true  },
  { value: "ready",       selected: true  },
  { value: "in_progress", selected: true  },
  { value: "completed",   selected: true  },
  { value: "declined",    selected: true  },
  { value: "cancelled",   selected: true  },
  { value: "deleted",     selected: false },
]
```

---

## Event Status Map — `eventStatuses`

**File:** `app/constants/statuses.js`

Maps a raw API status string to its UI representation. Used by `mapEventForUI` in `Dashboard.helper.js`.

| Key | `badgeColor` | `icon` | `status` label |
|---|---|---|---|
| `pending` | `pending` | `pending_actions` | Pending |
| `assigned` | `assigned` | `assignment_ind` | Assigned |
| `accepted` | `completed` | `thumb_up` | Accepted |
| `ready` | `active` | `task` | Ready |
| `in_progress` | `inprogress` | `hourglass_bottom` | In Progress |
| `completed` | `completed` | `task_alt` | Completed |
| `declined` | `declined` | `thumb_down` | Declined |
| `cancelled` | `cancelled` | `cancel` | Cancelled |
| `deleted` | `deleted` | `delete` | Deleted |

---

## Task Status Map — `taskStatuses`

**File:** `app/constants/statuses.js`

Maps a raw task status to its UI representation. Used by `mapTaskForUI`.

| Key | `badgeColor` | `icon` | `status` label |
|---|---|---|---|
| `completed` | `completed` | `task_alt` | Completed |
| `assigned` | `assigned` | `assignment_ind` | Assigned |
| `not_started` | `notstarted` | `schedule` | Not Started |
| `in_progress` | `inprogress` | `hourglass_bottom` | In Progress |
| `cancelled` | `cancelled` | `cancel` | Cancelled |
| `deleted` | `deleted` | `delete` | Deleted |

---

## Validations — `validationList`

**File:** `app/constants/validations.constants.js`

```js
{ REQUIRED: "REQUIRED" }
```

Fields with `validationList.REQUIRED` in their `validations` array will fail submission if `value` is falsy.

---

## Sample Events Metadata — `eventsMetadata`

**File:** `app/constants/events.constants.js`

An array of 8 pre-defined event objects used as venue/event suggestions on the Create Event screen. Each object has:

```ts
{
  eventName: string,
  eventType: string,        // matches EVENT_TYPE_OPTIONS value
  description: string,
  title: string,
  venue: string,
  city: string,
  state: string,
  location: string,         // Google Maps URL
  eventDate: string,        // "YYYY-MM-DD"
  eventTime: string,        // "HH:MM"
  expectedAttendees: number,
  comments: string,
  available: boolean,
  bookings: number,
}
```

Pressing "Choose" on a suggestion auto-fills form fields whose `name` matches a key in the suggestion object.
