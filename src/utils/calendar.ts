import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

export const monthNames = ["ΙΑΝΟΥΑΡΙΟΣ", "ΦΕΒΡΟΥΑΡΙΟΣ", "ΜΑΡΤΙΟΣ", "ΑΠΡΙΛΙΟΣ", "ΜΑΙΟΣ", "ΙΟΥΝΙΟΣ", "ΙΟΥΛΙΟΣ", "ΑΥΓΟΥΣΤΟΣ", "ΣΕΠΤΕΜΒΡΙΟΣ", "ΟΚΤΩΒΡΙΟΣ", "ΝΟΕΜΒΡΙΟΣ", "ΔΕΚΕΜΒΡΙΟΣ"];

/**
 * Generate array of days for a given month.
 * Each element is a number (day) or null for empty slots at the start.
 * Monday is treated as the first day of the week.
 */
export function generateMonthDays(year: number, month: number): (number | null)[] {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);

  const allDays = eachDayOfInterval({ start, end });

  // Calculate empty slots before the first day (Monday=0, Sunday=6)
  const firstDayOfWeek = (getDay(start) + 6) % 7; // adjust so Monday=0
  const days: (number | null)[] = Array(firstDayOfWeek).fill(null);

  // Add actual days
  allDays.forEach((d) => days.push(d.getDate()));

  return days;
}
