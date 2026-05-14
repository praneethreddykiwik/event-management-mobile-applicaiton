# Setup

## Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator, Android Emulator, or Expo Go on a physical device

## Environment Variables

Create a `.env` file in the project root:

```
EXPO_PUBLIC_BE_API_BASE_URL=https://your-api-url.com
```

This is the only required variable. It sets the base URL for all API requests (prefixed with `/v1`).

## Install & Run

```bash
npm install

# iOS simulator
npm run ios

# Android emulator
npm run android

# Web browser
npm run web

# Expo dev server (choose platform interactively)
npm start
```
