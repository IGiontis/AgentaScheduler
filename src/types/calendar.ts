
export type EventType =
  | "today"
  | "fixedHoliday"
  | "userHoliday"
  | "twoEvents"
  | "threeEvents"
  | "fourOrMoreEvents";

export interface CalendarEvent {
  ID: string;
  date: string; // "DD/MM/YYYY"
  title: string;
  eventType: EventType;
}

export type OnDayPress = (day: number, date: Date, events: CalendarEvent[]) => void;
