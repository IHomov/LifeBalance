# 🌿 LifeBalance - Task & Mood Tracker

LifeBalance is a modern mobile application built with **React Native** designed to help users organize their daily routine, prevent burnout, and maintain a healthy balance between different life areas (Work, Study, Kids, Home).

---

## 💻 Video Demonstration
To see the application interface, smooth custom animations, active REST API integration, and full navigation flow in real-time, please watch our demo:

🎥 **[Watch the App Video Demonstration](./video.mp4)**

*(Note: The `video.mp4` file is located in the root directory of this repository).*

---

## 🚀 Key Features

* **Progress Dashboard:** The main screen displays an animated circular progress indicator showing today's task completion rate.
* **Task Categorization:** Tasks are grouped into dedicated categories (Work, Study, Kids, Home), each featuring unique UI theme colors.
* **Interactive Mood Tracker:** A specialized screen with custom vertical `MoodBar` charts where users can select their current emotional state (emoji) and receive instant, animated alert feedback.
* **Smart Status Tabs (Filtering):** Fast task sorting on the list screen using interactive navigation tabs:
    * `All` — Displays the entire task list.
    * `To do` — New tasks starting with a clean `0%` progress.
    * `In Progress` — Active tasks currently in motion (from `1%` to `99%`).
    * `Complete` — Tasks marked as done or reaching `100%`.
* **💡 REST API Balance Tip:** Integration with an external asynchronous API to fetch and display daily quotes/tips regarding work-life balance.
* **Global Dark / Light Mode:** Seamless theme switching across all app screens powered by React Context.

---

## 🛠️ Navigation Architecture (React Navigation)

The app combines **Native Stack** and **Bottom Tab** navigators for a robust mobile UX:
1. **Stack Navigator:** Manages the onboarding process (Title Screen -> Registration Screen) and handles transitions between the List view and individual Task Details.
2. **Bottom Tab Navigator:** Provides quick, thumb-friendly access to core application features:
    * `Home` — Dashboard with total statistics and metrics.
    * `Tasks` — Dynamically filtered list of activities.
    * `Add Task` — Form for creating new items with param handling.
    * `Mood` — Emotional tracking suite with analytics.

### Technical Implementation:
* **Route Params:** When clicking a dashboard category (e.g., *Work*), the app passes the parameter to filter the list. Clicking `See all` or `View Task` passes `null`, resetting the category filter to display all global tasks.
* **Route Safety:** All navigation paths are strictly managed using a centralized constants file (`SCREENS`).

---

## 📐 State Management & Architecture

Instead of heavy external libraries like Redux, the app uses a lightweight and efficient **React Context API** architecture:
* `ThemeContext`: Globally stores the current theme state (`isDark`), color palette objects, and the `toggleTheme` function.
* `AppContext`: Acts as a single source of truth for the `tasks` array and CRUD actions (`addTask`, `deleteTask`, `toggleTaskComplete`). This ensures instant data synchronization between creation and list views without forced re-renders.

### REST API Optimization:
Network calls in `fetchBalanceTips()` (`services/api.js`) are safely wrapped inside a `useEffect` hook with an empty dependency array `[]`. This ensures the API is called **exactly once when the screen mounts**, protecting the UI from lagging and avoiding memory leaks.

---

## ⚡ Performance & UI Tuning

* **Rendering Optimization:** Implemented event handler memoization to ensure optimal list performance in `FlatList` component loops.
* **Native Animations:** Task deletion, creation, and status toggles are wrapped in `LayoutAnimation` (using Spring and Ease-In-Out presets) for fluid visual responses.
* **Bulletproof UI Layout:** Custom components use adaptive Flexbox layouts with `flex: 1` and `numberOfLines={2}` to prevent long task titles from breaking UI element bounds.
* **Bundle Weight:** Integrated ultra-lightweight **Day.js (~2KB)** instead of the heavy legacy library `moment.js (~70KB+)`, keeping the final application bundle at **3.54 MB**.

---

## 💻 Tech Stack
* **Core:** React Native (CLI), React Hooks (`useState`, `useEffect`, `useContext`, `useMemo`)
* **Navigation:** `@react-navigation/native`, `native-stack`, `bottom-tabs`
* **State Management:** React Context API
* **Date Utility:** Day.js
* **Styling:** StyleSheet Architecture with dynamic dark/light theme objects.

---

## 🛠️ Getting Started

To run this project locally on your machine, follow these steps using your computer's terminal:

### Step 1: Start Metro
First, run **Metro Bundler** (the JavaScript server) from the root directory of your project:
```sh
npm start
# or using yarn
yarn start

### Step 2: Build and run the application
Open a new terminal window in your editor, keep Step 1 running, and enter one of the following commands depending on your emulator platform:

Android
npm run android
# or using yarn
yarn android

iOS
# Install native CocoaPods dependencies (required on first setup)
cd ios && pod install && cd ..

# Build and launch the iOS Simulator
npm run ios
# or using yarn
yarn ios

### Project Structure Guide
src/context/ — Global state managers (AppContext.js, ThemeContext.js).

src/screens/ — Full-screen application views.

src/components/ — Reusable, isolated atom UI blocks (FormItem, TaskListItem, MoodBar).

src/services/ — Network layer (api.js) handling external REST API calls.