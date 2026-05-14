# Project Structure

```
app/
├── App.js                          # Root component — Provider + ThemeProvider + NavigationContainer
├── Routes.js                       # Tab navigator and route definitions
├── index.js                        # Expo entry point
│
├── api/                            # API layer (never called directly from components)
│   ├── client/
│   │   └── httpsClient.js          # Single Axios instance (base URL, timeout, headers)
│   ├── events.api.js               # Events CRUD endpoints
│   └── users.api.js                # Users / event-managers endpoint
│
├── assets/                         # Static assets
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png           # Android adaptive icon
│   └── favicon.png                 # Web favicon
│
├── components/                     # Reusable, presentational UI components
│   ├── Buttons/
│   │   └── Button.js               # Multi-variant button (primary, outlined, secondary, delete, …)
│   ├── CustomTabBar/
│   │   └── CustomTabBar.component.js  # Animated floating pill tab bar
│   ├── Icons/
│   │   └── Icons.js                # Icon wrapper component
│   ├── Inputs/
│   │   ├── Inputs.js               # Dispatcher — renders correct input by type
│   │   ├── BaseInput.js            # Text / email input
│   │   ├── NumberInput.js          # Numeric input
│   │   ├── DateInput.js            # Date picker input
│   │   ├── TimeInput.js            # Time picker input
│   │   ├── Dropdown.js             # Dropdown / select input
│   │   └── TextArea.js             # Multi-line text input
│   ├── Styled/
│   │   └── Buttons.styled.js       # Shared styled-component button primitives
│   └── Venue/
│       └── VenueSuggestion.js      # Venue suggestion card with auto-fill button
│
├── constants/                      # App-wide static data
│   ├── events.constants.js         # EVENT_TYPE_OPTIONS, EVENT_STATUSES, INITIAL_FILTERS, eventsMetadata
│   ├── roles.jsx                   # User role constants
│   ├── statuses.js                 # eventStatuses and taskStatuses UI maps
│   └── validations.constants.js    # validationList enum
│
├── helpers/
│   └── Dashboard.helper.js         # mapEventForUI, mapTaskForUI
│
├── HOC/
│   └── ScreenWrapper.js            # SafeAreaView with themed background colour
│
├── redux/                          # Redux Toolkit store
│   ├── store.js                    # configureStore — combines all slices
│   ├── auth/
│   │   ├── auth.slice.js           # tenantId state
│   │   └── auth.actions.js
│   ├── events/
│   │   ├── events.slice.js         # Event list, loading flags, filter state
│   │   └── events.action.js        # Async thunks: fetch, create, update, filter, assign, delete
│   ├── forms/
│   │   ├── forms.slice.js          # Dynamic form field state (createEventInputs)
│   │   └── metadata/
│   │       └── event.metadata.js   # BASE_EVENT_METADATA, generateNewEventsInputs, generateEventDataToEdit
│   └── users/
│       ├── users.slice.js          # eventManagers list and loading state
│       └── users.actions.js        # fetchManagersAction thunk
│
├── screens/                        # Page-level components connected to Redux
│   └── Events/
│       ├── CreateEvent/
│       │   ├── CreateEditEvent.page.js   # Create / Edit screen (mode-switched via route.params)
│       │   ├── CreateEventForm.js        # Form validation, payload assembly, submission
│       │   └── CreateEvent.page.js       # (legacy / unused)
│       ├── EventsDashboard/
│       │   ├── EventsDashboard.page.js   # Dashboard — summary, filters, event list
│       │   └── components/
│       │       ├── EventSummaryCards.js  # Total events + managers stat cards
│       │       ├── CreateEventButtons.js # "Create Event" CTA
│       │       ├── EventsFilterCards.js  # Toggleable status filter chips
│       │       └── EventItem.js          # Single event card (assign, delete, view)
│       └── StackHolder/
│           └── StakeHolder.page.js       # Placeholder (not in navigator)
│
├── theme/
│   ├── theme.js                    # All design tokens: colors, typography, shadows, badges, spacings
│   └── useTheme.js                 # Hook that returns the active theme object
│
└── utils/
    ├── haptics/
    │   └── haptics.utils.js        # triggerHaptics, triggerHeavyHaptics
    └── utils.js                    # Date/time formatting, ISO conversion, status colour logic
```
