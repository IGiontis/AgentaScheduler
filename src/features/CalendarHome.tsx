import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import MonthCalendar from "../components/MonthCalendar";
import { monthNames } from "../utils/calendar";
import { CalendarEvent } from "../types/types";
import { useThemeContext } from "../context/ThemeContext";
import CalendarLegend from "../components/CalendarLegend";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";
import { currentYear } from "../utils/date";
import { getHolidayEvents } from "../utils/greekHolidays";

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList, "CalendarHome">;

const CalendarHome = () => {
  const navigation = useNavigation<CalendarNav>();

  const { theme, toggleTheme, colors } = useThemeContext();

  const userEvents: CalendarEvent[] = [
    { ID: "1", date: "03/02/2025", title: "Meeting", colorCode: 3 },
    { ID: "2", date: "12/12/2025", title: "Birthday", colorCode: 3 },
    { ID: "3", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "4", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "5", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "6", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "7", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "81", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "823", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "8324", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "8123", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "8112", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "84234", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "8634", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "86", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "84", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "833", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "877", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "8771213", date: "22/07/2025", title: "Workout", colorCode: 3 },
    { ID: "877333", date: "22/07/2025", title: "Workout", colorCode: 3 },
  ];

  const holidayEvents = getHolidayEvents(currentYear);

  // Merge user events + holiday events
  const allEvents = [...userEvents, ...holidayEvents];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header with theme toggle */}
      <View style={styles.header}>
        <CalendarLegend />
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1, // subtle feedback
            },
          ]}
        >
          <Ionicons name={theme === "dark" ? "sunny" : "moon"} size={22} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}>
        <View style={styles.container}>
          {monthNames.map((month, i) => (
            <Pressable key={i} style={{ width: "47%", marginVertical: 10 }} onPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: i })}>
              <MonthCalendar
                year={currentYear}
                month={i}
                events={allEvents}
                onDayPress={() =>
                  navigation.navigate("MonthDetails", {
                    monthName: month,
                    monthIndex: i,
                    events:allEvents
                  })
                }
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarHome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  scrollContent: {
    padding: 8,
    flexGrow: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
