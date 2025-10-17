import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CalendarEvent } from "../types/calendar";
import { RootState } from "./store";

interface EventsState {
  events: CalendarEvent[];
}

const initialState: EventsState = {
  events: [
    { ID: "1", date: "03/02/2025", title: "Meeting", eventType: "userHoliday" },
    { ID: "2", date: "12/12/2025", title: "Birthday", eventType: "userHoliday" },
    { ID: "3", date: "01/05/2025", title: "Birthday", eventType: "userHoliday" },
    { ID: "4", date: "01/05/2025", title: "Paok", eventType: "userHoliday" },
    { ID: "5", date: "06/01/2025", title: "Mitsos irthe gia na paei mia volta me ton skulo tou alla pio polu na doume pws tha to emfanisei", eventType: "userHoliday" },
    { ID: "6", date: "16/01/2025", title: "Mitsos", eventType: "bills" },
    { ID: "7", date: "16/01/2025", title: "test", eventType: "userHoliday" },
    { ID: "8", date: "16/01/2025", title: "test", eventType: "bills" },
  ],
};

// const initialState: EventsState = { events: [] };

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = eventsSlice.actions;

export const selectUserEvents = (state: RootState) => state.eventsSlice.events;

export default eventsSlice.reducer;
