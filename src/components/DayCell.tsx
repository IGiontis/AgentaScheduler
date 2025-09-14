// src/components/DayCell.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarEvent } from "../types/types";
import { isToday, parse } from "date-fns";
import { mapColorCode } from "../utils/calendarColors";
import { useThemeContext } from "../context/ThemeContext";
import { getGreekHolidays, Holiday } from "../utils/greekHolidays";

interface DayCellProps {
  day: number;
  year: number;
  month: number; // 0-indexed
  weekday: number; // 0 = Monday ... 6 = Sunday
  events: CalendarEvent[];
}

const DayCell: React.FC<DayCellProps> = ({ day, year, month, weekday, events }) => {
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

  // Determine background and text colors
  const { backgroundColor, textColor } = useMemo(() => {
    if (todayCheck) return { backgroundColor: colors.today, textColor: 'white' };
    if (hasEvent) return { backgroundColor: mapColorCode(dayEvents[0].colorCode, colors), textColor: colors.text };
    if (isHoliday) return { backgroundColor: colors.fixedHoliday, textColor: colors.text };
    if (isWeekend) return { backgroundColor: "transparent", textColor: colors.weekend };
    return { backgroundColor: "transparent", textColor: colors.text };
  }, [todayCheck, hasEvent, isHoliday, isWeekend, dayEvents, colors]);

  return (
    <View style={styles.dayWrapper}>
      <View style={[styles.dayCircle, { backgroundColor }]}>
        <Text style={[styles.dayText, { color: textColor }]}>{day}</Text>
      </View>
    </View>
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
    fontSize: 10,
    textAlign: "center",
  },
});
