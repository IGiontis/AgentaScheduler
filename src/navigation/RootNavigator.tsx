import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import CalendarNavigator from "./CalendarNavigator";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <CalendarNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
