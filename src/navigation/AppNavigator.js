import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import TitleScreen from '../screens/TitleScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TasksListScreen from '../screens/TasksListScreen';
import MoodTrackerScreen from '../screens/MoodTrackerScreen';
import TabNavigator from './TabNavigator'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Title" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="TasksList" component={TasksListScreen} />
      <Stack.Screen name="MoodTracker" component={MoodTrackerScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;