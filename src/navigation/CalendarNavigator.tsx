import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarHome from "../Screens/CalendarHome/CalendarHome";
import MonthDetails from "../components/MonthDetails";
import { CalendarEvent } from "../types/calendar";

export type CalendarStackParamList = {
  CalendarHome: undefined;
  MonthDetails: { monthIndex: number; monthName: string; year: number; events?: CalendarEvent[] };
};

const Stack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalendarHome" component={CalendarHome} options={{ title: "ΗΜΕΡΟΛΟΓΙΟ", headerShown: false }} />
      <Stack.Screen
        name="MonthDetails"
        component={MonthDetails}
        options={({ route }) => ({
          title: route.params.monthName,
        })}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
