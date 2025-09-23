// src/components/AppScreenContainer.tsx
import React from "react";
import { View, ScrollView, StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../context/ThemeContext";

interface ScreenContainerProps extends ViewProps {
  scrollable?: boolean; // optional, default false
  children: React.ReactNode;
}

const AppScreenContainer: React.FC<ScreenContainerProps> = ({ scrollable = false, children, style, ...rest }) => {
  const { colors } = useThemeContext();

  if (scrollable) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.container, style]} {...rest}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }, style]} {...rest}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 8 },
});

export default AppScreenContainer;
