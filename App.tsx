// App.js
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useThemeContext } from "./src/context/ThemeContext";
import CalendarFormNavigator from "./src/navigation/CalendarFormNavigator";
import { NavigationContainer } from "@react-navigation/native";

const AppContent = () => {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer>
      <CalendarFormNavigator />
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
