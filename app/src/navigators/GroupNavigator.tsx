import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupScreen from "../screens/GroupScreen";
import { GroupStackParamList } from "../types";

const GroupStack = createNativeStackNavigator<GroupStackParamList>();

const GroupNavigator = () => {
  return (
    <GroupStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <GroupStack.Screen
        name="Group"
        component={GroupScreen}
      />
    </GroupStack.Navigator>
  );
};

export default GroupNavigator;
