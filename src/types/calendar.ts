// src/types/calendar.ts

export const EVENT_TYPES = {
  NONE: "none",
  TODAY: "today",
  FIXED_HOLIDAY: "fixedHoliday",
  USER_HOLIDAY: "userHoliday",
  BILLS: "bills",
  TWO_EVENTS: "twoEvents",
  THREE_OR_MORE_EVENTS: "threeOrMoreEvents",
} as const;

// Derive type automatically from object
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

export type FormEventType = Extract<EventType, typeof EVENT_TYPES.USER_HOLIDAY | typeof EVENT_TYPES.BILLS>;

export interface CalendarEvent {
  ID: string;
  date: string; // "DD/MM/YYYY"
  title: string;
  eventType: EventType;
}

export type OnDayPress = (day: number, date: Date, events: CalendarEvent[]) => void;
