import { Pressable, Text, View, Modal } from "react-native";
import { type Colors } from "../../types/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

interface ModalYearPickerCalendarHomeProps {
  yearPageStart: number;
  year: number;
  yearPickerVisible: boolean;
  setYearPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setYearPageStart: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  colors: Colors;
}

const ModalYearPickerCalendarHome = ({ yearPageStart, yearPickerVisible, setYearPickerVisible, setYearPageStart, setYear, colors, year }: ModalYearPickerCalendarHomeProps) => {
  const years = Array.from({ length: 12 }, (_, i) => yearPageStart + i);

  const closeYearPicker = () => setYearPickerVisible(false);

  const handlePrevDecade = () => setYearPageStart((prev) => prev - 12);
  const handleNextDecade = () => setYearPageStart((prev) => prev + 12);

  const handleSelectYear = (y: number) => {
    setYear(y);
    closeYearPicker();
  };

  const currentYear = new Date().getFullYear();

  return (
    <Modal visible={yearPickerVisible} transparent animationType="fade">
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center", // <-- add this
          alignItems: "center", // <-- add this
        }}
        onPress={closeYearPicker}
      >
        <View
          style={{
            backgroundColor: colors.background,
            padding: 20,
            borderRadius: 8,
            width: "80%", // optional, keeps it neat
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Pressable onPress={handlePrevDecade}>
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </Pressable>

            <Pressable
              onPress={() => {
                setYear(currentYear);
                setYearPageStart(currentYear - 6);
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.calendarSelectedYear,
                  fontWeight: "bold",
                }}
              >
                {currentYear}
              </Text>
            </Pressable>

            <Pressable onPress={handleNextDecade}>
              <Ionicons name="chevron-forward" size={24} color={colors.text} />
            </Pressable>
          </View>

          {/* Grid of years */}
          <FlatList
            data={years}
            numColumns={3}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectYear(item)}
                style={{
                  flex: 1,
                  margin: 5,
                  padding: 12,
                  alignItems: "center",
                  borderRadius: 6,
                  // backgroundColor: item === year ? colors.primary : colors.card,
                }}
              >
                <Text
                  style={{
                    color: item === year ? colors.calendarSelectedYear : colors.text,
                    fontWeight: item === year ? "bold" : "normal", // <-- bold selected
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalYearPickerCalendarHome;
