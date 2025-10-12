import { Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { type Control, Controller } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";

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

const SingleDatePicker = ({
  control,
  setActiveField,
  setShowDatePicker,
  showDatePicker,
  activeField,
  tempDate,
  errors,
  parseDate,
  handleDateChange,
  formatDate,
  setTempDate,
}: Props) => {
  return (
    <FieldContainer>
      <Controller
        control={control}
        name="date"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              label="Date (dd/MM/yyyy)"
              value={value}
              style={styles.input}
              onFocus={() => {
                setActiveField("date");
                setShowDatePicker(true);
              }}
              showSoftInputOnFocus={false}
              error={!!errors.date}
            />
            {errors.date && <HelperText type="error">{errors.date.message}</HelperText>}

            {showDatePicker &&
              activeField === "date" &&
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
  );
};

const styles = StyleSheet.create({ input: { marginBottom: 0 } });

export default SingleDatePicker;
