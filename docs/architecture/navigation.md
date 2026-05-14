# Navigation

## Stack

- `@react-navigation/native` — core
- `@react-navigation/bottom-tabs` — tab navigator
- `@react-navigation/native-stack` — stack navigator (available for future nested stacks)

---

## Route Tree

```
<NavigationContainer>
  └── Tab.Navigator (CustomTabBar)
        ├── EventsDashboard   →  screens/Events/EventsDashboard/EventsDashboard.page.js
        └── CreateEvent       →  screens/Events/CreateEvent/CreateEditEvent.page.js
```

The tab bar is fully custom — see [CustomTabBar](#custom-tab-bar).

---

## Screens

| Route Name | Component | Purpose |
|---|---|---|
| `EventsDashboard` | `EventsDashboard.page.js` | Default landing screen; lists events with filters |
| `CreateEvent` | `CreateEditEvent.page.js` | Create **or** edit an event (mode-switched via route params) |

### Edit Mode

`CreateEditEvent` checks `route.params.mode === "edit"` to switch between create and edit behaviour. Navigate to edit mode from any screen:

```js
navigation.navigate("CreateEvent", { mode: "edit", event: eventObject });
```

---

## Custom Tab Bar

**File:** `app/components/CustomTabBar/CustomTabBar.component.js`

An animated floating pill tab bar positioned 20px from the bottom of the screen.

### Behaviour

- A green pill (`#26C867`) slides with a spring animation to the active tab position.
- Tab press triggers `triggerHeavyHaptics()` before navigating.
- Initial pill position is set without animation; subsequent transitions use `Animated.spring`.

### Route Labels

```js
const ROUTE_LABELS = {
  EventsDashboard: "Events",
  CreateEvent: "Create Event",
};
```

Add a new tab by registering it in `Routes.js` and adding an entry to `ROUTE_LABELS`.

---

## Navigation from Inside Components

Use the `useNavigation` hook anywhere below `<NavigationContainer>`:

```js
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();
navigation.navigate("EventsDashboard");
navigation.goBack();
```

Navigation is also passed as a prop to thunks that need to redirect after an async operation (e.g., after a successful event create/update).
