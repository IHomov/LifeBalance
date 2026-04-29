import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TasksListScreen from '../screens/TasksListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import MoodTrackerScreen from '../screens/MoodTrackerScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: '🏠' }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksListScreen}
        options={{ tabBarLabel: '📅' }}
      />
      <Tab.Screen
        name="Add"
        component={AddTaskScreen}
        options={{ tabBarLabel: '➕' }}
      />
      <Tab.Screen
        name="Mood"
        component={MoodTrackerScreen}
        options={{ tabBarLabel: '📊' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
