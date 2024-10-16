import React, { useCallback } from "react";
import { Platform } from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Route, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Icon, Text, useColorModeValue } from "native-base";

import { TabParamList } from "../types";

import HomeNavigator from "./HomeNavigator";
import GroupNavigator from "./GroupNavigator";
import SearchNavigator from "./SearchNavigator";
import RecordNavigator from "./RecordNavigator";
import SettingNavigator from "./SettingNavigator";

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const bgColor = useColorModeValue("white", "#262626");
  const borderColor = useColorModeValue("#d4d4d4", "#525252");
  const iconColor = useColorModeValue("muted.400", "muted.200");

  const getTabStyle = useCallback(
    (route: Partial<Route<string, object | undefined>>) => {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === "Hoge") return false;

      return true;
    },
    []
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          display: getTabStyle(route) ? "flex" : "none",
          backgroundColor: bgColor,
          borderColor: borderColor,
          borderTopWidth: 0.5,
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: 6,
          paddingBottom: Platform.OS === "android" ? 16 : 32,
          paddingHorizontal: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={<Feather />}
              name="map-pin"
              size={focused ? "lg" : "md"}
              color={focused ? "brand.600" : iconColor}
              mt="1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text bold fontSize="2xs" color={focused ? "brand.600" : iconColor}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="GroupNavigator"
        component={GroupNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={<Feather />}
              name="users"
              size={focused ? "lg" : "md"}
              color={focused ? "brand.600" : iconColor}
              mt="1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text bold fontSize="2xs" color={focused ? "brand.600" : iconColor}>
              Group
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={<Feather />}
              name="clipboard"
              size={focused ? "lg" : "md"}
              color={focused ? "brand.600" : iconColor}
              mt="1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text bold fontSize="2xs" color={focused ? "brand.600" : iconColor}>
              Search
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="RecordNavigator"
        component={RecordNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={<Feather />}
              name="message-circle"
              size={focused ? "lg" : "md"}
              color={focused ? "brand.600" : iconColor}
              mt="1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text bold fontSize="2xs" color={focused ? "brand.600" : iconColor}>
              Record
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="SettingNavigator"
        component={SettingNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={<AntDesign />}
              name="setting"
              size={focused ? "lg" : "md"}
              color={focused ? "brand.600" : iconColor}
              mt="1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text bold fontSize="2xs" color={focused ? "brand.600" : iconColor}>
              Setting
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
