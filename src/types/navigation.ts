// src/types/navigation.ts
import { CalendarEvent } from "./calendar";

export type CalendarStackParamList = {
  CalendarHome: undefined;
  MonthDetails: {
    monthName: string;
    monthIndex: number;
    events: CalendarEvent[];
    year: number;
  };
};
