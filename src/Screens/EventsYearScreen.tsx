import { parse, getYear, compareAsc, format, getMonth } from "date-fns";
import { useThemeContext } from "../context/ThemeContext";
import YearSelectorModalWrapper from "../components/YearSelectorModalWrapper/YearSelectorModalWrapper";
import { useYearPicker } from "../hooks/useYearPickerModalWrapper";
import { useAppSelector } from "../store/hooks";
import { selectAllEvents } from "../store/selectors";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BulletsAndLabel from "../components/BulletsAndLabel";
import { mapColorCode } from "../utils/calendarColors";
import { Text } from "react-native-paper";
import { el } from "date-fns/locale";
import CalendarLegend from "../components/CalendarLegend";
import { CalendarEvent } from "../types/calendar";
import { Colors } from "../types/colors";

const EventsYearScreen = () => {
  const { colors } = useThemeContext();
  const { year, setYear, yearPageStart, setYearPageStart, yearPickerVisible, setYearPickerVisible } = useYearPicker();
  const allEvents = useAppSelector(selectAllEvents(year));

  const yearEvents = allEvents
    .filter((item) => getYear(parse(item.date, "dd/MM/yyyy", new Date())) === year)
    .sort((a, b) => compareAsc(parse(a.date, "dd/MM/yyyy", new Date()), parse(b.date, "dd/MM/yyyy", new Date())));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ zIndex: 1 }}>
        <YearSelectorModalWrapper
          year={year}
          setYear={setYear}
          setYearPageStart={setYearPageStart}
          setYearPickerVisible={setYearPickerVisible}
          colors={colors}
          yearPageStart={yearPageStart}
          yearPickerVisible={yearPickerVisible}
        />
        <View style={{ paddingStart: 12 }}>
          <CalendarLegend />
        </View>
      </View>

      {/* Scrollable FlatList */}
      <FlatList
        data={yearEvents}
        keyExtractor={(item) => item.ID}
        style={{ flex: 1 }} // fill remaining space
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 8 }}
        renderItem={({ item, index }) => <MonthEvents item={item} yearEvents={yearEvents} index={index} colors={colors} />}
      />
    </SafeAreaView>
  );
};

export default EventsYearScreen;

interface MonthEventsProps {
  item: CalendarEvent;
  yearEvents: CalendarEvent[];
  index: number;
  colors: Colors;
}

const MonthEvents = ({ item, yearEvents, index, colors }: MonthEventsProps) => {
  const lastMonthWithEvents = Math.max(...yearEvents.map((item) => getMonth(parse(item.date, "dd/MM/yyyy", new Date()))));
  const currentDate = parse(item.date, "dd/MM/yyyy", new Date());
  const currentMonth = getMonth(currentDate);

  const prevItem = yearEvents[index - 1];
  const nextItem = yearEvents[index + 1];

  const prevMonth = prevItem ? getMonth(parse(prevItem.date, "dd/MM/yyyy", new Date())) : null;
  const nextMonth = nextItem ? getMonth(parse(nextItem.date, "dd/MM/yyyy", new Date())) : null;

  const isFirstOfMonth = currentMonth !== prevMonth;
  const isLastOfMonth = currentMonth !== nextMonth && currentMonth !== lastMonthWithEvents;

  return (
    <View
      style={{
        paddingHorizontal: 16,
        borderBottomWidth: isLastOfMonth ? 1 : 0,
        borderColor: colors.text,
        paddingBottom: isLastOfMonth ? 8 : 0,
        marginBottom: isLastOfMonth ? 10 : 0,
      }}
    >
      {isFirstOfMonth && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colors.text,
            marginTop: 16,
            marginBottom: 6,
          }}
        >
          {format(currentDate, "LLLL", { locale: el })}
        </Text>
      )}

      <BulletsAndLabel bulletColor={mapColorCode(item.eventType, colors)} date={item.date} text={item.title} textColor={colors.text} />
    </View>
  );
};
