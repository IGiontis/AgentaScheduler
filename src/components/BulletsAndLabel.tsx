import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BulletsAndLabelProps {
  bulletColor: string;
  date?: string;
  text: string;
  textColor: string;
}

const BulletsAndLabel: React.FC<BulletsAndLabelProps> = ({ bulletColor, date, text, textColor }) => {
  return (
    <View style={styles.container}>
      {/* Bullet */}
      <View style={[styles.bullet, { backgroundColor: bulletColor }]} />

      {/* Text area */}
      {date && (
        <View style={styles.bulletSeparator}>
          <Text style={styles.date}>{date} </Text>
          <Text style={styles.separator}>-</Text>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: textColor }]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start", // aligns bullet with first line of text
    marginVertical: 4,
    flexWrap: "nowrap",
  },
  bulletSeparator: {
    flexDirection: "row",
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
    marginTop: 5, // vertically centers bullet with first text line
  },
  textContainer: {
    flex: 1, // allows wrapping under text, not bullet
  },
  label: {
    flexWrap: "wrap",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
  },
  date: {
    fontWeight: "600",
  },
  separator: {
    marginHorizontal: 4,
    fontWeight:'500'
  },
});

export default BulletsAndLabel;
