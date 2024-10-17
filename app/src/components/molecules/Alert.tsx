import React, { memo } from "react";

import { Feather } from "@expo/vector-icons";
import {
  Alert as NativeBaseAlert,
  Icon,
  HStack,
  IconButton,
  Text,
} from "native-base";

type AlertProps = {
  onPressCloseButton: () => void;
  text: string;
  status: "success" | "error";
};

const Alert = memo(({ onPressCloseButton, text, status }: AlertProps) => {
  return (
    <NativeBaseAlert status={status} rounded="md">
      <HStack space="2" alignItems="center">
        <Icon as={<Feather name="alert-triangle" />} size="4" color={status + ".600"}/>
        <Text fontSize="md" color="black">
          {text}
        </Text>
        <IconButton
          onPress={onPressCloseButton}
          icon={<Icon as={<Feather name="x" />} size="3" />}
          variant="unstyled"
        />
      </HStack>
    </NativeBaseAlert>
  );
});

export default Alert;
