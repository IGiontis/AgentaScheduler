import React, { createContext, useState, useMemo, useContext } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { lightColors, darkColors } from "../theme/colors";

interface ThemeContextProps {
  theme: ColorSchemeName;
  colors: typeof lightColors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ColorSchemeName>(systemTheme);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Memoize colors so consumers don't re-render unnecessarily
  const colors = useMemo(() => (theme === "dark" ? darkColors : lightColors), [theme]);

  return <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
