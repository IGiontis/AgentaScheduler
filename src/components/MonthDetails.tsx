import React, { useMemo } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthCalendar from "./MonthCalendar";
import { currentYear } from "../utils/date";
import { RouteProp } from "@react-navigation/native";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";

import { useThemeContext } from "../context/ThemeContext";
import { mapColorCode } from "../utils/calendarColors";
import BulletsAndLabel from "./BulletsAndLabel";
import { OnDayPress } from "../types/calendar";

type MonthDetailsRouteProp = RouteProp<CalendarStackParamList, "MonthDetails">;

interface MonthDetailsProps {
  route: MonthDetailsRouteProp;
}

const MonthDetails = ({ route }: MonthDetailsProps) => {
  const { monthIndex, events = [] } = route.params;
  const { colors } = useThemeContext();

  // Memoized month events to prevent recalculating each render
  const monthEvents = useMemo(() => {
    return events
      .filter((ev) => {
        const [dd, mm, yyyy] = ev.date.split("/").map(Number);
        return mm - 1 === monthIndex && yyyy === currentYear;
      })
      .sort((a, b) => {
        const [aDay, aMonth, aYear] = a.date.split("/").map(Number);
        const [bDay, bMonth, bYear] = b.date.split("/").map(Number);
        return new Date(aYear, aMonth - 1, aDay).getTime() - new Date(bYear, bMonth - 1, bDay).getTime();
      });
  }, [events, monthIndex]);

  const handleDayPress: OnDayPress = (day, date, events) => {
    console.log("Day:", day, "Date:", date, "Events:", events);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Calendar stays fixed */}
      <MonthCalendar year={currentYear} month={monthIndex} events={monthEvents} onDayPress={handleDayPress} showTitle={false} />

      {/* FlatList for scrollable events */}
      <View style={{ flex: 1 }}>
        {monthEvents.length === 0 ? (
          <View style={styles.noEventsContainer}>
            <Text style={{ color: colors.text }}>No events this month</Text>
          </View>
        ) : (
          <FlatList
            data={monthEvents}
            keyExtractor={(item) => item.ID}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => <BulletsAndLabel bulletColor={mapColorCode(item.eventType, colors)} text={`${item.date} - ${item.title}`} textColor={colors.text} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MonthDetails;
