// src/components/DayCell.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { CalendarEvent } from "../types/types";
import { isToday, parse } from "date-fns";
import { lightColors, darkColors } from "../theme/colors";
import { mapColorCode } from "../utils/calendarColors";
import { getColors } from "../theme/utils/getColors";
import { useThemeContext } from "../context/ThemeContext";

interface DayCellProps {
  day: number;
  year: number;
  month: number;
  weekday: number; // 0 = Monday ... 6 = Sunday
  events: CalendarEvent[];
}

const DayCell = ({ day, year, month, weekday, events }: DayCellProps) => {
  const { colors } = useThemeContext();
  const isWeekend = weekday === 5 || weekday === 6; // Sat/Sun

  if (!day) return <View style={styles.dayWrapper} />;

  const dayDate = new Date(year, month, day);

  const dayEvents = events.filter((ev) => {
    const eventDate = parse(ev.date, "dd-MM-yyyy", new Date());
    return eventDate.getFullYear() === dayDate.getFullYear() && eventDate.getMonth() === dayDate.getMonth() && eventDate.getDate() === dayDate.getDate();
  });

  const hasEvent = dayEvents.length > 0;
  const todayCheck = isToday(dayDate);

  const backgroundColor = todayCheck ? colors.primary : hasEvent ? mapColorCode(dayEvents[0].colorCode, colors) : "transparent";

  const textColor =
    todayCheck || hasEvent
      ? "white" // text inside colored circle
      : isWeekend
      ? colors.weekend // red for Sat/Sun
      : colors.text; // normal day number

  return (
    <View style={styles.dayWrapper}>
      <View style={[styles.dayCircle, { backgroundColor }]}>
        <Text style={[styles.dayText, { color: textColor }]}>{day}</Text>
      </View>
    </View>
  );
};

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

export default DayCell;
