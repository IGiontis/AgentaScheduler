// src/utils/greekHolidays.ts
export interface Holiday {
  name: string;
  date: string; // dd/mm/yyyy
}

export function getGreekHolidays(year: number): Holiday[] {
  const formatDate = (date: Date): string => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // 0-indexed
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // Fixed-date holidays
  const fixedHolidays: { name: string; date: Date }[] = [
    { name: "Πρωτοχρονιά", date: new Date(year, 0, 1) }, // 1 Jan
    { name: "Θεοφάνεια", date: new Date(year, 0, 6) }, // 6 Jan
    { name: "25η Μαρτίου", date: new Date(year, 2, 25) }, // 25 Mar
    { name: "Εργατική Πρωτομαγιά", date: new Date(year, 4, 1) }, // 1 May
    { name: "Κοίμηση της Θεοτόκου", date: new Date(year, 7, 15) }, // 15 Aug
    { name: "28η Οκτωβρίου", date: new Date(year, 9, 28) }, // 28 Oct
    { name: "Χριστούγεννα", date: new Date(year, 11, 25) }, // 25 Dec
    { name: "Σύναξη της Θεοτόκου", date: new Date(year, 11, 26) }, // 26 Dec
  ];

  // Function to calculate Orthodox Easter Sunday
  const getOrthodoxEaster = (y: number): Date => {
    const a = y % 4;
    const b = y % 7;
    const c = y % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31) - 1; // 0 = Jan
    const day = ((d + e + 114) % 31) + 1;
    return new Date(y, month, day + 13); // Julian → Gregorian
  };

  const easterSunday = getOrthodoxEaster(year);

  // Movable holidays based on Easter
  const movableHolidays: { name: string; offset: number }[] = [
    { name: "Καθαρά Δευτέρα", offset: -48 }, // 48 days before Easter
    { name: "Μεγάλη Παρασκευή", offset: -2 },
    { name: "Κυριακή του Πάσχα", offset: 0 },
    { name: "Δευτέρα του Πάσχα", offset: 1 },
    { name: "Δευτέρα του Αγίου Πνεύματος", offset: 50 }, // Whit Monday (50 days after Easter)
  ];

  const holidays = [
    ...fixedHolidays,
    ...movableHolidays.map((h) => {
      const date = new Date(easterSunday);
      date.setDate(date.getDate() + h.offset);
      return { name: h.name, date };
    }),
  ];

  return holidays.map((h) => ({ name: h.name, date: formatDate(h.date) }));
}
