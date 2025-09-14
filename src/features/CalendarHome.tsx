import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import MonthCalendar from "./MonthCalendar";
import { monthNames } from "../utils/calendar";
import { CalendarEvent } from "../types/types";
import { useThemeContext } from "../context/ThemeContext";

const CalendarHome = () => {
  const currentYear = new Date().getFullYear();
  const { theme, toggleTheme, colors } = useThemeContext();

  const fakeEvents: CalendarEvent[] = [
    { ID: "1", date: "03-02-2025", title: "Meeting", colorCode: 1 },
    { ID: "2", date: "12-12-2025", title: "Birthday", colorCode: 2 },
    { ID: "3", date: "22-07-2025", title: "Workout", colorCode: 3 },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header with theme toggle */}
      <View style={styles.header}>
        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1, // subtle feedback
            },
          ]}
        >
          <Ionicons
            name={theme === "dark" ? "sunny" : "moon"}
            size={28}
            color={colors.text}
          />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
      >
        <View style={styles.container}>
          {monthNames.map((_, i) => (
            <MonthCalendar key={i} year={currentYear} month={i} events={fakeEvents} />
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
    padding: 12,
    alignItems: "flex-end", // aligns toggle to top-right
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
