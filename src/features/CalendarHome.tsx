import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthCalendar, { MonthEvents } from "./MonthCalendar";
import { monthNames } from "../utils/calendar";

const CalendarHome = () => {
  const currentYear = new Date().getFullYear();

  const fakeEvents: MonthEvents = {
  "03/03/2025": [{ color: "blue", title: "Meeting" }],
  "15/12/2025": [{ color: "green", title: "Birthday" }],
  "21/06/2025": [{ color: "orange", title: "Workout" }],
};

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
