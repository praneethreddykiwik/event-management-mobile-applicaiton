# State Management

Redux Toolkit is used for all global state. The store lives in `app/redux/store.js`.

## Store Shape

```js
{
  events: EventsState,
  users:  UsersState,
  auth:   AuthState,
  forms:  FormsState,
}
```

---

## Slices

### `events` — `app/redux/events/events.slice.js`

Manages the event list, status counts, active filters, and per-operation loading flags.

```ts
{
  events: Event[],
  eventsLoading: boolean,
  eventsError: string | null,
  eventsStatusCounts: Record<string, number>,
  selectedEventFilters: Filter[],
  assignEventLoading: boolean,
  deleteEventLoading: boolean,
  createEventLoading: boolean,
  updateEventLoading: boolean,
}
```

**Selector:** `eventsSelector(state)` → `state.events`

#### Async Actions (`app/redux/events/events.action.js`)

| Action | Thunk name | API call | Side effects |
|---|---|---|---|
| Fetch events | `fetchEventsAction` | `GET /events?status=…` | — |
| Create event | `createEventAction` | `POST /events` | Toast success/error, navigate to Dashboard |
| Update event | `updateEventAction` | `PATCH /events/:uid` | Toast success/error, navigate to Dashboard |
| Filter events | `eventsFilterAction` | `GET /events?status=…` | Updates `selectedEventFilters` on `pending` |
| Assign event | `assignEventAction` | `PATCH /events/:uid/assign` | — |
| Delete event | `deleteEventAction` | `DELETE /events/:uid` | Removes event from `state.events` on `fulfilled` |

---

### `users` — `app/redux/users/users.slice.js`

Holds the list of event managers fetched from the backend.

```ts
{
  eventManagers: Manager[],
  eventManagersLoading: boolean,
  eventManagersError: boolean | string,
}
```

**Selector:** `userSelecter(state)` → `state.users`

#### Async Actions (`app/redux/users/users.actions.js`)

| Action | Thunk name | API call |
|---|---|---|
| Fetch managers | `fetchManagersAction` | `GET /users/event-managers` |

`fetchManagersAction` accepts an optional `callback` in its payload. The callback receives the resolved managers array, allowing callers to chain logic (e.g., seeding form inputs) without a second dispatch cycle.

---

### `auth` — `app/redux/auth/auth.slice.js`

Minimal slice holding tenant context. Authentication is not yet fully implemented.

```ts
{
  tenantId: string,   // hardcoded "helm" for now
}
```

**Selector:** `authSelector(state)` → `state.auth`

---

### `forms` — `app/redux/forms/forms.slice.js`

Stores the dynamic list of input field objects that drive the create/edit event form.

```ts
{
  createEventInputs: FieldMetadata[],
}
```

**Selectors / Actions:**

| Export | Type | Description |
|---|---|---|
| `formsSelector` | selector | Returns `state.forms` |
| `updateEventInputs` | reducer action | Updates a single field's value and clears its error |
| `updateAllEventInputs` | reducer action | Replaces the entire inputs array |

---

## Form Metadata

**File:** `app/redux/forms/metadata/event.metadata.js`

Defines `BASE_EVENT_METADATA` — an array of field descriptor objects:

```ts
{
  type: "text" | "textarea" | "dropdown" | "date" | "time" | "number",
  name: string,          // matches the API payload key
  value: string,
  placeholder: string,
  label: string,
  options?: { value, label }[],   // dropdowns only
  validations?: string[],         // e.g. ["REQUIRED"]
  error?: string | null,
}
```

### Helper Functions

| Function | Description |
|---|---|
| `generateNewEventsInputs(eventManagers)` | Returns fresh inputs with manager options populated |
| `generateEventDataToEdit(eventManagers, event)` | Returns inputs pre-filled from an existing event object |

---

## Dispatch Patterns

### Fetch on mount

```js
useEffect(() => {
  dispatch(fetchManagersAction());
  dispatch(fetchEventsAction({ query: "?status=pending,assigned,..." }));
}, []);
```

### Handle form field change

```js
const onChange = (e) => {
  dispatch(updateEventInputs({ name: e.target.name, value: e.target.value }));
};
```

### Submit form

```js
dispatch(createEventAction({ navigation, reqPayload }));
// or
dispatch(updateEventAction({ navigation, reqPayload }));
```
