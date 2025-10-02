import { FlatList, Pressable, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { monthNames } from "../../../utils/calendar";

import { type CalendarStackParamList } from "../../../types/navigation";
import { type CalendarEvent } from "../../../types/calendar";
import MonthCalendar from "../../../components/MonthCalendar";
import { useMemo } from "react";
import { getHolidayEvents } from "../../../utils/greekHolidays";
import { Colors } from "../../../types/colors";

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList, "CalendarHome">;

interface MonthsGenerationCalendarHomeProp {
  year: number;
  colors: Colors;
}

const MonthsGenerationCalendarHome = ({ year, colors }: MonthsGenerationCalendarHomeProp) => {
  const navigation = useNavigation<CalendarNav>();

  // ---------------------------
  // Sample events
  // ---------------------------
  const userEvents: CalendarEvent[] = useMemo(
    () => [
      { ID: "1", date: "03/02/2025", title: "Meeting", eventType: "userHoliday" },
      { ID: "2", date: "12/12/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "3", date: "01/05/2025", title: "Birthday", eventType: "userHoliday" },
      { ID: "4", date: "01/05/2025", title: "Paok", eventType: "userHoliday" },
      { ID: "5", date: "06/01/2025", title: "Mitsos", eventType: "userHoliday" },
      { ID: "6", date: "16/01/2025", title: "Mitsos", eventType: "bills" },
    ],
    []
  );

  const holidayEvents = useMemo(() => getHolidayEvents(year), [year]);
  const allEvents = useMemo(() => [...userEvents, ...holidayEvents], [userEvents, holidayEvents]);

  return (
    <FlatList
      data={monthNames}
      keyExtractor={(item, index) => item + index}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
      renderItem={({ item: month, index }) => (
        <Pressable style={{ width: "47%", marginVertical: 10 }} onPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: index, events: allEvents })}>
          <MonthCalendar
            year={year}
            month={index}
            events={allEvents}
            onDayPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: index, events: allEvents })}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({ scrollContent: { padding: 8, flexGrow: 1 } });

export default MonthsGenerationCalendarHome;
