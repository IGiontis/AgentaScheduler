import { Text, View, StyleSheet } from "react-native";
import { generateMonthDays, monthNames } from "../utils/calendar";

const MonthCalendar = ({ year, month }: { year: number; month: number }) => {
  const days = generateMonthDays(year, month);
  const today = new Date();

  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthTitle}>{monthNames[month]}</Text>

      {/* Weekday labels */}
      <View style={styles.weekRow}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <Text key={d + i} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.daysGrid}>
        {days.map((day, i) => {
          const weekday = i % 7;
          const isWeekend = weekday === 5 || weekday === 6;

          if (!day) return <View key={i} style={styles.dayWrapper} />;

          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

          return (
            <View key={i} style={styles.dayWrapper}>
              {isToday ? (
                <View style={styles.todayCircle}>
                  <Text style={[styles.dayText, isWeekend && styles.weekendText]}>{day}</Text>
                </View>
              ) : (
                <Text style={[styles.dayText, isWeekend && styles.weekendText]}>{day}</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", // wrap into multiple rows
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#fff",
  },
  monthContainer: {
    // width: "30%", // 3 per row
    width: "47%", // 2 per row
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekDay: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayWrapper: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  weekendText: {
    color: "red",
  },
  dayText: {
    fontSize: 10,
    textAlign: "center",
    color: "black",
  },

  todayCircle: {
    borderColor: "red",
    borderWidth: 1.5,
    borderRadius: 999,
    width: "70%", // relative to parent
    aspectRatio: 1, // perfect circle
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
  },
});

export default MonthCalendar;
