import AppScreenContainer from "../components/AppScreenContainer";
import { useThemeContext } from "../context/ThemeContext";
import YearSelectorModalWrapper from "../components/YearSelectorModalWrapper/YearSelectorModalWrapper";
import { useYearPicker } from "../hooks/useYearPickerModalWrapper";
import { Text } from "react-native-paper";

const EventsYearScreen = () => {
  const { colors } = useThemeContext();
  const { year, setYear, yearPageStart, setYearPageStart, yearPickerVisible, setYearPickerVisible } = useYearPicker();

  return (
    <AppScreenContainer scrollable>
      <YearSelectorModalWrapper
        year={year}
        setYear={setYear}
        setYearPageStart={setYearPageStart}
        setYearPickerVisible={setYearPickerVisible}
        colors={colors}
        yearPageStart={yearPageStart}
        yearPickerVisible={yearPickerVisible}
      />

      <Text>test</Text>
    </AppScreenContainer>
  );
};

export default EventsYearScreen;
