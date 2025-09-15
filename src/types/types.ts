export type CalendarEvent = {
  ID: string;
  date: string;
  title: string;
  colorCode: number;
};

export type OnDayPress = (day: number, date: Date, events: CalendarEvent[]) => void;