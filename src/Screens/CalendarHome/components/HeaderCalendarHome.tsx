import { Pressable, StyleSheet, View } from "react-native";
import CalendarLegend from "../../../components/CalendarLegend";
import { Ionicons } from "@expo/vector-icons";
import { type Colors } from "../../../types/colors";

interface HeaderCalendarHomeProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: Colors;
}

const HeaderCalendarHome = ({ theme, toggleTheme, colors }: HeaderCalendarHomeProps) => {
  return (
    <View style={styles.header}>
      <CalendarLegend />

      <Pressable onPress={toggleTheme} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
        <Ionicons name={theme === "dark" ? "sunny" : "moon"} size={22} color={colors.text} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({ header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, paddingHorizontal: 16 } });

export default HeaderCalendarHome;
