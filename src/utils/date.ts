import { parse, format } from "date-fns";
import { el } from "date-fns/locale";

export const currentYear = new Date().getFullYear();

export const DateFormatter = {
  withDayName: (dateStr: string) => {
    try {
      const parsed = parse(dateStr, "dd/MM/yyyy", new Date());
      return format(parsed, "dd, EEEE", { locale: el });
    } catch {
      return dateStr;
    }
  },
};
