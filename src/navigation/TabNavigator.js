import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import TasksListScreen from '../screens/TasksListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import MoodTrackerScreen from '../screens/MoodTrackerScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 5,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
    tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Tasks') {
            iconName = 'calendar';
          } else if (route.name === 'AddTask') {
            iconName = 'plus-circle'; 
            size = 25; 
          } else if (route.name === 'MoodTracker') {
            iconName = 'smile';
          }
          return <Icon name={iconName} size={size} color={color} />;  
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksListScreen} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} />
      <Tab.Screen name="MoodTracker" component={MoodTrackerScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
