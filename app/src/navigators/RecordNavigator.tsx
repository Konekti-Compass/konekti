import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RecordScreen from "../screens/RecordScreen";
import { RecordStackParamList } from "../types";

const RecordStack = createNativeStackNavigator<RecordStackParamList>();

const RecordNavigator = () => {
  return (
    <RecordStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <RecordStack.Screen name="Record" component={RecordScreen} />
    </RecordStack.Navigator>
  );
};

export default RecordNavigator;
