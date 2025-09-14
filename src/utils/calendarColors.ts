import { lightColors, darkColors } from "../theme/colors";

export const mapColorCode = (code: number, colors: typeof lightColors | typeof darkColors) => {
  switch (code) {
    case 1:
      return colors.eventBlue;
    case 2:
      return colors.eventGreen;
    case 3:
      return colors.eventOrange;
    default:
      return "gray";
  }
};
