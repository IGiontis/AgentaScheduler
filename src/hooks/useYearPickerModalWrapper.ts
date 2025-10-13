import { useState, useCallback } from "react";
import { currentYear } from "../utils/date";

export function useYearPicker(initialYear: number = currentYear) {
  const [year, setYear] = useState(initialYear);
  const [yearPageStart, setYearPageStart] = useState(initialYear - 5);
  const [yearPickerVisible, setYearPickerVisible] = useState(false);


  const openPicker = useCallback(() => setYearPickerVisible(true), []);
  const closePicker = useCallback(() => setYearPickerVisible(false), []);
  const togglePicker = useCallback(() => setYearPickerVisible((v) => !v), []);

  return {
    year,
    setYear,
    yearPageStart,
    setYearPageStart,
    yearPickerVisible,
    setYearPickerVisible,
    openPicker,
    closePicker,
    togglePicker,
  };
}
