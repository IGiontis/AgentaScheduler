import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { generateMonthDays, monthNames } from "../utils/calendar";
import { type CalendarEvent, type OnDayPress } from "../types/types";
import DayCell from "../components/DayCell";
import { useThemeContext } from "../context/ThemeContext";
import { getHolidayEvents } from "../utils/greekHolidays";

interface MonthCalendarProps {
  year: number;
  month: number;
  events?: CalendarEvent[];
  showTitle?: boolean;
  onDayPress?: OnDayPress;
}

const MonthCalendar = ({ year, month, events = [], showTitle = true, onDayPress }: MonthCalendarProps) => {
  const { colors } = useThemeContext();
  const days = generateMonthDays(year, month);

  // Generate holiday events for the year
  const holidayEvents = getHolidayEvents(year);

  // Merge user events + holiday events
  const allEvents = [...events, ...holidayEvents];

  return (
    <View>
      {showTitle && <Text style={[styles.monthTitle, { color: colors.text }]}>{monthNames[month]}</Text>}

      {/* Weekday labels */}
      <View style={styles.weekRow}>
        {["Δ", "Τ", "Τ", "Π", "Π", "Σ", "Κ"].map((d, i) => (
          <Text key={d + i} style={[styles.weekDay, { color: i >= 5 ? colors.weekend : colors.text }]}>
            {d}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.daysGrid}>
        {days.map((day, i) => (
          <DayCell key={i} day={day ?? 0} year={year} month={month} weekday={i % 7} events={allEvents} onDayPress={onDayPress} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // monthContainer: { width: "47%", marginVertical: 10 },
  monthTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekDay: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayWrapper: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 10,
    textAlign: "center",
    color: "black",
  },
  weekendText: {
    color: "red",
  },
  todayCircle: {
    borderWidth: 1.5,
    borderRadius: 999,
    width: "70%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MonthCalendar;
