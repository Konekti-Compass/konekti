import React, { memo } from "react";

import { StatusBar } from "expo-status-bar";
import { Box, Button, Heading, Pressable, Text, VStack } from "native-base";

type WelcomeTemplateProps = {
  signInNavigationHandler: () => void;
};

const WelcomeTemplate = memo(
  ({ signInNavigationHandler }: WelcomeTemplateProps) => {
    return (
      <Pressable
        flex={1}
        pt="56"
        px="12"
        pb="32"
        justifyContent="space-between"
        bg="brand.600"
        onPress={signInNavigationHandler}
      >
        <StatusBar style="light" />
        <VStack space="0" alignItems="center">
          <Heading color="white" fontSize="64" letterSpacing="2">
            Konekti
          </Heading>
          <Heading
            color="white"
            fontSize="60"
            textAlign="center"
            letterSpacing="2"
          >
            Compass
          </Heading>
        </VStack>
        <Text bold color="white" fontSize="xl" textAlign="center">
          Tap to Start
        </Text>
      </Pressable>
    );
  }
);

export default WelcomeTemplate;
