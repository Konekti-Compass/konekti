import React from "react";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useColorModeValue } from "native-base";

import RootNavigator from "../navigators/RootNavigator";

const RootComponent = () => {
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#171717",
    },
  };

    const prefix = Linking.createURL("/");

  return (
    <NavigationContainer
      theme={useColorModeValue(lightTheme, darkTheme)}
      linking={{
        prefixes: [prefix],
        subscribe(listener) {
          const urlSubscription = Linking.addEventListener(
            "url",
            ({ url }: { url: string }) => {
              listener(url);
            }
          );

          return () => {
            urlSubscription.remove();
          };
        },
      }}
    >
      <StatusBar style={useColorModeValue("dark", "light")} />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default RootComponent;