// src/features/FromToDatePickers.tsx
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { Controller, useWatch, type Control } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

import FieldContainer from "./FieldContainer";
import IosDatePickerModal from "./ios/IosDatePickerModal";
import { FormData } from "../../../types/createForm";

interface Props {
  control: Control<FormData>;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  activeField: "startDate" | "endDate" | "date" | null;
  setActiveField: (field: "startDate" | "endDate" | "date" | null) => void;
  errors: Partial<Record<keyof FormData, any>>;
  tempDate: Date;
  setTempDate: (date: Date) => void;
  parseDate: (str: string) => Date;
  formatDate: (date: Date) => string;
  handleDateChange: (selectedDate: Date | undefined, onChange: (value: string) => void) => void;
  startDate?: string;
}

const FromToDatePickers = ({
  control,
  showDatePicker,
  setShowDatePicker,
  activeField,
  setActiveField,
  errors,
  tempDate,
  setTempDate,
  parseDate,
  formatDate,
  handleDateChange,
}: Props) => {
  const startDateValue = useWatch({ control, name: "startDate" }) || "";

  return (
    <>
      {/* Start Date */}
      <FieldContainer>
        <Controller
          control={control}
          name="startDate"
          render={({ field: { value, onChange } }) => (
            <>
              <TextInput
                label="Start Date"
                value={value}
                style={styles.input}
                onFocus={() => {
                  setActiveField("startDate");
                  setShowDatePicker(true);
                }}
                showSoftInputOnFocus={false}
                error={!!errors.startDate}
              />
              {errors.startDate && <HelperText type="error">{errors.startDate.message}</HelperText>}
              {showDatePicker &&
                activeField === "startDate" &&
                (Platform.OS === "android" ? (
                  <DateTimePicker
                    value={value ? parseDate(value) : new Date()}
                    mode="date"
                    display="default"
                    locale="el-GR"
                    onChange={(event, selectedDate) => handleDateChange(selectedDate, onChange)}
                  />
                ) : (
                  <IosDatePickerModal
                    value={value}
                    tempDate={tempDate}
                    parseDate={parseDate}
                    formatDate={formatDate}
                    onChange={onChange}
                    setTempDate={setTempDate}
                    setShowDatePicker={setShowDatePicker}
                  />
                ))}
            </>
          )}
        />
      </FieldContainer>

      {/* End Date */}
      <FieldContainer>
        <Controller
          control={control}
          name="endDate"
          render={({ field: { value, onChange } }) => (
            <>
              <TextInput
                label="End Date"
                value={value}
                style={styles.input}
                onFocus={() => {
                  setActiveField("endDate");
                  setShowDatePicker(true);
                }}
                showSoftInputOnFocus={false}
                error={!!errors.endDate}
              />
              {errors.endDate && <HelperText type="error">{errors.endDate.message}</HelperText>}
              {showDatePicker &&
                activeField === "endDate" &&
                (Platform.OS === "android" ? (
                  <DateTimePicker
                    value={value ? parseDate(value) : startDateValue ? parseDate(startDateValue) : new Date()}
                    mode="date"
                    display="default"
                    locale="el-GR"
                    minimumDate={startDateValue ? parseDate(startDateValue) : undefined} // prevent picking before start
                    onChange={(event, selectedDate) => handleDateChange(selectedDate, onChange)}
                  />
                ) : (
                  <IosDatePickerModal
                    value={value}
                    tempDate={tempDate}
                    startDate={startDateValue}
                    parseDate={parseDate}
                    formatDate={formatDate}
                    onChange={onChange}
                    setTempDate={setTempDate}
                    setShowDatePicker={setShowDatePicker}
                  />
                ))}
            </>
          )}
        />
      </FieldContainer>
    </>
  );
};

const styles = StyleSheet.create({
  input: { marginBottom: 0 },
});

export default FromToDatePickers;
