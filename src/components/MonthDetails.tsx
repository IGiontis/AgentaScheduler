import { StyleSheet, Text, View } from "react-native";
import MonthCalendar from "./MonthCalendar";
import { currentYear } from "../utils/date";
import { RouteProp } from "@react-navigation/native";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";
import { CalendarEvent, OnDayPress } from "../types/types";
import { useThemeContext } from "../context/ThemeContext";
import { getHolidayEvents } from "../utils/greekHolidays";

type MonthDetailsRouteProp = RouteProp<CalendarStackParamList, "MonthDetails">;

interface MonthDetailsProps {
  route: MonthDetailsRouteProp;
}

// MonthDetails.tsx
const MonthDetails = ({ route }: MonthDetailsProps) => {
  const { monthIndex, events = [] } = route.params; // events from navigation
  const { colors } = useThemeContext();
  console.log(events)

  // Filter only this month's events
  const monthEvents = events.filter((ev) => {
    const [dd, mm, yyyy] = ev.date.split("/").map(Number);
    return mm - 1 === monthIndex && yyyy === currentYear;
  });

  const handleDayPress: OnDayPress = (day, date, events) => {
    console.log("Day:", day);
    console.log("Date:", date);
    console.log("Events:", events);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 24 }}>
      <MonthCalendar year={currentYear} month={monthIndex} events={monthEvents} onDayPress={handleDayPress} showTitle={false} />

      {/* List of events */}
      <View style={{ padding: 16 }}>
        {monthEvents.length === 0 ? (
          <Text style={{ color: colors.text }}>No events this month</Text>
        ) : (
          monthEvents.map((ev) => (
            <Text key={ev.ID} style={{ color: colors.text, marginBottom: 4 }}>
              {ev.date} - {ev.title}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MonthDetails;
