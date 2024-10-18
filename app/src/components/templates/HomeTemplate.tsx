import React from "react";

import {
  Box,
  Divider,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
  useColorModeValue,
  useDisclose,
} from "native-base";

import { GetUserResponse } from "../../hooks/user/query";
import Avatar from "../molecules/Avatar";
import ImageActionSheet from "../organisms/ImageActionSheet";
import Fab from "../molecules/Fab";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";

type SettingTemplateProps = {
  user: GetUserResponse | undefined;
  refetch: () => Promise<void>;
  pickImageByCamera: () => Promise<void>;
  pickImageByLibrary: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  isLoadingAvatar: boolean;
  deleteAvatar: () => Promise<void>;
  signOut: () => Promise<void>;
  editProfileNavigationHandler: () => void;
  friendListNavigationHandler: () => void;
  qrCodeNavigationHandler: () => void;
};

const HomeTemplate = ({
  user,
  pickImageByCamera,
  pickImageByLibrary,
  isLoadingAvatar,
  deleteAvatar,
  signOut,
  editProfileNavigationHandler,
  friendListNavigationHandler,
  qrCodeNavigationHandler,
}: SettingTemplateProps) => {
  const iconColor = useColorModeValue("muted.500", "muted.100");

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <ImageActionSheet
        isOpen={isOpen}
        onClose={onClose}
        onDelete={deleteAvatar}
        pickImageByCamera={pickImageByCamera}
        pickImageByLibrary={pickImageByLibrary}
      />
      <VStack w="100%" alignItems="center" space="1">
        <VStack mt="6" alignItems="center" space="4">
          <Avatar
            text={user?.name?.charAt(0)}
            uri={user?.avatarUrl}
            color={user?.color}
            isLoading={isLoadingAvatar}
            size="24"
            fontSize="3xl"
            updatedAt={user?.updatedAt}
            onPress={onOpen}
          />
          <Heading fontSize="xl">{user?.name}</Heading>
        </VStack>
        <VStack w="80%" mt="6" space="5">
          <VStack alignItems="flex-start">
            <Text bold fontSize="sm" color="muted.400">
              所属
            </Text>
            <Text bold fontSize="md">
              {user?.belong ?? "所属がありません。"}
            </Text>
          </VStack>
          <HStack w="100%">
            <VStack w="50%" alignItems="flex-start">
              <Text bold fontSize="sm" color="muted.400">
                趣味
              </Text>
              <Text bold fontSize="md">
                {user?.hobby ?? "趣味がありません。"}
              </Text>
            </VStack>
            <VStack w="50%" alignItems="flex-start">
              <Text bold fontSize="sm" color="muted.400">
                特技
              </Text>
              <Text bold fontSize="md">
                {user?.talent ?? "特技がありません。"}
              </Text>
            </VStack>
          </HStack>
          <VStack alignItems="flex-start">
            <Text bold fontSize="sm" color="muted.400">
              自己紹介
            </Text>
            <Text bold fontSize="md">
              {user?.profile ?? "自己紹介がありません。"}
            </Text>
          </VStack>
        </VStack>
        <Divider w="80%" mt="6" bg="muted.300" />
        <VStack w="80%" mt="6" space="4">
          <Pressable onPress={friendListNavigationHandler}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack p="2" space="2" alignItems="center" rounded="md">
                <Icon
                  as={<Feather />}
                  name="list"
                  size="md"
                  color={iconColor}
                />
                <Text fontSize="md">フレンド一覧</Text>
              </HStack>
              <Icon
                as={<Feather />}
                name="chevron-right"
                size="md"
                color={iconColor}
              />
            </HStack>
          </Pressable>
          <Pressable onPress={qrCodeNavigationHandler}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack p="2" space="2" alignItems="center" rounded="md">
                <Icon
                  as={<Feather />}
                  name="camera"
                  size="md"
                  color={iconColor}
                />
                <HStack space="1">
                  <Text fontSize="md">QRコード表示</Text>
                  <Text fontSize="md">/</Text>
                  <Text fontSize="md">読み取り</Text>
                </HStack>
              </HStack>
              <Icon
                as={<Feather />}
                name="chevron-right"
                size="md"
                color={iconColor}
              />
            </HStack>
          </Pressable>
          <Pressable
            onPress={() =>
              Alert.alert("サインアウト", "サインアウトしてもよろしいですか", [
                {
                  text: "キャンセル",
                  style: "cancel",
                },
                {
                  text: "サインアウト",
                  onPress: () => signOut(),
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
                <Icon
                  as={<Feather />}
                  name="log-out"
                  size="md"
                  color={iconColor}
                />
                <Text fontSize="md">ログアウト</Text>
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
      </VStack>
      <Fab
        position="absolute"
        bottom="24"
        right="6"
        onPress={editProfileNavigationHandler}
      >
        <Icon as={<Feather name="edit" />} size="xl" color="white" />
      </Fab>
    </Box>
  );
};

export default HomeTemplate;
