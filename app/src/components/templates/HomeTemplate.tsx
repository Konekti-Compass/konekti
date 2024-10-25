import React, { Dispatch, SetStateAction } from "react";
import { Alert, RefreshControl } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useColorModeValue,
  useDisclose,
} from "native-base";

import { GetBelongsByProfileIdResponse } from "../../hooks/belong/query";
import { GetProfilesByUserIdResponse } from "../../hooks/profile/query";
import Avatar from "../molecules/Avatar";
import Fab from "../molecules/Fab";
import Overlay from "../molecules/Overlay";
import ImageActionSheet from "../organisms/ImageActionSheet";
import ProfileActionSheet from "../organisms/ProfileActionSheet";
import SkeletonSetting from "../organisms/SkeletonSetting";

type SettingTemplateProps = {
  profileId: number;
  setProfileId: Dispatch<SetStateAction<number>>;
  profile: GetProfilesByUserIdResponse[number] | undefined;
  profiles: GetProfilesByUserIdResponse | undefined;
  belongs: GetBelongsByProfileIdResponse | undefined;
  refetch: () => Promise<void>;
  pickImageByCamera: () => Promise<void>;
  pickImageByLibrary: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  isLoadingSignOut: boolean;
  isLoadingAvatar: boolean;
  deleteAvatar: () => Promise<void>;
  signOut: () => Promise<void>;
  postProfileNavigationHandler: () => void;
  editProfileNavigationHandler: (profileId: number) => void;
  friendListNavigationHandler: () => void;
  qrCodeNavigationHandler: () => void;
};

const HomeTemplate = ({
  profileId,
  setProfileId,
  profile,
  profiles,
  belongs,
  refetch,
  pickImageByCamera,
  pickImageByLibrary,
  isLoading,
  isRefetching,
  isLoadingSignOut,
  isLoadingAvatar,
  deleteAvatar,
  signOut,
  postProfileNavigationHandler,
  editProfileNavigationHandler,
  friendListNavigationHandler,
  qrCodeNavigationHandler,
}: SettingTemplateProps) => {
  const iconColor = useColorModeValue("muted.500", "muted.100");
  const spinnerColor = useColorModeValue("#a3a3a3", "white");

  const {
    isOpen: isOpenImageActionSheet,
    onOpen: onOpenImageActionSheet,
    onClose: onCloseImageActionSheet,
  } = useDisclose();

  const {
    isOpen: isOpenProfileActionSheet,
    onOpen: onOpenProfileActionSheet,
    onClose: onCloseProfileActionSheet,
  } = useDisclose();

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <Overlay isOpen={isLoadingSignOut} />
      <ImageActionSheet
        isOpen={isOpenImageActionSheet}
        onClose={onCloseImageActionSheet}
        onDelete={deleteAvatar}
        pickImageByCamera={pickImageByCamera}
        pickImageByLibrary={pickImageByLibrary}
      />
      <ProfileActionSheet
        isOpen={isOpenProfileActionSheet}
        onClose={onCloseProfileActionSheet}
        profiles={profiles}
        profileId={profileId}
        setProfileId={setProfileId}
      />
      <Heading mt="2" mb="6" w="80%">
        ホーム
      </Heading>
      <ScrollView
        w="100%"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 180 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={spinnerColor}
          />
        }
      >
        <Box w="80%" h="400px" px="1" py="5" rounded="3xl" bg="muted.100">
          {isLoading || profile ? (
            <ScrollView px="5">
              <HStack
                w="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                {isLoading ? (
                  <Skeleton w="24" h="6" rounded="full" />
                ) : (
                  <Text h="6" bold fontSize="lg">
                    {profile?.name}
                  </Text>
                )}
                {!isLoading && (
                  <Pressable
                    onPress={() => {
                      if (profile) {
                        editProfileNavigationHandler(profile.profileId);
                      }
                    }}
                    _pressed={{ opacity: 0.6 }}
                  >
                    <Icon
                      as={<Feather name="edit" />}
                      size="5"
                      color="muted.700"
                    />
                  </Pressable>
                )}
              </HStack>
              <HStack w="100%" mt="6" alignItems="flex-start" space="2">
                <Box w="25%">
                  <Avatar
                    text={profile?.displayName.charAt(0)}
                    uri={profile?.avatarUrl}
                    color={profile?.color}
                    size="16"
                    fontSize="3xl"
                    isLoading={isLoading || isLoadingAvatar}
                    updatedAt={profile?.updatedAt}
                    onPress={onOpenImageActionSheet}
                  />
                </Box>
                {isLoading ? (
                  <VStack w="75%" space="2">
                    <Skeleton w="24" h="6" rounded="full" />
                    <Skeleton w="40" h="4" rounded="full" />
                  </VStack>
                ) : (
                  <VStack w="75%" space="1">
                    <Text
                      fontSize="xl"
                      bold
                      h="6"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {profile?.displayName}
                    </Text>
                    <HStack flexWrap="wrap" mb="2" space="4px">
                      {belongs?.map((item, index) => (
                        <Box
                          key={index}
                          alignItems="center"
                          mt="6px"
                          px="8px"
                          py="3px"
                          rounded="full"
                          bg="muted.200"
                        >
                          <Text fontWeight="600" fontSize="10px">
                            {item.belongCode?.name}
                          </Text>
                        </Box>
                      ))}
                    </HStack>
                  </VStack>
                )}
              </HStack>
              {isLoading ? (
                <Skeleton.Text mt="6" lines={4} />
              ) : (
                <VStack w="100%" mt="2" space="5" px="1">
                  <VStack alignItems="flex-start">
                    <Text bold fontSize="sm" color="muted.400">
                      趣味
                    </Text>
                    <Text bold fontSize="md">
                      {profile?.hobby}
                    </Text>
                  </VStack>
                  <VStack alignItems="flex-start">
                    <Text bold fontSize="sm" color="muted.400">
                      特技
                    </Text>
                    <Text bold fontSize="md">
                      {profile?.talent}
                    </Text>
                  </VStack>
                  <VStack alignItems="flex-start">
                    <Text bold fontSize="sm" color="muted.400">
                      自己紹介
                    </Text>
                    <Text bold fontSize="md">
                      {profile?.introduction}
                    </Text>
                  </VStack>
                </VStack>
              )}
            </ScrollView>
          ) : (
            <Center flex={1}>
              <VStack w="90%" alignItems="center" space="2">
                <Text bold fontSize="md">
                  プロフィールがありません。
                </Text>
                <Text bold fontSize="md">
                  右下のボタンから作成しましょう。
                </Text>
              </VStack>
            </Center>
          )}
        </Box>
        {isLoading ? (
          <SkeletonSetting rows={3} />
        ) : (
          <VStack w="80%" mt="6" space="3">
            {profile && (
              <Pressable onPress={onOpenProfileActionSheet}>
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack p="2" space="2" alignItems="center" rounded="md">
                    <Text fontSize="md">プロフィール切り替え</Text>
                  </HStack>
                  <Icon
                    as={<Feather />}
                    name="chevron-right"
                    size="md"
                    color={iconColor}
                  />
                </HStack>
              </Pressable>
            )}
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
                Alert.alert("ログアウト", "ログアウトしてもよろしいですか", [
                  {
                    text: "キャンセル",
                    style: "cancel",
                  },
                  {
                    text: "ログアウト",
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
        )}
      </ScrollView>
      <Fab
        position="absolute"
        bottom="24"
        right="6"
        onPress={postProfileNavigationHandler}
      >
        <Icon as={<Feather name="plus" />} size="3xl" color="white" />
      </Fab>
    </Box>
  );
};

export default HomeTemplate;
