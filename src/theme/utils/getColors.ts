import { lightColors, darkColors } from "../colors";
import { ColorSchemeName } from "react-native";

export const getColors = (scheme: ColorSchemeName) => {
  return scheme === "dark" ? darkColors : lightColors;
};
