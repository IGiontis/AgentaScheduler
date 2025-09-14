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

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList,"CalendarHome">;

const CalendarHome = () => {
  const navigation = useNavigation<CalendarNav>();

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
            <Pressable key={i} style={{ width: "47%", marginVertical: 10 }}  onPress={() => navigation.navigate("MonthDetails", { monthName: month })}>
              <MonthCalendar year={currentYear} month={i} events={fakeEvents} />
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
