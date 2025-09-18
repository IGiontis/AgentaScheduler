// src/navigation/AppNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalendarNavigator from "./CalendarNavigator";
import CreateEventScreen from "../features/CreateEventScreen";
import { Ionicons } from "@expo/vector-icons"; // optional for tab icons
import EventsYearScreen from "../features/EventsYearScreen";

export type AppTabParamList = {
  CalendarTab: undefined;
  CreateEventTab: undefined;
  EventsYearScreen: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const CalendarFormNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
      }}
    >
      <Tab.Screen
        name="CalendarTab"
        component={CalendarNavigator} // your existing stack
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="EventsYearScreen" // match AppTabParamList
        component={EventsYearScreen}
        options={{
          tabBarLabel: "Events Year",
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="CreateEventTab"
        component={CreateEventScreen} // new screen for event creation
        options={{
          tabBarLabel: "Create Event",
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default CalendarFormNavigator;
