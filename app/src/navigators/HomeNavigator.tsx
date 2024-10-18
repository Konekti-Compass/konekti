import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import { HomeStackParamList } from "../types";
import EditProfileScreen from "../screens/EditProfileScreen";
import QRCodeScreen from "../screens/QRCodeScreen";
import FriendListScreen from "../screens/FriendListScreen";

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="QRCode" component={QRCodeScreen} />
      <HomeStack.Screen name="FriendList" component={FriendListScreen} />
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
