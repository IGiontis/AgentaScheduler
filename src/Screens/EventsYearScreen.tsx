import { parse, getYear, compareAsc, format, getMonth } from "date-fns";
import AppScreenContainer from "../components/AppScreenContainer";
import { useThemeContext } from "../context/ThemeContext";
import YearSelectorModalWrapper from "../components/YearSelectorModalWrapper/YearSelectorModalWrapper";
import { useYearPicker } from "../hooks/useYearPickerModalWrapper";
import { useAppSelector } from "../store/hooks";
import { selectAllEvents } from "../store/selectors";
import { FlatList, View } from "react-native";
import BulletsAndLabel from "../components/BulletsAndLabel";
import { mapColorCode } from "../utils/calendarColors";
import { Text } from "react-native-paper";
import { el } from "date-fns/locale";
import CalendarLegend from "../components/CalendarLegend";

const EventsYearScreen = () => {
  const { colors } = useThemeContext();
  const { year, setYear, yearPageStart, setYearPageStart, yearPickerVisible, setYearPickerVisible } = useYearPicker();
  const allEvents = useAppSelector(selectAllEvents(year));
  // console.log(year);
  // console.log(allEvents);

  const yearEvents = allEvents
    .filter((item) => {
      const date = parse(item.date, "dd/MM/yyyy", new Date());
      const eventYear = getYear(date);
      return eventYear === year;
    })
    .sort((a, b) => {
      const dateA = parse(a.date, "dd/MM/yyyy", new Date());
      const dateB = parse(b.date, "dd/MM/yyyy", new Date());

      return compareAsc(dateA, dateB);
    });

  const lastMonthWithEvents = Math.max(...yearEvents.map((item) => getMonth(parse(item.date, "dd/MM/yyyy", new Date()))));

  console.log(yearEvents);

  return (
    <AppScreenContainer scrollable={false}>
      <FlatList
        data={yearEvents}
        keyExtractor={(item) => item.ID}
        ListHeaderComponent={
          <>
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
          </>
        }
        contentContainerStyle={{ paddingBottom: 16, paddingEnd: 8 }}
        renderItem={({ item, index }) => {
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
                paddingHorizontal: 16, // <-- Add this
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

              <BulletsAndLabel bulletColor={mapColorCode(item.eventType, colors)} text={`${item.date} - ${item.title}`} textColor={colors.text} />
            </View>
          );
        }}
      />
    </AppScreenContainer>
  );
};

export default EventsYearScreen;
