import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthCalendar from "./MonthCalendar";
import { currentYear } from "../utils/date";
import { RouteProp } from "@react-navigation/native";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";
import { CalendarEvent, OnDayPress } from "../types/types";
import { useThemeContext } from "../context/ThemeContext";
import { mapColorCode } from "../utils/calendarColors";
import BulletsAndLabel from "./BulletsAndLabel";

type MonthDetailsRouteProp = RouteProp<CalendarStackParamList, "MonthDetails">;

interface MonthDetailsProps {
  route: MonthDetailsRouteProp;
}

const MonthDetails = ({ route }: MonthDetailsProps) => {
  const { monthIndex, events = [] } = route.params;
  const { colors } = useThemeContext();

  const monthEvents = events
    .filter((ev) => {
      const [dd, mm, yyyy] = ev.date.split("/").map(Number);
      return mm - 1 === monthIndex && yyyy === currentYear;
    })
    .sort((a, b) => {
      const [aDay, aMonth, aYear] = a.date.split("/").map(Number);
      const [bDay, bMonth, bYear] = b.date.split("/").map(Number);
      return new Date(aYear, aMonth - 1, aDay).getTime() - new Date(bYear, bMonth - 1, bDay).getTime();
    });

  const handleDayPress: OnDayPress = (day, date, events) => {
    console.log("Day:", day, "Date:", date, "Events:", events);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Calendar stays fixed */}
      <MonthCalendar
        year={currentYear}
        month={monthIndex}
        events={monthEvents}
        onDayPress={handleDayPress}
        showTitle={false}
      />

      {/* Scrollable events below */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {monthEvents.length === 0 ? (
            <Text style={{ color: colors.text }}>No events this month</Text>
          ) : (
            monthEvents.map((ev) => (
              <BulletsAndLabel
                key={ev.ID}
                bulletColor={mapColorCode(ev.colorCode, colors)}
                text={`${ev.date} - ${ev.title}`}
                textColor={colors.text}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MonthDetails;
