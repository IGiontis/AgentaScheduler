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
      { ID: "6", date: "12/07/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "7", date: "12/07/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "8", date: "12/07/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "9", date: "12/07/2025", title: "Birthday", eventType: "userHoliday" },
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
