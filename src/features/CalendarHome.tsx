import React, { useMemo } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import MonthCalendar from "../components/MonthCalendar";
import { monthNames } from "../utils/calendar";

import { useThemeContext } from "../context/ThemeContext";
import CalendarLegend from "../components/CalendarLegend";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";
import { currentYear } from "../utils/date";
import { getHolidayEvents } from "../utils/greekHolidays";
import { CalendarEvent } from "../types/calendar";

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList, "CalendarHome">;

const CalendarHome = () => {
  const navigation = useNavigation<CalendarNav>();
  const { theme, toggleTheme, colors } = useThemeContext();

  const userEvents: CalendarEvent[] = useMemo(
    () => [
      { ID: "1", date: "03/02/2025", title: "Meeting", eventType: "userHoliday" },
      { ID: "2", date: "12/12/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "3", date: "01/05/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "4", date: "01/05/2025", title: "Paok", eventType: "userHoliday" },
      { ID: "5", date: "06/01/2025", title: "Mitsos", eventType: "userHoliday" },

      // 20 dummy events on 12/07/2025
      { ID: "6", date: "12/07/2025", title: "Event 1", eventType: "userHoliday" },
      { ID: "7", date: "12/07/2025", title: "Event 2", eventType: "userHoliday" },
      { ID: "8", date: "12/07/2025", title: "Event 3", eventType: "userHoliday" },
      { ID: "9", date: "12/07/2025", title: "Event 4", eventType: "userHoliday" },
      { ID: "10", date: "12/07/2025", title: "Event 5", eventType: "userHoliday" },
      { ID: "11", date: "12/07/2025", title: "Event 6 Event 6Event 6Event 6Event 6Event 6Event 6Event 6Event 6", eventType: "userHoliday" },
      { ID: "12", date: "12/07/2025", title: "Event 7", eventType: "userHoliday" },
      { ID: "13", date: "12/07/2025", title: "Event 8", eventType: "userHoliday" },
      { ID: "14", date: "12/07/2025", title: "Event 9", eventType: "userHoliday" },
      { ID: "15", date: "12/07/2025", title: "Event 10", eventType: "userHoliday" },
      { ID: "16", date: "12/07/2025", title: "Event 11", eventType: "userHoliday" },
      {
        ID: "17",
        date: "12/07/2025",
        title: "Event 12 Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12Event 12",
        eventType: "userHoliday",
      },
      { ID: "18", date: "12/07/2025", title: "Event 13", eventType: "userHoliday" },
      { ID: "19", date: "12/07/2025", title: "Event 14", eventType: "userHoliday" },
      { ID: "20", date: "12/07/2025", title: "Event 15", eventType: "userHoliday" },
      { ID: "21", date: "12/07/2025", title: "Event 16", eventType: "userHoliday" },
      { ID: "22", date: "12/07/2025", title: "Event 17", eventType: "userHoliday" },
      { ID: "23", date: "12/07/2025", title: "Event 18", eventType: "userHoliday" },
      { ID: "24", date: "12/07/2025", title: "Event 19", eventType: "userHoliday" },
      { ID: "25", date: "12/07/2025", title: "Event 20", eventType: "userHoliday" },
    ],
    []
  );
  const holidayEvents = useMemo(() => getHolidayEvents(currentYear), []);
  const allEvents = useMemo(() => [...userEvents, ...holidayEvents], [userEvents, holidayEvents]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <CalendarLegend />
        <Pressable onPress={toggleTheme} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
          <Ionicons name={theme === "dark" ? "sunny" : "moon"} size={22} color={colors.text} />
        </Pressable>
      </View>

      <FlatList
        data={monthNames}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
        renderItem={({ item: month, index }) => (
          <Pressable style={{ width: "47%", marginVertical: 10 }} onPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: index, events: allEvents })}>
            <MonthCalendar
              year={currentYear}
              month={index}
              events={allEvents}
              onDayPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: index, events: allEvents })}
            />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default CalendarHome;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12 },
  scrollContent: { padding: 8, flexGrow: 1 },
});
