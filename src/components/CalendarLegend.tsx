import { StyleSheet, Text, View } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import BulletsAndLabel from "./BulletsAndLabel";

const CalendarLegend = () => {
  const { colors } = useThemeContext();
  return (
    <View style={styles.container}>
      <BulletsAndLabel bulletColor={colors.today} text="ΣΗΜΕΡΑ" textColor={colors.text} />
      <BulletsAndLabel bulletColor={colors.fixedHoliday} text="ΑΡΓΙΕΣ" textColor={colors.text} />
      <BulletsAndLabel bulletColor={colors.userHoliday} text="ΑΔΕΙΕΣ" textColor={colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
});

export default CalendarLegend;
