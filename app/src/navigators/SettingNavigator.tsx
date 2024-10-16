import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingScreen from "../screens/SettingScreen";
import { SettingStackParamList } from "../types";

const SettingStack = createNativeStackNavigator<SettingStackParamList>();

const SettingNavigator = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <SettingStack.Screen name="Setting" component={SettingScreen} />
    </SettingStack.Navigator>
  );
};

export default SettingNavigator;
