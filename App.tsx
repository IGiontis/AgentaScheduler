// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import CalendarHome from "./src/features/CalendarHome";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <CalendarHome />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
