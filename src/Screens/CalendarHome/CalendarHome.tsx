// src/features/CalendarHome.tsx
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { useThemeContext } from "../../context/ThemeContext";

import HeaderCalendarHome from "./components/HeaderCalendarHome";
import MonthsGenerationCalendarHome from "./components/MonthsGenerationCalendarHome";
import YearSelectorModalWrapper from "../../components/YearSelectorModalWrapper/YearSelectorModalWrapper";
import { useYearPicker } from "../../hooks/useYearPickerModalWrapper";

const CalendarHome = () => {
  const { theme, toggleTheme, colors } = useThemeContext();

  const { year, setYear, yearPageStart, setYearPageStart, yearPickerVisible, setYearPickerVisible } = useYearPicker();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top", "left", "right"]}>
      <HeaderCalendarHome colors={colors} theme={theme} toggleTheme={toggleTheme} />

      <YearSelectorModalWrapper
        year={year}
        setYear={setYear}
        setYearPageStart={setYearPageStart}
        setYearPickerVisible={setYearPickerVisible}
        colors={colors}
        yearPageStart={yearPageStart}
        yearPickerVisible={yearPickerVisible}
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
