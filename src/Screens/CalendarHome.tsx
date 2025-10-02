// src/features/CalendarHome.tsx
import React, { useMemo, useState } from "react";
import { View, StyleSheet, Pressable, FlatList, Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import MonthCalendar from "../components/MonthCalendar";
import { monthNames } from "../utils/calendar";
import { currentYear as initialYear } from "../utils/date";
import { getHolidayEvents } from "../utils/greekHolidays";
import { CalendarEvent } from "../types/calendar";

import { useThemeContext } from "../context/ThemeContext";
import CalendarLegend from "../components/CalendarLegend";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList, "CalendarHome">;

const CalendarHome = () => {
  const navigation = useNavigation<CalendarNav>();
  const { theme, toggleTheme, colors } = useThemeContext();

  // ---------------------------
  // State
  // ---------------------------
  const [year, setYear] = useState(initialYear);
  const [yearPickerVisible, setYearPickerVisible] = useState(false);
  const [yearPageStart, setYearPageStart] = useState(year - 5); // for 12-year grid

  // ---------------------------
  // Sample events
  // ---------------------------
  const userEvents: CalendarEvent[] = useMemo(
    () => [
      { ID: "1", date: "03/02/2025", title: "Meeting", eventType: "userHoliday" },
      { ID: "2", date: "12/12/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "3", date: "01/05/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "4", date: "01/05/2025", title: "Paok", eventType: "userHoliday" },
      { ID: "5", date: "06/01/2025", title: "Mitsos", eventType: "userHoliday" },
      { ID: "6", date: "16/01/2025", title: "Mitsos", eventType: "bills" },
    ],
    []
  );

  const holidayEvents = useMemo(() => getHolidayEvents(year), [year]);
  const allEvents = useMemo(() => [...userEvents, ...holidayEvents], [userEvents, holidayEvents]);

  // ---------------------------
  // Year Picker Logic
  // ---------------------------
  const years = Array.from({ length: 12 }, (_, i) => yearPageStart + i);

  const openYearPicker = () => {
    setYearPageStart(year - 5);
    setYearPickerVisible(true);
  };
  const closeYearPicker = () => setYearPickerVisible(false);

  const handlePrevYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  const handlePrevDecade = () => setYearPageStart((prev) => prev - 12);
  const handleNextDecade = () => setYearPageStart((prev) => prev + 12);

  const handleSelectYear = (y: number) => {
    setYear(y);
    closeYearPicker();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <CalendarLegend />
        <Pressable onPress={toggleTheme} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
          <Ionicons name={theme === "dark" ? "sunny" : "moon"} size={22} color={colors.text} />
        </Pressable>
      </View>

      {/* Year Selector */}
      <View style={[styles.yearSelector, { backgroundColor: colors.background }]}>
        <Pressable onPress={handlePrevYear} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: 8 })}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>

        <Pressable onPress={openYearPicker}>
          <Text style={{ fontSize: 18, color: colors.text }}>{year}</Text>
        </Pressable>

        <Pressable onPress={handleNextYear} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: 8 })}>
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </Pressable>
      </View>

      {/* Year Picker Modal */}
      <Modal visible={yearPickerVisible} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center", // <-- add this
            alignItems: "center", // <-- add this
          }}
          onPress={closeYearPicker}
        >
          <View
            style={{
              backgroundColor: colors.background,
              padding: 20,
              borderRadius: 8,
              width: "80%", // optional, keeps it neat
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Pressable onPress={handlePrevDecade}>
                <Ionicons name="chevron-back" size={24} color={colors.text} />
              </Pressable>

              <Pressable onPress={() => setYearPageStart(year - 6)}>
                <Text style={{ fontSize: 18, color: colors.calendarSelectedYear, fontWeight: "bold" }}>{year}</Text>
              </Pressable>

              <Pressable onPress={handleNextDecade}>
                <Ionicons name="chevron-forward" size={24} color={colors.text} />
              </Pressable>
            </View>

            {/* Grid of years */}
            <FlatList
              data={years}
              numColumns={3}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectYear(item)}
                  style={{
                    flex: 1,
                    margin: 5,
                    padding: 12,
                    alignItems: "center",
                    borderRadius: 6,
                    // backgroundColor: item === year ? colors.primary : colors.card,
                  }}
                >
                  <Text
                    style={{
                      color: item === year ? colors.calendarSelectedYear : colors.text,
                      fontWeight: item === year ? "bold" : "normal", // <-- bold selected
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Months FlatList */}
      <FlatList
        data={monthNames}
        keyExtractor={(item, index) => item + index}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
        renderItem={({ item: month, index }) => (
          <Pressable style={{ width: "47%", marginVertical: 10 }} onPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: index, events: allEvents })}>
            <MonthCalendar
              year={year}
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
  yearSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
});
