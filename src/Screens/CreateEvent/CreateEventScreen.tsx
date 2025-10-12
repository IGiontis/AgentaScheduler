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
