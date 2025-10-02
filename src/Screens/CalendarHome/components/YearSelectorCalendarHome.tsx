import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { type Colors } from "../../../types/colors";
import React from "react";

interface YearSelectorCalendarHomeProps {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setYearPageStart: React.Dispatch<React.SetStateAction<number>>;
  setYearPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;

  colors: Colors;
}

const YearSelectorCalendarHome = ({ year, setYear, setYearPageStart, setYearPickerVisible, colors }: YearSelectorCalendarHomeProps) => {
  const openYearPicker = () => {
    setYearPageStart(year - 5);
    setYearPickerVisible(true);
  };
  const handlePrevYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default YearSelectorCalendarHome;
