import { lightColors, darkColors } from "../theme/colors";

export const mapColorCode = (code: number, colors: typeof lightColors | typeof darkColors) => {
  switch (code) {
    case 1:
      return colors.today;
    case 2:
      return colors.fixedHoliday;
    case 3:
      return colors.userHoliday;
    default:
      return "gray";
  }
};
