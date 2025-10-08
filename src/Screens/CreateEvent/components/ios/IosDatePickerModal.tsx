// src/features/CreateEventScreen.tsx
import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

interface IosDatePickerModalProps {
  value?: string;
  tempDate: Date;
  startDate?: string;
  parseDate: (str: string) => Date;
  formatDate: (date: Date) => string;
  onChange: (str: string) => void;
  setShowDatePicker: (show: boolean) => void;
  setTempDate: (date: Date) => void;
}

const IosDatePickerModal: React.FC<IosDatePickerModalProps> = ({ value, tempDate, startDate, parseDate, formatDate, onChange, setTempDate, setShowDatePicker }) => (
  <Modal transparent animationType="slide">
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <DateTimePicker
          value={value ? parseDate(value) : tempDate}
          mode="date"
          display="spinner"
          locale="el-GR"
          minimumDate={startDate ? parseDate(startDate) : undefined}
          onChange={(e, selectedDate) => selectedDate && setTempDate(selectedDate)}
        />
        <Button
          mode="contained"
          onPress={() => {
            onChange(formatDate(tempDate));
            setShowDatePicker(false);
          }}
          style={{ marginBottom: 5 }}
        >
          OK
        </Button>
        <Button onPress={() => setShowDatePicker(false)}>Cancel</Button>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20 },
});

export default IosDatePickerModal;
