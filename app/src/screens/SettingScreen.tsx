import React from "react";
import { Alert } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Text, Center, useToast, HStack, Icon, Pressable, useColorModeValue } from "native-base";
import { useSignOut } from "../hooks/auth/mutate";

const SettingScreen = () => {
  const iconColor = useColorModeValue("muted.500", "muted.100");

  const { mutateAsync: mutateAsyncSignOut, isPending: isLoadingSignOut } =
    useSignOut({
      onError: () => {},
    });

  return (
    <Center flex={1}>
      <Pressable
        onPress={() =>
          Alert.alert("サインアウト", "サインアウトしてもよろしいですか", [
            {
              text: "キャンセル",
              style: "cancel",
            },
            {
              text: "サインアウト",
              onPress: () => mutateAsyncSignOut(),
              style: "destructive",
            },
          ])
        }
        _pressed={{
          opacity: 0.5,
        }}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <HStack p="2" space="2" alignItems="center" rounded="md">
            <Icon as={<Feather />} name="log-out" size="md" color={iconColor} />
            <Text fontSize="md">サインアウト</Text>
          </HStack>
          <Icon
            as={<Feather />}
            name="chevron-right"
            size="md"
            color={iconColor}
          />
        </HStack>
      </Pressable>
    </Center>
  );
};

export default SettingScreen;
