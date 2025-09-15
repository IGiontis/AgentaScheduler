import { StyleSheet, Text, View } from "react-native";
import MonthCalendar from "./MonthCalendar";
import { currentYear } from "../utils/date";
import { RouteProp } from "@react-navigation/native";
import { CalendarStackParamList } from "../navigation/CalendarNavigator";

type MonthDetailsRouteProp = RouteProp<CalendarStackParamList, "MonthDetails">;

interface MonthDetailsProps {
  route: MonthDetailsRouteProp;
}

const MonthDetails = ({ route }: MonthDetailsProps) => {
  const { monthIndex } = route.params;

  console.log(monthIndex);

  return (
    <View>
      <MonthCalendar year={currentYear} month={monthIndex} events={[]} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MonthDetails;
