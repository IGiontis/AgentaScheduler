import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";

export const store = configureStore({
  reducer: {
    eventsSlice: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
