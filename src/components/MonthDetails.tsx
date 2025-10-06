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
import CalendarLegend from "./CalendarLegend";

type MonthDetailsRouteProp = RouteProp<CalendarStackParamList, "MonthDetails">;

interface MonthDetailsProps {
  route: MonthDetailsRouteProp;
}

const MonthDetails = ({ route }: MonthDetailsProps) => {
  const { monthIndex, events = [], year } = route.params;

  const { colors } = useThemeContext();

  // Memoized month events to prevent recalculating each render
  const monthEvents = useMemo(() => {
    return events
      .filter((ev) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, mm, yyyy] = ev.date.split("/").map(Number);
        return mm - 1 === monthIndex && yyyy === year;
      })
      .sort((a, b) => {
        const [aDay, aMonth, aYear] = a.date.split("/").map(Number);
        const [bDay, bMonth, bYear] = b.date.split("/").map(Number);
        return new Date(aYear, aMonth - 1, aDay).getTime() - new Date(bYear, bMonth - 1, bDay).getTime();
      });
  }, [events, monthIndex, year]);

  const handleDayPress: OnDayPress = (day, date, events) => {
    console.log("Day:", day, "Date:", date, "Events:", events);
  };

  console.log(JSON.stringify(events, null, 2));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Calendar stays fixed */}
      <MonthCalendar year={currentYear} month={monthIndex} events={monthEvents} onDayPress={handleDayPress} showTitle={false} />

      <View style={{ alignItems: "center", marginBottom: 18 }}>
        <CalendarLegend />
      </View>

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
            renderItem={({ item, index }) => {
              const isLast = index === monthEvents.length - 1;
              const isOnly = monthEvents.length === 1;

              return (
                <View
                  style={{
                    borderBottomWidth: !isLast && !isOnly ? 1 : 0,
                    borderBottomColor: colors.text + "33",
                    paddingVertical: 8,
                  }}
                >
                  <BulletsAndLabel bulletColor={mapColorCode(item.eventType, colors)} text={`${item.date} - ${item.title}`} textColor={colors.text} />
                </View>
              );
            }}
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
