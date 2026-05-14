# Architecture

## Overview

EVNT follows a layered architecture common to React Native + Redux Toolkit apps:

```
UI (Screens + Components)
        ↓ dispatch / useSelector
Redux Store (State + Actions)
        ↓ async thunks
API Layer (Axios)
        ↓
REST Backend (/v1)
```

## Application Bootstrap

`app/index.js` → `App.js`

`App.js` composes three providers in order:

1. **`<Provider store={store}>`** — makes the Redux store available globally
2. **`<ThemeProvider theme={theme}>`** — injects the active theme into all styled-components
3. **`<NavigationContainer>`** — wraps the React Navigation tree

```js
// App.js (simplified)
const AppWithTheme = () => {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};
```

## Layered Breakdown

### 1. API Layer (`app/api/`)

- `httpsClient.js` — single Axios instance, base URL from `EXPO_PUBLIC_BE_API_BASE_URL`, 5-minute timeout, JSON headers, credentials enabled.
- `events.api.js` — thin wrappers: `fetchEventsApi`, `createEventApi`, `updateEventApi`, `assignEventApi`, `deleteEventApi`.
- `users.api.js` — `getManagersApi` for fetching event managers.

API functions are **not called directly from components**. They are only called from Redux async thunks.

### 2. State Layer (`app/redux/`)

Four slices in the Redux store:

| Slice | Responsibility |
|---|---|
| `events` | Event list, loading/error states, filter state |
| `users` | Event managers list and loading state |
| `auth` | Tenant context (`tenantId`) |
| `forms` | Dynamic form field state for create/edit event |

Async operations use `createAsyncThunk`. Side effects (toast notifications, navigation) are triggered inside the thunk, not in reducers.

### 3. Screen Layer (`app/screens/`)

Screens are connected to Redux via `useSelector` and `useDispatch`. They orchestrate data fetching on mount and delegate rendering to component subtrees.

### 4. Component Layer (`app/components/`)

Purely presentational. Components receive props and emit callbacks — they do not dispatch actions directly (except `CreateEventForm`, which dispatches form field updates).

## Data Flow — Creating an Event

```
CreateEditEvent (screen)
  → CreateEventForm (component)
    → Inputs (renders typed fields from Redux form state)
    → onChange → dispatch(updateEventInputs)
    → onSubmit → validateFields → dispatch(createEventAction)
      → createEventApi (Axios POST /events)
      → on success: Toast.show + navigation.navigate("EventsDashboard")
      → on error: Toast.show with error message
```

## Form Metadata Pattern

Event form fields are defined as metadata arrays (`BASE_EVENT_METADATA` in `event.metadata.js`) — each field object carries its type, name, placeholder, label, options (for dropdowns), and validation rules. This metadata drives both the initial Redux state and the dynamic rendering of `<Inputs>` components. Edit mode populates values from the existing event object before seeding the store.

## Key Design Decisions

- **No direct API calls from components** — all async work goes through thunks to keep side effects testable and centralized.
- **Form state in Redux** — avoids prop drilling through deeply nested form trees; form fields are part of global state.
- **Styled-components with theme props** — all colours, fonts, and shadows come from the theme object, making dark mode straightforward to extend.
- **Metadata-driven forms** — adding a new field means adding one entry to `BASE_EVENT_METADATA`; no UI code changes required.
