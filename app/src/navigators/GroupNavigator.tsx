import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupListScreen from "../screens/GroupListScreen";
import ProfileListScreen from "../screens/ProfileListScreen";
import { GroupStackParamList } from "../types";

const GroupStack = createNativeStackNavigator<GroupStackParamList>();

const GroupNavigator = () => {
  return (
    <GroupStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <GroupStack.Screen name="GroupList" component={GroupListScreen} />
      <GroupStack.Screen name="ProfileList" component={ProfileListScreen} />
    </GroupStack.Navigator>
  );
};

export default GroupNavigator;
