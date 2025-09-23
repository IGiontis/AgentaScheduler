import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BulletsAndLabelProps {
  bulletColor: string;
  text: string;
  textColor: string;
}

const BulletsAndLabel: React.FC<BulletsAndLabelProps> = ({ bulletColor, text, textColor }) => {
  return (
    <View style={styles.bulletContainer}>
      <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
      <Text style={[styles.label, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6, // makes it a circle
    marginRight: 8,
  },

  label: {
    fontSize: 14,
    color: "black",
  },
});

export default BulletsAndLabel;
