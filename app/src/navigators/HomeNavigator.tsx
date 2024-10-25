import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfileScreen from "../screens/EditProfileScreen";
import FriendListScreen from "../screens/FriendListScreen";
import HomeScreen from "../screens/HomeScreen";
import PostProfileScreen from "../screens/PostProfileScreen";
import QRCodeScreen from "../screens/QRCodeScreen";
import { HomeStackParamList } from "../types";

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
        <HomeStack.Screen name="PostProfile" component={PostProfileScreen} />
        <HomeStack.Screen name="EditProfile" component={EditProfileScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
