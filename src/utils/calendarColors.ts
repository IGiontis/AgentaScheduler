import { lightColors, darkColors } from "../theme/colors";
import { EventType } from "../types/calendar";




export const mapColorCode = (code: EventType, colors: typeof lightColors | typeof darkColors) => {
  const map: Record<EventType, string> = {
    today: colors.today,
    fixedHoliday: colors.fixedHoliday,
    userHoliday: colors.userHoliday,
    twoEvents: colors.eventBlue,
    threeEvents: colors.eventOrange,
    fourOrMoreEvents: colors.userHoliday,
  };

  return map[code];
};
