import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthCalendar from "./MonthCalendar";
import { monthNames } from "../utils/calendar";
import { CalendarEvent } from "../types/types";

const CalendarHome = () => {
  const currentYear = new Date().getFullYear();

  const fakeEvents: CalendarEvent[] = [
    { ID: "1", date: "03-02-2025", title: "Meeting", colorCode: 1 },
    { ID: "2", date: "12-12-2025", title: "Birthday", colorCode: 2 },
    { ID: "3", date: "22-07-2025", title: "Workout", colorCode: 3 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
  scrollContent: { padding: 8 },
  container: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
});
