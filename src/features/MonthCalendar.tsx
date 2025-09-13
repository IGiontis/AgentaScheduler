import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { generateMonthDays, monthNames } from "../utils/calendar";
import { format, isToday as isDateToday } from "date-fns";

export type Event = { color: string; title?: string };
export type MonthEvents = { [date: string]: Event[] };

interface MonthCalendarProps {
  year: number;
  month: number;
  events?: MonthEvents;
}

const MonthCalendar = ({ year, month, events = {} }: MonthCalendarProps) => {
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
        {days.map((day, i) => {
          const weekday = i % 7;
          const isWeekend = weekday === 5 || weekday === 6;
          if (!day) return <View key={i} style={styles.dayWrapper} />;

          // Use date-fns to get the day string and check today
          const dayDate = new Date(year, month, day);
          const dayString = format(dayDate, "dd/MM/yyyy"); // "03/03/2025"
          const hasEvent = events[dayString]?.length > 0;
          const eventColor = hasEvent ? events[dayString][0].color : undefined;
          const todayCheck = isDateToday(dayDate);

          return (
            <View key={i} style={styles.dayWrapper}>
              {todayCheck ? (
                <View style={styles.todayCircle}>
                  <Text style={[styles.dayText, isWeekend && styles.weekendText]}>{day}</Text>
                </View>
              ) : hasEvent ? (
                <View style={[styles.todayCircle, { borderColor: eventColor }]}>
                  <Text style={[styles.dayText, isWeekend && styles.weekendText]}>{day}</Text>
                </View>
              ) : (
                <Text style={[styles.dayText, isWeekend && styles.weekendText]}>{day}</Text>
              )}
            </View>
          );
        })}
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
