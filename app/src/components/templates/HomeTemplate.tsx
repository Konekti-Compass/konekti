import React from "react";

import {
  Box,
  Heading,
  Icon,
  Text,
  VStack,
  useDisclose,
} from "native-base";

import { GetUserResponse } from "../../hooks/user/query";
import Avatar from "../molecules/Avatar";
import ImageActionSheet from "../organisms/ImageActionSheet";
import Fab from "../molecules/Fab";
import { Feather } from "@expo/vector-icons"

type SettingTemplateProps = {
  user: GetUserResponse | undefined;
  refetch: () => Promise<void>;
  pickImageByCamera: () => Promise<void>;
  pickImageByLibrary: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  isLoadingAvatar: boolean;
  deleteAvatar: () => Promise<void>;
  editProfileNavigationHandler: () => void
};

const HomeTemplate = ({
  user,
  refetch,
  pickImageByCamera,
  pickImageByLibrary,
  isLoading,
  isRefetching,
  isLoadingAvatar,
  deleteAvatar,
  editProfileNavigationHandler
}: SettingTemplateProps) => {
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
        <VStack alignItems="flex-start">
          <Text bold fontSize="sm" color="muted.400">
            趣味
          </Text>
          <Text bold fontSize="md">
            {user?.hobby ?? "趣味がありません。"}
          </Text>
        </VStack>
        <VStack alignItems="flex-start">
          <Text bold fontSize="sm" color="muted.400">
            特技
          </Text>
          <Text bold fontSize="md">
            {user?.talent ?? "特技がありません。"}
          </Text>
        </VStack>
        <VStack alignItems="flex-start">
          <Text bold fontSize="sm" color="muted.400">
            自己紹介
          </Text>
          <Text bold fontSize="md">
            {user?.profile ?? "自己紹介がありません。"}
          </Text>
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
