import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Center, Spinner } from "native-base";

import useAuth from "../hooks/utils/useAuth";
import ProfileDetailScreen from "../screens/ProfileDetailScreen";
import { RootStackParamList } from "../types";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center flex={1}>
        <Spinner color="muted.400" />
      </Center>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {session && session?.user.id ? (
        <RootStack.Group>
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
          <RootStack.Group
            screenOptions={{
              animation: "fade_from_bottom",
              animationDuration: 150,
            }}
          >
            <RootStack.Screen
              name="ProfileDetail"
              component={ProfileDetailScreen}
            />
          </RootStack.Group>
        </RootStack.Group>
      ) : (
        <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
