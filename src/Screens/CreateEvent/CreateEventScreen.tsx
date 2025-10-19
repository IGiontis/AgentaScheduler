// src/features/CreateEventScreen.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, HelperText, Switch, Text } from "react-native-paper";
import { useForm, Controller, useWatch, type SubmitHandler } from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { format, parse } from "date-fns";
import AppScreenContainer from "../../components/AppScreenContainer";

import FieldContainer from "./components/FieldContainer";
import { useThemeContext } from "../../context/ThemeContext";
import SingleDatePicker from "./components/SingleDatePicker";
import { FormData } from "../../types/createForm";
import FromToDatePickers from "./components/FromToDatePickers";
import { EVENT_TYPES } from "../../types/calendar";

// -------------------
// Validation Schema
// -------------------
const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  isRange: Yup.boolean().default(false),
  date: Yup.string().when("isRange", {
    is: false,
    then: (schema) => schema.required("Date is required"),
    otherwise: (schema) => schema.optional(),
  }),
  startDate: Yup.string().when("isRange", {
    is: true,
    then: (schema) => schema.required("Start date required"),
    otherwise: (schema) => schema.optional(),
  }),
  endDate: Yup.string().when("isRange", {
    is: true,
    then: (schema) => schema.required("End date required"),
    otherwise: (schema) => schema.optional(),
  }),
  description: Yup.string().optional(),
  eventType: Yup.mixed<typeof EVENT_TYPES.USER_HOLIDAY | typeof EVENT_TYPES.BILLS>().oneOf([EVENT_TYPES.USER_HOLIDAY, EVENT_TYPES.BILLS]).required("Event type is required"),
});
// -------------------
// Screen Component
// -------------------
const CreateEventScreen = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: "",
      isRange: false,
      date: "",
      startDate: "",
      endDate: "",
      description: "",
      eventType: EVENT_TYPES.USER_HOLIDAY,
    },
  });

  const { colors } = useThemeContext();

  const isRange = useWatch({ control, name: "isRange" });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeField, setActiveField] = useState<"date" | "startDate" | "endDate" | null>(null);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
  const parseDate = (str: string) => parse(str, "dd/MM/yyyy", new Date());

  // Clear irrelevant dates when toggling between single/range
  useEffect(() => {
    if (isRange) {
      setValue("date", "");
    } else {
      setValue("startDate", "");
      setValue("endDate", "");
    }
  }, [isRange, setValue]);

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  useEffect(() => {
    if (startDate && endDate && parseDate(endDate) < parseDate(startDate)) {
      setValue("endDate", startDate);
    }
  }, [startDate, endDate, setValue]);

  const handleDateChange = (selectedDate: Date | undefined, onChange: (value: string) => void) => {
    setShowDatePicker(false);
    if (selectedDate) onChange(formatDate(selectedDate));
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const payload: any = {
      title: data.title,
      description: data.description,
      eventType: data.eventType,
    };

    if (data.isRange) {
      payload.startDate = data.startDate;
      payload.endDate = data.endDate;
    } else {
      payload.date = data.date;
    }

    console.log("✅ Clean payload:", payload);
  };

  return (
    <AppScreenContainer scrollable>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView>
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

          {/* Dates */}
          {!isRange ? (
            <SingleDatePicker
              control={control}
              errors={errors}
              showDatePicker={showDatePicker}
              activeField={activeField}
              setActiveField={setActiveField}
              setShowDatePicker={setShowDatePicker}
              parseDate={parseDate}
              handleDateChange={handleDateChange}
              tempDate={tempDate}
              setTempDate={setTempDate}
              formatDate={formatDate}
              startDate={startDate}
            />
          ) : (
            <FromToDatePickers
              control={control}
              errors={errors}
              showDatePicker={showDatePicker}
              activeField={activeField}
              setActiveField={setActiveField}
              setShowDatePicker={setShowDatePicker}
              parseDate={parseDate}
              handleDateChange={handleDateChange}
              tempDate={tempDate}
              setTempDate={setTempDate}
              formatDate={formatDate}
              startDate={startDate}
            />
          )}

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

          {/* Range Toggle */}
          <FieldContainer>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: colors.text }}>Multi-day event (From–To)</Text>
              <Controller control={control} name="isRange" render={({ field: { value, onChange } }) => <Switch value={value} onValueChange={onChange} />} />
            </View>
          </FieldContainer>

          <FieldContainer>
            <Text style={{ color: colors.text }}>Event Type</Text>
            <Controller
              control={control}
              name="eventType"
              render={({ field: { value, onChange } }) => (
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <Button mode={value === EVENT_TYPES.USER_HOLIDAY ? "contained" : "outlined"} onPress={() => onChange(EVENT_TYPES.USER_HOLIDAY)}>
                    User Holiday
                  </Button>
                  <Button mode={value === EVENT_TYPES.BILLS ? "contained" : "outlined"} onPress={() => onChange(EVENT_TYPES.BILLS)}>
                    Bills
                  </Button>
                </View>
              )}
            />
          </FieldContainer>

          {/* Submit */}
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
  input: { marginBottom: 0 },
  button: { marginTop: 10 },
});

export default CreateEventScreen;
