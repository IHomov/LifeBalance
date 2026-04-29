import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TitleScreen from '../screens/TitleScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TasksListScreen from '../screens/TasksListScreen';
import MoodTrackerScreen from '../screens/MoodTrackerScreen';
import TabNavigator from './TabNavigator';
import { SCREENS } from '../constants/screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.TITLE}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={SCREENS.TITLE} component={TitleScreen} />
      <Stack.Screen
        name={SCREENS.REGISTRATION}
        component={RegistrationScreen}
      />
      <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Stack.Screen name={SCREENS.ADD_TASK} component={AddTaskScreen} />
      <Stack.Screen name={SCREENS.TASKS_LIST} component={TasksListScreen} />
      <Stack.Screen name={SCREENS.MOOD_TRACKER} component={MoodTrackerScreen} />
      <Stack.Screen name={SCREENS.MAIN} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
