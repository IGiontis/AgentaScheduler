// src/components/DayCell.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { isToday, parse } from "date-fns";
import { mapColorCode } from "../utils/calendarColors";
import { useThemeContext } from "../context/ThemeContext";
import { getGreekHolidays } from "../utils/greekHolidays";
import { CalendarEvent, EventType, OnDayPress } from "../types/calendar";

interface DayCellProps {
  day: number;
  year: number;
  month: number;
  weekday: number;
  events: CalendarEvent[];
  onDayPress?: OnDayPress;
}

const DayCell: React.FC<DayCellProps> = ({ day, year, month, weekday, events, onDayPress }) => {
  const { colors } = useThemeContext();
  const isWeekend = weekday === 5 || weekday === 6; // Sat/Sun

  // Always define hooks before early return
  const dayDate = useMemo(() => (day ? new Date(year, month, day) : null), [day, year, month]);

  const dayEvents = useMemo(() => {
    if (!dayDate) return [];
    return events.filter((ev) => {
      const eventDate = parse(ev.date, "dd/MM/yyyy", new Date());
      return eventDate.getFullYear() === dayDate.getFullYear() && eventDate.getMonth() === dayDate.getMonth() && eventDate.getDate() === dayDate.getDate();
    });
  }, [events, dayDate]);

  const hasEvent = dayEvents.length > 0;
  const todayCheck = useMemo(() => (dayDate ? isToday(dayDate) : false), [dayDate]);

  const holidays = useMemo(() => getGreekHolidays(year), [year]);

  const isHoliday = useMemo(() => {
    if (!dayDate) return false;
    return holidays.some((h) => {
      const [dd, mm, yyyy] = h.date.split("/").map(Number);
      return dd === dayDate.getDate() && mm - 1 === dayDate.getMonth() && yyyy === dayDate.getFullYear();
    });
  }, [holidays, dayDate]);

  const dayEventType: EventType = useMemo(() => {
    if (dayEvents.length === 0) return "none";
    if (dayEvents.length === 2) return "twoEvents";
    if (dayEvents.length >= 3) return "threeOrMoreEvents";

    const single = dayEvents[0];
    return single.eventType;
  }, [dayEvents]);

  const { backgroundColor, textColor } = useMemo(() => {
    if (!dayDate) return { backgroundColor: "transparent", textColor: colors.text };
    if (todayCheck) return { backgroundColor: colors.today, textColor: "white" };
    if (hasEvent) return { backgroundColor: mapColorCode(dayEventType, colors), textColor: "white" };
    if (isHoliday) return { backgroundColor: colors.fixedHoliday, textColor: "white" };
    if (isWeekend) return { backgroundColor: "transparent", textColor: colors.weekend };
    return { backgroundColor: "transparent", textColor: colors.text };
  }, [todayCheck, hasEvent, isHoliday, isWeekend, dayEventType, colors, dayDate]);

  // Early return for empty day
  if (!dayDate) return <View style={styles.dayWrapper} />;

  return (
    <Pressable style={({ pressed }) => [styles.dayWrapper, pressed && { opacity: 0.7 }]} onPress={() => onDayPress?.(day, dayDate, dayEvents)}>
      <View style={[styles.dayCircle, { backgroundColor }]}>
        <Text style={[styles.dayText, { color: textColor }]}>{day}</Text>
      </View>
    </Pressable>
  );
};

export default DayCell;

const styles = StyleSheet.create({
  dayWrapper: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCircle: {
    width: "80%",
    aspectRatio: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    fontSize: 12,
    textAlign: "center",
  },
});
