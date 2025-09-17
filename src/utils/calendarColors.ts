import { lightColors, darkColors } from "../theme/colors";
import { EventType } from "../types/calendar";

export const mapColorCode = (code: EventType, colors: typeof lightColors | typeof darkColors): string => {
  const map: Record<EventType, string> = {
    today: colors.today,
    fixedHoliday: colors.fixedHoliday,
    userHoliday: colors.userHoliday,
    twoEvents: colors.twoEvents,
    threeEvents: colors.threeEvents,
    fourOrMoreEvents: colors.fourOrMoreEvents,
  };

  return map[code];
};
