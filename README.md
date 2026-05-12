This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# 🌿 LifeBalance - Task & Mood Tracker

LifeBalance is a mobile application built with React Native designed to help users organize their daily tasks and monitor their emotional well-being. This project focuses on implementing a robust navigation structure and data flow.

## 🚀 Features
- **Onboarding Flow**: Clean and minimal Title and Registration screens.
- **Dynamic Task Management**: Users can navigate to specific task groups (Work, Study, Kids).
- **Navigation Architecture**: A seamless blend of Stack and Bottom Tab navigation.
- **Custom UI Components**: Hand-crafted headers, specialized task cards, and interactive buttons.

## 🛠 Navigation Structure
The app utilizes **React Navigation v6/v7**:
1. **Stack Navigator**: Handles the authentication and onboarding flow (Title -> Registration -> Main).
2. **Bottom Tab Navigator**: Provides quick access to the core features:
   - **Home**: Dashboard with task progress.
   - **Tasks**: List of current activities.
   - **Add Task**: Dynamic form with parameter handling.
   - **Mood**: Emotional state tracker.

### Key Technical Implementation:
- **Route Params**: Passing `groupName` from the Home dashboard to the Add Task form to pre-fill data.
- **Header Customization**: Fully custom headers with `navigation.goBack()` logic and absolute positioning for title centering.
- **Clean Code**: Screen names managed via a central `SCREENS` constant file.
- **Modern Interactions**: Transitioned from `TouchableOpacity` to `Pressable` for better haptic feedback and performance.

## 💻 Tech Stack
- **Framework**: React Native
- **Navigation**: @react-navigation/native, stack, bottom-tabs
- **Icons/Styling**: Custom StyleSheet architecture


## 💻 Video-demonstration
video.mp4

## 🚀 Homework: Redux, Context API, and Navigation

This phase of the project focused on core task management functionality, global state handling, and a flexible user interface.

### ✅ Features Implemented:

1.  **Redux State Management**:
    * Created `tasksSlice` to manage the global state of the task list.
    * **Toggle Status**: Implemented logic to switch task status between "To do" and "Complete" using `dispatch`.
    * **Remove Item**: Users can delete tasks from the list, updating the global state instantly.
    * Integrated external API data fetching with Redux store synchronization.

2.  **Context API (Global Theming)**:
    * Developed a `ThemeProvider` to toggle between **Light** and **Dark** modes.
    * Applied theme colors (background, text, accent) globally across all screens using `useContext`.

3.  **Navigation & Interaction**:
    * Set up `Stack Navigator` for seamless transitions between the List and Details screens.
    * **onPress**: Handles status toggling.
    * **onLongPress**: Triggers navigation to the `TaskDetailsScreen`, passing the `itemId` as a parameter.

4.  **UI/UX & Layout Fixes**:
    * Built a custom, reusable `TaskListItem` component with a responsive Flexbox layout.
    * Fixed a critical layout bug where long task titles would push the status badge off-screen.
    * Used `flex: 1` and `numberOfLines={2}` to ensure a "bulletproof" UI that adapts to any content length.
    * Added `ActivityIndicator` for better user experience during data loading.

### 🛠 Tech Stack used:
* **React Native** (Core)
* **Redux Toolkit** (State Management)
* **React Navigation** (Routing)
* **Context API** (Theming)

## 🚀 Optimization & Performance

As part of the project performance tuning, the following optimizations were implemented:

### 📦 Bundle Analysis & Dependency Management
- **Analysis Tool**: Used `react-native-bundle-visualizer` to audit the application size.
- **Current Bundle Size**: **3.54 MB**.
  <img width="440" height="142" alt="bundle size" src="https://github.com/user-attachments/assets/b3dc242a-5d18-4633-9740-e7348653fdcd" />

- **Key Findings**: Identified `react-native-vector-icons` and navigation modules as the primary contributors to the bundle weight.
- **Library Replacement**: To manage dates efficiently, **Day.js** (~2KB) was integrated as a lightweight alternative to heavier libraries like `moment.js` (~70KB+ without locales).
- **Impact**: This choice prevented an unnecessary increase of 200-300KB in bundle size (considering moment.js with locales) while providing full functionality for the dynamic calendar.

### ⚡ Rendering & UX Improvements
- **Memoization**: Implemented `React.memo` and `useCallback` hooks to prevent unnecessary re-renders of list items, ensuring smooth performance during theme switching.
- **Layout Animations**: Integrated `LayoutAnimation` (Spring and Ease-in-out presets) to provide fluid visual transitions when deleting or updating tasks.
- **Bug Fixes**: Resolved critical "Object is not a function" render errors by synchronizing dispatch actions and component props.

<img width="390" height="822" alt="before" src="https://github.com/user-attachments/assets/54e8638c-acbc-491f-add7-f0514ab9e46e" />
 <img width="422" height="917" alt="after" src="https://github.com/user-attachments/assets/4d9611df-b9d6-4682-9a7a-aa5336a740fa" />
  






 ## 💻 Video-demonstration
 https://github.com/user-attachments/assets/898724ce-d271-4507-81be-6801d93b33d7
