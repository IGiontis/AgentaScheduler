import { lightColors, darkColors } from "../theme/colors";
import { EventType } from "../types/calendar";

export const mapColorCode = (code: EventType, colors: typeof lightColors | typeof darkColors): string => {
  const map: Record<EventType, string> = {
    today: colors.today,
    fixedHoliday: colors.fixedHoliday,
    userHoliday: colors.userHoliday,
    bills: colors.bills,
    twoEvents: colors.twoEvents,
    threeOrMoreEvents: colors.threeOrMoreEvents,
    none: "transparent", // <-- added missing key
  };

  return map[code];
};
