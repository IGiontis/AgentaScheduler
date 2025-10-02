import React, { createContext, useState, useMemo, useContext } from "react";
import { Appearance } from "react-native";
import { lightColors, darkColors } from "../theme/colors";

interface ThemeContextProps {
  theme: "light" | "dark";
  colors: typeof lightColors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() ?? "light";
  const [theme, setTheme] = useState<"light" | "dark">(systemTheme);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const colors = useMemo(() => (theme === "dark" ? darkColors : lightColors), [theme]);

  return <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
