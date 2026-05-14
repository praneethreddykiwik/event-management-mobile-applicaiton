# EVNT — Event Management App

A React Native mobile application for managing events, built with Expo. Supports creating, editing, assigning, filtering, and deleting events through a REST API backend.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo ~54 |
| State Management | Redux Toolkit |
| Navigation | React Navigation (Bottom Tabs + Native Stack) |
| HTTP Client | Axios |
| Styling | Styled Components |
| Haptics | expo-haptics |
| Date Formatting | moment.js |
| Notifications | react-native-toast-message |

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or Expo Go on a physical device)

### Environment Variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_BE_API_BASE_URL=https://your-api-url.com
```

### Install & Run

```bash
npm install

# iOS
npm run ios

# Android
npm run android

# Web
npm run web

# Expo dev server
npm start
```

## Project Structure

```
app/
├── App.js                     # Root component (Provider + Theme + Navigation)
├── Routes.js                  # Tab navigator and route definitions
├── index.js                   # Entry point
│
├── api/                       # API layer
│   ├── client/httpsClient.js  # Axios instance
│   ├── events.api.js          # Events endpoints
│   └── users.api.js           # Users endpoints
│
├── assets/                    # App icons and splash screen
│
├── components/                # Reusable UI components
│   ├── Buttons/               # Button component (multiple variants)
│   ├── CustomTabBar/          # Animated bottom tab bar
│   ├── Icons/                 # Icon component
│   ├── Inputs/                # Input components (text, number, date, time, dropdown, textarea)
│   ├── Styled/                # Shared styled-component primitives
│   └── Venue/                 # Venue suggestion component
│
├── constants/                 # App-wide constants
│   ├── events.constants.js    # Event types, statuses, filter defaults, sample metadata
│   ├── roles.jsx              # User role constants
│   ├── statuses.js            # Event and task status maps
│   └── validations.constants.js
│
├── helpers/
│   └── Dashboard.helper.js    # UI mapping helpers for events and tasks
│
├── HOC/
│   └── ScreenWrapper.js       # SafeAreaView wrapper with theme background
│
├── redux/                     # Redux Toolkit store
│   ├── store.js
│   ├── auth/                  # Auth slice (tenantId)
│   ├── events/                # Events slice + async actions
│   ├── forms/                 # Form state slice + event field metadata
│   └── users/                 # Users slice (event managers)
│
├── screens/
│   └── Events/
│       ├── CreateEvent/       # Create / Edit event screen
│       └── EventsDashboard/   # Dashboard screen with filters and event list
│
├── theme/
│   ├── theme.js               # Design tokens (colors, typography, shadows, etc.)
│   └── useTheme.js            # Hook that resolves active theme
│
└── utils/
    ├── haptics/haptics.utils.js
    └── utils.js               # Date, time, and status color utilities
```

## Documentation

### Getting Started
| Document | Description |
|---|---|
| [Setup](docs/getting-started/setup.md) | Install, environment variables, run commands |
| [Project Structure](docs/getting-started/project-structure.md) | Folder map with explanations |

### Architecture
| Document | Description |
|---|---|
| [Overview](docs/architecture/overview.md) | App architecture, data flow, and patterns |
| [Navigation](docs/architecture/navigation.md) | Route structure and screen flow |
| [State Management](docs/architecture/state-management.md) | Redux store, slices, and actions |

### API
| Document | Description |
|---|---|
| [Endpoints](docs/api/endpoints.md) | HTTP client, endpoints, and payload shapes |

### UI
| Document | Description |
|---|---|
| [Components](docs/ui/components.md) | Reusable component API reference |
| [Screens](docs/ui/screens.md) | Screen-by-screen breakdown |
| [Theme](docs/ui/theme.md) | Design tokens and theming system |

### Reference
| Document | Description |
|---|---|
| [Constants & Enums](docs/reference/constants-enums.md) | All constants, enums, and status maps |
| [Utilities](docs/reference/utilities.md) | Utility and helper function reference |
