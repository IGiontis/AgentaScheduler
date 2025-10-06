export type EventType = "none" | "today" | "fixedHoliday" | "userHoliday" | "bills" | "twoEvents" | "threeOrMoreEvents";

export interface CalendarEvent {
  ID: string;
  date: string; // "DD/MM/YYYY"
  title: string;
  eventType: EventType;
}

export type OnDayPress = (day: number, date: Date, events: CalendarEvent[]) => void;
