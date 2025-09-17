// src/components/CalendarLegend.tsx
import { StyleSheet, Text, View } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import BulletsAndLabel from "./BulletsAndLabel";

const CalendarLegend = () => {
  const { colors } = useThemeContext();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.column}>
          <BulletsAndLabel bulletColor={colors.today} text="ΣΗΜΕΡΑ" textColor={colors.text} />
          <BulletsAndLabel bulletColor={colors.twoEvents} text="2 Events" textColor={colors.text} />
        </View>

        <View style={styles.column}>
          <BulletsAndLabel bulletColor={colors.fixedHoliday} text="ΑΡΓΙΕΣ" textColor={colors.text} />
          <BulletsAndLabel bulletColor={colors.threeEvents} text="3 Events" textColor={colors.text} />
        </View>

        <View style={styles.column}>
          <BulletsAndLabel bulletColor={colors.userHoliday} text="ΑΔΕΙΕΣ" textColor={colors.text} />

          <BulletsAndLabel bulletColor={colors.fourOrMoreEvents} text="4+ Events" textColor={colors.text} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  container: {
    flexDirection: "row",
  },

  column: {
    width: 100,
  },
});

export default CalendarLegend;
