import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { generateMonthDays, monthNames } from "../utils/calendar";
import { format, isToday as isDateToday } from "date-fns";
import { CalendarEvent } from "../types/types"; // <-- use your new type
import DayCell from "../components/DayCell";

interface MonthCalendarProps {
  year: number;
  month: number;
  events?: CalendarEvent[];
}

// map numeric colorCode → actual color string
const mapColorCode = (code: number) => {
  switch (code) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "orange";
    default:
      return "gray";
  }
};

const MonthCalendar = ({ year, month, events = [] }: MonthCalendarProps) => {
  const days = generateMonthDays(year, month);

  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthTitle}>{monthNames[month]}</Text>

      {/* Weekday labels */}
      <View style={styles.weekRow}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <Text key={d + i} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.daysGrid}>
        {days.map((day, i) => (
          <DayCell key={i} day={day ?? 0} year={year} month={month} weekday={i % 7} events={events} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  monthContainer: { width: "47%", marginVertical: 10 },
  monthTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  weekRow: { flexDirection: "row", justifyContent: "space-between" },
  weekDay: { flex: 1, fontSize: 10, textAlign: "center", fontWeight: "600" },
  daysGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayWrapper: { width: `${100 / 7}%`, aspectRatio: 1, justifyContent: "center", alignItems: "center" },
  dayText: { fontSize: 10, textAlign: "center", color: "black" },
  weekendText: { color: "red" },
  todayCircle: { borderWidth: 1.5, borderRadius: 999, width: "70%", aspectRatio: 1, justifyContent: "center", alignItems: "center" },
});

export default MonthCalendar;
