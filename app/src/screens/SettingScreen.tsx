import React from "react";
import { Alert } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Text,
  Center,
  HStack,
  Icon,
  Pressable,
  useColorModeValue,
  VStack,
} from "native-base";
import { useSignOut } from "../hooks/auth/mutate";
import { usePostBelongCode } from "../hooks/belongCode/mutate";

const SettingScreen = () => {
  const iconColor = useColorModeValue("muted.500", "muted.100");

  const { mutateAsync: mutateAsyncSignOut, isPending: isLoadingSignOut } =
    useSignOut({
      onError: () => {},
    });
  
  const { mutateAsync: mutateAsyncPostBelongCode, isPending: isLoadingPostBelongCode } =
    usePostBelongCode({
      onError: () => {},
    });

  const handlePostBelongCode = async () => {
    const belongCodeData = {
      belongCode: 1, // 所属コードの値
      name: "鈴鹿高専", // 所属先の名称
    };
    try {
      await mutateAsyncPostBelongCode(belongCodeData);
      Alert.alert("投稿成功", "所属先が正常に投稿されました");
    } catch (error) {
      Alert.alert("エラー", "所属先の投稿に失敗しました");
    }
  };

  return (
    <Center flex={1}>
      <VStack>
        {/* サインアウトボタン */}
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

        {/* 所属先を投稿するボタン */}
        <Pressable
          onPress={() =>
            Alert.alert("所属先を投稿", "所属先「鈴鹿高専」を投稿します", [
              {
                text: "キャンセル",
                style: "cancel",
              },
              {
                text: "投稿",
                onPress: () => handlePostBelongCode(),
              },
            ])
          }
          _pressed={{
            opacity: 0.5,
          }}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <HStack p="2" space="2" alignItems="center" rounded="md">
              <Icon as={<Feather />} name="send" size="md" color={iconColor} />
              <Text fontSize="md">所属先を投稿</Text>
            </HStack>
            <Icon
              as={<Feather />}
              name="chevron-right"
              size="md"
              color={iconColor}
            />
          </HStack>
        </Pressable>
      </VStack>
    </Center>
  );
};

export default SettingScreen;
