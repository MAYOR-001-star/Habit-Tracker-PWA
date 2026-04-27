# Habit Tracker PWA

## Project Overview
A mobile-first Habit Tracker Progressive Web App built with Next.js, featuring local persistence and offline support. This application allows users to track daily habits, view streaks, and work offline.

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `pnpm install`.
3. Run the development server: `pnpm dev`.

## Run Instructions
- Development: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`

## Test Instructions
- Unit Tests: `pnpm test:unit` (includes coverage report)
- Integration Tests: `pnpm test:integration`
- E2E Tests: `pnpm test:e2e`
- All Tests: `pnpm test`

## Local Persistence Structure
The app uses `localStorage` with the following keys:
- `habit-tracker-users`: JSON array of users.
- `habit-tracker-session`: Current active session or null.
- `habit-tracker-habits`: JSON array of habits.

Each habit includes an array of `completions` containing ISO dates (YYYY-MM-DD).

## PWA Support
Implemented using a custom service worker (`public/sw.js`) and a manifest file (`public/manifest.json`). 
- The service worker caches the app shell (routes, icons, etc.) on the first load.
- Subsequent visits while offline load the cached app shell, preventing a hard crash.
- Manifest defines standalone display and theme colors for a native-like experience.

## Trade-offs and Limitations
- **Local-only persistence**: Data is stored in the browser and will be lost if site data is cleared.
- **No multi-device sync**: Since there is no backend, data does not sync across devices.
- **Basic Security**: Passwords are stored in plain text in localStorage for this technical stage.

## Test Verification Map
| Test File | Behavior Verified |
|-----------|-------------------|
| `tests/unit/slug.test.ts` | Correct slugification of habit names. |
| `tests/unit/validators.test.ts` | Validation of habit names (length, empty state). |
| `tests/unit/streaks.test.ts` | Accurate calculation of current streaks including day gaps. |
| `tests/unit/habits.test.ts` | Correct toggling of completion dates without mutation. |
| `tests/integration/auth-flow.test.tsx` | UI behavior for signup and login flows. |
| `tests/integration/habit-form.test.tsx` | Habit creation, editing, deletion, and UI updates. |
| `tests/e2e/app.spec.ts` | End-to-end user journeys, persistence, and PWA offline behavior. |
