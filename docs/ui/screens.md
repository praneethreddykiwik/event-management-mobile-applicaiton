# Screens

All screens live under `app/screens/`. Each screen is a page-level component connected to Redux.

---

## EventsDashboard

**File:** `app/screens/Events/EventsDashboard/EventsDashboard.page.js`
**Route:** `EventsDashboard` (default tab)

### Purpose

Landing screen. Shows summary stats, filter chips, and the full scrollable list of events.

### Data Fetching

On mount, two dispatches fire in sequence:

```js
dispatch(fetchManagersAction());
dispatch(fetchEventsAction({ query: "?status=pending,assigned,..." }));
```

The initial query is built from `INITIAL_FILTERS` (all statuses selected except `deleted`).

### Layout Sections

| Section | Component | Description |
|---|---|---|
| Summary cards | `EventSummaryCards` | Total events count + total event managers count |
| Action buttons | `CreateEventButtons` | "Create Event" button; "Manage Managers" (stub) |
| Filter chips | `EventsFilterCards` | Toggleable status filter pills |
| Event list | `EventItem` (mapped) | One card per event, empty state when list is empty |

### Sub-components

#### `EventSummaryCards`
**File:** `EventsDashboard/components/EventSummaryCards.js`

Displays two stat cards side by side: total events and total event managers.

Props: `events: Event[]`, `eventManagers: Manager[]`

---

#### `CreateEventButtons`
**File:** `EventsDashboard/components/CreateEventButtons.js`

Renders the "Create Event" CTA button.

Props: `onCreateEvent: () => void`, `onManageManagers: () => void`

---

#### `EventsFilterCards`
**File:** `EventsDashboard/components/EventsFilterCards.js`

Renders a row of status filter chips. Toggling a chip dispatches `eventsFilterAction` with the updated filter array.

---

#### `EventItem`
**File:** `EventsDashboard/components/EventItem.js`

Renders a single event card.

Props: `event: MappedEvent`, `onViewDetails: () => void`

**Displayed fields:**
- Event name
- Scheduled date/time (`formatDateTime`)
- Venue
- Assigned event manager name
- Status badge (colour-coded via `theme.badgeColors`)

**Actions:**
- **Assign to Me** — dispatches `assignEventAction` with the current user's UID (shown only when not already assigned).
- **Delete** — shows a native `Alert` confirmation, then dispatches `deleteEventAction` followed by a refetch.
- **View Details** — calls `onViewDetails` (navigates to event detail, not yet implemented as a named route).

---

## CreateEditEvent

**File:** `app/screens/Events/CreateEvent/CreateEditEvent.page.js`
**Route:** `CreateEvent`

### Purpose

Dual-mode screen for creating a new event or editing an existing one. Mode is determined by `route.params.mode === "edit"`.

### Create Mode

On mount, if event managers are not already in the store, `fetchManagersAction` is dispatched with a callback that seeds the form inputs once managers load. If managers are cached, inputs are seeded immediately.

### Edit Mode

The parent that navigates to this screen is responsible for calling `generateEventDataToEdit(eventManagers, event)` and seeding the store before navigation, or this screen can be extended to accept the event object via `route.params.event`.

### Layout Sections

| Section | Component | Description |
|---|---|---|
| Page header | inline styled | "Create Event" or "Edit Event" title + bottom divider |
| Form | `CreateEventForm` | Dynamic input fields + submit/clear/back buttons |
| Venue suggestions | `VenueSuggestion` (mapped) | Pre-fill form from sample event metadata |

### Venue Suggestion Auto-fill

Pressing "Choose" on a suggestion maps the suggestion's fields onto the current form inputs by name, then dispatches `updateAllEventInputs`. A success toast confirms the action.

---

### CreateEventForm

**File:** `app/screens/Events/CreateEvent/CreateEventForm.js`

Handles form validation, payload assembly, and submission.

**Validation:** iterates `createEventInputs`, marks fields with `REQUIRED` validation as errored if empty, re-dispatches the updated array. Returns `false` if any field is invalid.

**Payload assembly:** reduces the inputs array into a flat object keyed by `name`, then:
- converts `eventDate` + `eventTime` into an ISO timestamp via `modifyTimeToISO`
- sets `tenantUid` from `auth.tenantId`
- forces `status: "pending"` on create

**Buttons:**
- **Continue** — validates and submits
- **Clear** — resets all inputs to defaults via `generateNewEventsInputs`
- **Go Back** — `navigation.goBack()`

---

## StakeHolder (stub)

**File:** `app/screens/StackHolder/StakeHolder.page.js`

Placeholder screen. Not currently registered in the navigator.
