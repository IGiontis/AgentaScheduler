// selectors.ts
import { createSelector } from "@reduxjs/toolkit";
import { getHolidayEvents } from "../utils/greekHolidays";
import { RootState } from "./store";

export const selectAllEvents = (year: number) =>
  createSelector(
    (state: RootState) => state.eventsSlice.events,
    (userEvents) => [...userEvents, ...getHolidayEvents(year)]
  );
