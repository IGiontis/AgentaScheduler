import { FlatList, Pressable, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { monthNames } from "../../../utils/calendar";

import { type CalendarStackParamList } from "../../../types/navigation";
import MonthCalendar from "../../../components/MonthCalendar";
import { Colors } from "../../../types/colors";
import { useAppSelector } from "../../../store/hooks";
import { selectAllEvents } from "../../../store/selectors";

type CalendarNav = NativeStackNavigationProp<CalendarStackParamList, "CalendarHome">;

interface MonthsGenerationCalendarHomeProp {
  year: number;
  colors: Colors;
}

const MonthsGenerationCalendarHome = ({ year, colors }: MonthsGenerationCalendarHomeProp) => {
  const navigation = useNavigation<CalendarNav>();
  const allEvents = useAppSelector(selectAllEvents(year));

  return (
    <FlatList
      data={monthNames}
      keyExtractor={(item, index) => item + index}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
      renderItem={({ item: month, index }) => (
        <Pressable
          style={{ width: "47%", marginVertical: 10 }}
          onPress={() =>
            navigation.navigate("MonthDetails", {
              monthName: month,
              monthIndex: index,
              events: allEvents,
              year: year,
            })
          }
        >
          <MonthCalendar
            year={year}
            month={index}
            events={allEvents}
            onDayPress={() => navigation.navigate("MonthDetails", { monthName: month, monthIndex: index, year: year, events: allEvents })}
          />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({ scrollContent: { padding: 8, flexGrow: 1 } });

export default MonthsGenerationCalendarHome;
