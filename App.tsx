// App.js
import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useThemeContext } from "./src/context/ThemeContext";
import RootNavigator from "./src/navigation/RootNavigator";

const AppContent = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <RootNavigator />
      {/* Dynamically set StatusBar style based on theme */}
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
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
