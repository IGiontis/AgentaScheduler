import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DateFormatter } from "../utils/date";

interface BulletsAndLabelProps {
  bulletColor: string;
  date?: string;
  text: string;
  textColor: string;
  variant?: "default" | "dateWithDay" | "compact"; // add more as needed
}

const BulletsAndLabel = ({ bulletColor, date, text, textColor, variant = "dateWithDay" }: BulletsAndLabelProps) => {
  switch (variant) {
    case "default":
    default:
      return (
        <View style={styles.container}>
          <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
          {date && (
            <View style={styles.bulletSeparator}>
              <Text style={[styles.date, { color: textColor }]}>{date}</Text>
              <Text style={[styles.separator, { color: textColor }]}>&nbsp;-</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: textColor }]}>{text}</Text>
          </View>
        </View>
      );

    case "dateWithDay": {
      const formattedDate = date ? DateFormatter.withDayName(date) : undefined;

      return (
        <View style={styles.container}>
          <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
          {formattedDate && (
            <View style={styles.bulletSeparator}>
              <Text style={[styles.date, { color: textColor }]}>{formattedDate}</Text>
              <Text style={[styles.separator, { color: textColor }]}>-</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: textColor }]}>{text}</Text>
          </View>
        </View>
      );
    }
  }
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
    fontWeight: "500",
  },
});

export default BulletsAndLabel;
