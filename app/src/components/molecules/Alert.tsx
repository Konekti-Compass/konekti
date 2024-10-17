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
  text: string;
  status: "success" | "error";
  onPressCloseButton: () => void;
};

const Alert = memo(({ text, status, onPressCloseButton }: AlertProps) => {
  return (
    <NativeBaseAlert status={status} rounded="md" shadow="1" py="2">
      <HStack space="2" alignItems="center">
        <Icon
          as={
            <Feather
              name={status === "success" ? "check-circle" : "alert-circle"}
            />
          }
          size="5"
          color={status + ".500"}
        />
        <Text bold fontSize="sm" color={status + ".500"}>
          {text}
        </Text>
        <IconButton
          onPress={onPressCloseButton}
          icon={
            <Icon as={<Feather name="x" />} size="4" color={status + ".500"} />
          }
          variant="unstyled"
        />
      </HStack>
    </NativeBaseAlert>
  );
});

export default Alert;
