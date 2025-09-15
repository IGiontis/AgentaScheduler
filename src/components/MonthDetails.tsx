import { StyleSheet, Text, View } from "react-native";
import MonthCalendar from "./MonthCalendar";
import { currentYear } from "../utils/date";
import { RouteProp } from "@react-navigation/native";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";
import { OnDayPress } from "../types/types";
import { useThemeContext } from "../context/ThemeContext";

type MonthDetailsRouteProp = RouteProp<CalendarStackParamList, "MonthDetails">;

interface MonthDetailsProps {
  route: MonthDetailsRouteProp;
}

const MonthDetails = ({ route }: MonthDetailsProps) => {
  const { monthIndex } = route.params;
  const {colors} = useThemeContext();
  console.log(monthIndex);

  const handleDayPress: OnDayPress = (day, date, events) => {
    console.log("Day:", day);
    console.log("Date:", date);
    console.log("Events:", events);
  };

  return (
     <View style={{ flex: 1, backgroundColor: colors.background,paddingTop:24 }}>
      <MonthCalendar year={currentYear} month={monthIndex} onDayPress={handleDayPress} showTitle={false} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MonthDetails;
