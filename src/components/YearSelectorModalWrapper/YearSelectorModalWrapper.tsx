import YearSelectorCalendarHome from "./YearSelectorCalendarHome";
import ModalYearPickerCalendarHome from "./ModalYearPickerCalendarHome";
import React from "react";
import { Colors } from "../../types/colors";

type PropsYearSelectorModalWrapper = {
  year: number;
  yearPageStart: number;
  yearPickerVisible: boolean;
  colors: Colors;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setYearPageStart: React.Dispatch<React.SetStateAction<number>>;
  setYearPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const YearSelectorModalWrapper = ({ year, setYear, setYearPageStart, setYearPickerVisible, colors, yearPageStart, yearPickerVisible }: PropsYearSelectorModalWrapper) => {
  return (
    <>
      {/* Year Selector */}
      <YearSelectorCalendarHome year={year} setYear={setYear} setYearPageStart={setYearPageStart} setYearPickerVisible={setYearPickerVisible} colors={colors} />

      {/* Year Picker Modal */}
      <ModalYearPickerCalendarHome
        yearPageStart={yearPageStart}
        yearPickerVisible={yearPickerVisible}
        setYearPickerVisible={setYearPickerVisible}
        setYearPageStart={setYearPageStart}
        setYear={setYear}
        colors={colors}
        year={year}
      />
    </>
  );
};

export default YearSelectorModalWrapper;
