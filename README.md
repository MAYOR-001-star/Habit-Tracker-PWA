# Habit Tracker PWA

A mobile-first Progressive Web App (PWA) built with Next.js that helps users track their daily habits, maintain streaks, and persist data locally.

## Project Overview

This application is a technical implementation of the Stage 3 Habit Tracker PWA requirements. It features a complete authentication flow (local), habit management (CRUD), streak calculation logic, and full PWA support including offline capabilities.

## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Habit-Tracker-PWA
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

## Run Instructions

1.  **Development Mode**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:3000`.

2.  **Production Build**:
    ```bash
    npm run build
    npm run start
    ```

## Test Instructions

The project includes unit, integration, and end-to-end tests.

-   **Run all tests**: `npm test`
-   **Unit tests (Vitest)**: `npm run test:unit` (includes coverage)
-   **Integration tests (Vitest + RTL)**: `npm run test:integration`
-   **E2E tests (Playwright)**: `npm run test:e2e`

### Coverage Report
The project maintains a minimum of 80% line coverage for files in `src/lib`. You can view the report after running `npm run test:unit`.

## Technical Implementation Details

### Local Persistence Structure
The app uses `localStorage` for all persistence, following the required contract:

-   `habit-tracker-users`: Stores a JSON array of users.
-   `habit-tracker-session`: Stores the active session object or `null`.
-   `habit-tracker-habits`: Stores a JSON array of habits, including completion dates and metadata.

### PWA Support
-   **Manifest**: Configured in `public/manifest.json` with required icons and theme colors.
-   **Service Worker**: Located at `public/sw.js`. It implements a cache-first strategy for static assets and a network-first strategy for navigation, with an offline fallback to the cached app shell (the root route).
-   **Registration**: Handled via the `SWRegistration` component in the root layout.

### Trade-offs and Limitations
-   **Local Auth**: Authentication is purely client-side for this stage. It is deterministic but not secure for production use with sensitive data.
-   **Storage Limit**: Using `localStorage` limits the total data to ~5MB, which is sufficient for a habit tracker but would need a real database for scale.
-   **Frequency**: Currently supports 'daily' frequency only, as per requirements.

## Mapping to Technical Requirements

### Required Test Files and Verifications

| Test File | Verification Goal |
| :--- | :--- |
| `tests/unit/slug.test.ts` | Validates slug generation logic (lowercase, hyphenated, special char removal). |
| `tests/unit/validators.test.ts` | Verifies habit name validation (empty check, length limits). |
| `tests/unit/streaks.test.ts` | Ensures correct current streak calculation from completion dates. |
| `tests/unit/habits.test.ts` | Validates immutable habit completion toggling logic. |
| `tests/integration/auth-flow.test.tsx` | Tests the integration of signup and login forms with storage. |
| `tests/integration/habit-form.test.tsx` | Tests dashboard habit management and UI updates. |
| `tests/e2e/app.spec.ts` | Full user journey: splash, auth, habit creation, persistence, and offline support. |

### Component Structure
-   `src/components/auth`: `LoginForm`, `SignupForm`.
-   `src/components/habits`: `HabitCard`, `HabitForm`, `HabitList`.
-   `src/components/shared`: `SplashScreen`, `ProtectedRoute`, `SWRegistration`.

### Utility Functions
-   `src/lib/slug.ts`: `getHabitSlug`
-   `src/lib/validators.ts`: `validateHabitName`
-   `src/lib/streaks.ts`: `calculateCurrentStreak`
-   `src/lib/habits.ts`: `toggleHabitCompletion`
