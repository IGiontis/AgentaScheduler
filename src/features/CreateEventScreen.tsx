// src/features/CreateEventScreen.tsx
import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parse } from "date-fns";
import AppScreenContainer from "../components/AppScreenContainer";

// -------------------
// Validation Schema
// -------------------
const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  date: Yup.string()
    .required("Date is required")
    .matches(/^(\d{2})\/(\d{2})\/(\d{4})$/, "Date must be in dd/mm/yyyy format"),
  description: Yup.string().optional(),
});

type FormData = Yup.InferType<typeof schema>;

// -------------------
// Screen Component
// -------------------
const CreateEventScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      title: "",
      date: "",
      description: "",
    },
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date>(new Date());

  const onSubmit = (data: FormData) => {
    console.log("Event Created:", data);
  };

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
  const parseDate = (str: string) => parse(str, "dd/MM/yyyy", new Date());

  return (
    <AppScreenContainer scrollable>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title */}
          <FieldContainer>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput label="Title" value={value} onBlur={onBlur} onChangeText={onChange} style={styles.input} error={!!errors.title} />
                  {errors.title && <HelperText type="error">{errors.title.message}</HelperText>}
                </>
              )}
            />
          </FieldContainer>

          {/* Date */}
          <FieldContainer>
            <Controller
              control={control}
              name="date"
              render={({ field: { value, onChange } }) => (
                <>
                  <TextInput
                    label="Date (dd/mm/yyyy)"
                    value={value}
                    style={styles.input}
                    onFocus={() => setShowDatePicker(true)}
                    showSoftInputOnFocus={false}
                    error={!!errors.date}
                  />
                  {errors.date && <HelperText type="error">{errors.date.message}</HelperText>}

                  {/* Android DatePicker */}
                  {showDatePicker && Platform.OS === "android" && (
                    <DateTimePicker
                      value={value ? parseDate(value) : new Date()}
                      mode="date"
                      display="default"
                      locale="el-GR"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) onChange(formatDate(selectedDate));
                      }}
                    />
                  )}

                  {/* iOS DatePicker */}
                  {showDatePicker && Platform.OS === "ios" && (
                    <Modal transparent animationType="slide">
                      <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                          <DateTimePicker
                            value={value ? parseDate(value) : tempDate}
                            mode="date"
                            display="spinner"
                            locale="el-GR"
                            onChange={(e, selectedDate) => {
                              if (selectedDate) setTempDate(selectedDate);
                            }}
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
                  )}
                </>
              )}
            />
          </FieldContainer>

          {/* Description */}
          <FieldContainer>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput label="Description" value={value} onBlur={onBlur} onChangeText={onChange} style={styles.input} multiline error={!!errors.description} />
                  {errors.description && <HelperText type="error">{errors.description.message}</HelperText>}
                </>
              )}
            />
          </FieldContainer>

          <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
            Create Event
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreenContainer>
  );
};

// -------------------
// Styles
// -------------------
const styles = StyleSheet.create({
  container: { padding: 20 },
  field: { marginBottom: 15 }, // container handles spacing between fields
  input: { marginBottom: 0 }, // remove marginBottom from input
  button: { marginTop: 10 },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20 },
});

export default CreateEventScreen;

// -------------------
// Field Container
// -------------------
const FieldContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.field}>{children}</View>;
