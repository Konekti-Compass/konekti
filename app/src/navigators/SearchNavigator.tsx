import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "../screens/SearchScreen";
import { SearchStackParamList } from "../types";

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

const SearchNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
