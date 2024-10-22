import React, { useEffect } from "react";
import { LogBox, useColorScheme } from "react-native";
import {
  ColorMode,
  extendTheme,
  NativeBaseProvider,
  StorageManager,
} from "native-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootComponent from "./components/RootComponent";
import { ProfileIdProvider } from "./contexts/ProfileIdProvider";

LogBox.ignoreAllLogs();

const App = () => {
  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: {
          color: "muted.700",
        },
      },
      Text: {
        baseStyle: {
          color: "muted.700",
        },
      },
    },
    colors: {
      brand: {
        200: "#ffe0d5",
        300: "#ffccbc",
        400: "#ffab91",
        500: "#ff8a65",
        600: "#ff7043",
        700: "#f4511e",
        800: "#e64a19",
        900: "#d84315",
      },
    },
  });

  const colorScheme = useColorScheme();
  const colorModeManager: StorageManager = {
    get: async () => {
      const theme = await AsyncStorage.getItem("@theme");
      if (!theme) {
        return colorScheme;
      }
      return theme === "dark" ? "dark" : "light";
    },
    set: async (value: ColorMode) => {
      await AsyncStorage.setItem("@theme", value || "");
    },
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProfileIdProvider>
            <RootComponent />
          </ProfileIdProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default App;
