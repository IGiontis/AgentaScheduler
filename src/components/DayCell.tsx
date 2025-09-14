import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalendarEvent } from "../types/types";
import { isToday, parse, format } from "date-fns";

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

interface DayCellProps {
  day: number;
  year: number;
  month: number;
  weekday: number;
  events: CalendarEvent[];
}
const DayCell = ({ day, year, month, weekday, events }: DayCellProps) => {
  const isWeekend = weekday === 5 || weekday === 6;

  if (!day) return <View style={styles.dayWrapper} />;

  const dayDate = new Date(year, month, day);

  const dayEvents = events.filter((ev) => {
    const eventDate = parse(ev.date, "dd-MM-yyyy", new Date());
    return eventDate.getFullYear() === dayDate.getFullYear() && eventDate.getMonth() === dayDate.getMonth() && eventDate.getDate() === dayDate.getDate();
  });

  const hasEvent = dayEvents.length > 0;
  const eventColor = hasEvent ? mapColorCode(dayEvents[0].colorCode) : "transparent";
  const todayCheck = isToday(dayDate);

  // Text color logic
  const textColor = todayCheck || hasEvent ? "white" : isWeekend ? "red" : "black";

  return (
    <View style={styles.dayWrapper}>
      <View
        style={[
          styles.dayCircle,
          {
            backgroundColor: todayCheck ? "blue" : hasEvent ? eventColor : "transparent",
          },
        ]}
      >
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
    borderRadius: 999, // still circular
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: { fontSize: 10, textAlign: "center" },
  weekendText: { color: "white" }, // optional if you want weekends also white
});

export default DayCell;
