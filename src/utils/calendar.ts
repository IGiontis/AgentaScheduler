// utils/calendar.ts

// Month names constant
export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Generate days of a month
export const generateMonthDays = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days: (number | null)[] = [];

  const startDay = date.getDay(); // 0 = Sun, 6 = Sat

  // Empty slots before first day
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Actual days
  while (date.getMonth() === month) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
};
