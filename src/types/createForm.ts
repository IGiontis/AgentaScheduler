import { FormEventType } from "./calendar";

export type FormData = {
  title: string;
  isRange: boolean;
  date?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  eventType: FormEventType;
};
