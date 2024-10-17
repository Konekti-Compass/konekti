import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import { HomeStackParamList } from "../types";
import EditProfileScreen from "../screens/EditProfileScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Group
        screenOptions={{
          animation: "fade_from_bottom",
          animationDuration: 150,
        }}
      >
        <HomeStack.Screen name="EditProfile" component={EditProfileScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
