import { StyleSheet, Text, View } from "react-native";
import { useThemeContext } from "../context/ThemeContext";

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

const BulletsAndLabel = ({ bulletColor, text, textColor }: { bulletColor: string; text: string; textColor: string }) => {
  return (
    <View style={styles.bulletContainer}>
      <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
      <Text style={[styles.label, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6, // makes it a circle

    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: "black",
  },
});

export default CalendarLegend;
