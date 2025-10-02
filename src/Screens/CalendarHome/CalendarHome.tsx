// src/features/CalendarHome.tsx
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { currentYear as initialYear } from "../../utils/date";

import { useThemeContext } from "../../context/ThemeContext";

import HeaderCalendarHome from "./components/HeaderCalendarHome";
import YearSelectorCalendarHome from "./components/YearSelectorCalendarHome";
import ModalYearPickerCalendarHome from "./components/ModalYearPickerCalendarHome";
import MonthsGenerationCalendarHome from "./components/MonthsGenerationCalendarHome";

const CalendarHome = () => {
  const { theme, toggleTheme, colors } = useThemeContext();

  const [year, setYear] = useState(initialYear);
  const [yearPickerVisible, setYearPickerVisible] = useState(false);
  const [yearPageStart, setYearPageStart] = useState(year - 5);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top", "left", "right"]}>
      
      <HeaderCalendarHome colors={colors} theme={theme} toggleTheme={toggleTheme} />

      {/* Year Selector */}
      <YearSelectorCalendarHome year={year} setYear={setYear} setYearPageStart={setYearPageStart} setYearPickerVisible={setYearPickerVisible} colors={colors} />

      {/* Year Picker Modal */}
      <ModalYearPickerCalendarHome
        yearPageStart={yearPageStart}
        yearPickerVisible={yearPickerVisible}
        setYearPickerVisible={setYearPickerVisible}
        setYearPageStart={setYearPageStart}
        setYear={setYear}
        colors={colors}
        year={year}
      />

      {/* Months FlatList */}
      <MonthsGenerationCalendarHome colors={colors} year={year} />
    </SafeAreaView>
  );
};

export default CalendarHome;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
