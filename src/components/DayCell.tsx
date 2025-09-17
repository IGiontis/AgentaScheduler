// src/components/DayCell.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { isToday, parse } from "date-fns";
import { mapColorCode } from "../utils/calendarColors";
import { useThemeContext } from "../context/ThemeContext";
import { getGreekHolidays, Holiday } from "../utils/greekHolidays";
import { CalendarEvent, EventType, OnDayPress } from "../types/calendar";

interface DayCellProps {
  day: number;
  year: number;
  month: number; // 0-indexed
  weekday: number; // 0 = Monday ... 6 = Sunday
  events: CalendarEvent[];
  onDayPress?: OnDayPress;
}

const DayCell: React.FC<DayCellProps> = ({ day, year, month, weekday, events, onDayPress }) => {
  const { colors } = useThemeContext();
  const isWeekend = weekday === 5 || weekday === 6; // Sat/Sun

  if (!day) return <View style={styles.dayWrapper} />;

  const dayDate = new Date(year, month, day);

  // Filter events for this day
  const dayEvents = useMemo(
    () =>
      events.filter((ev) => {
        const eventDate = parse(ev.date, "dd/MM/yyyy", new Date());
        return eventDate.getFullYear() === dayDate.getFullYear() && eventDate.getMonth() === dayDate.getMonth() && eventDate.getDate() === dayDate.getDate();
      }),
    [events, dayDate]
  );

  const hasEvent = dayEvents.length > 0;
  const todayCheck = isToday(dayDate);

  // Compute Greek holidays for the year only once
  const holidays: Holiday[] = useMemo(() => getGreekHolidays(year), [year]);

  const isHoliday = useMemo(
    () =>
      holidays.some((h) => {
        const [dd, mm, yyyy] = h.date.split("/").map(Number);
        return dd === dayDate.getDate() && mm - 1 === dayDate.getMonth() && yyyy === dayDate.getFullYear();
      }),
    [holidays, dayDate]
  );

 const dayEventType: EventType = useMemo(() => {
  if (dayEvents.length === 1) return dayEvents[0].eventType;
  if (dayEvents.length === 2) return "twoEvents";
  if (dayEvents.length === 3) return "threeEvents";
  return "fourOrMoreEvents";
}, [dayEvents]);

const { backgroundColor, textColor } = useMemo(() => {
  if (todayCheck)
    return { backgroundColor: colors.today, textColor: "white" };
  if (hasEvent)
    return { backgroundColor: mapColorCode(dayEventType, colors), textColor: "white" };
  if (isHoliday)
    return { backgroundColor: colors.fixedHoliday, textColor: "white" };
  if (isWeekend)
    return { backgroundColor: "transparent", textColor: colors.weekend };
  return { backgroundColor: "transparent", textColor: colors.text };
}, [todayCheck, hasEvent, isHoliday, isWeekend, dayEventType, colors]);

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
