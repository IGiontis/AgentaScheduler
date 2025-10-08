import React from "react";
import { StyleSheet, View } from "react-native";

const FieldContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.field}>{children}</View>;

const styles = StyleSheet.create({ field: { marginBottom: 15 } });

export default FieldContainer;
