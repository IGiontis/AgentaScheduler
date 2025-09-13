import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import MonthCalendar from "./MonthCalendar";
import { SafeAreaView } from "react-native-safe-area-context";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CalendarHome = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {monthNames.map((_, i) => (
            <MonthCalendar key={i} year={2025} month={i} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarHome;

const styles = StyleSheet.create({

  scrollContent: {
    padding: 8,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
