import React from "react";
import { Alert, RefreshControl } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  VStack,
  Heading,
  Text,
  HStack,
  IconButton,
  Icon,
  useColorModeValue,
  ScrollView,
  Skeleton,
  Button,
} from "native-base";

import { GetBelongsByProfileIdResponse } from "../../hooks/belong/query";
import { GetFriendBySenderIdAndReceiverIdResponse } from "../../hooks/friend/query";
import { GetProfileByProfileIdResponse } from "../../hooks/profile/query";
import Avatar from "../molecules/Avatar";

type ProfileDetailTemplateProps = {
  profile: GetProfileByProfileIdResponse | undefined;
  belongs: GetBelongsByProfileIdResponse | undefined;
  friend: GetFriendBySenderIdAndReceiverIdResponse | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isLoadingPostFriend: boolean;
  isLoadingDeleteFriend: boolean;
  isLoadingBlockFriend: boolean;
  isRefetching: boolean;
  postFriend: () => Promise<void>;
  deleteFriend: () => Promise<void>;
  blockFriend: () => Promise<void>;
  goBackNavigationHandler: () => void;
};

const ProfileDetailTemplate = ({
  profile,
  belongs,
  friend,
  refetch,
  isLoading,
  isLoadingPostFriend,
  isLoadingDeleteFriend,
  isLoadingBlockFriend,
  isRefetching,
  postFriend,
  deleteFriend,
  blockFriend,
  goBackNavigationHandler,
}: ProfileDetailTemplateProps) => {
  const iconColor = useColorModeValue("muted.600", "muted.100");
  const spinnerColor = useColorModeValue("#a3a3a3", "white");

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <HStack
        w="100%"
        mb="4"
        px="4"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          onPress={goBackNavigationHandler}
          icon={
            <Icon
              as={<Feather name="chevron-left" />}
              size="2xl"
              color={iconColor}
            />
          }
          variant="unstyled"
        />
        <Heading>プロフィール</Heading>
        <IconButton
          onPress={goBackNavigationHandler}
          icon={<Icon as={<Feather name="x" />} size="xl" color={iconColor} />}
          variant="unstyled"
        />
      </HStack>
      <ScrollView
        w="100%"
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={spinnerColor}
          />
        }
      >
        <Box w="80%" h="400px" px="1" py="5" rounded="3xl" bg="muted.100">
          <ScrollView px="5">
            <HStack w="100%" mt="2" alignItems="flex-start" space="2">
              <Box w="25%">
                <Avatar
                  text={profile?.displayName.charAt(0)}
                  uri={profile?.avatarUrl}
                  color={profile?.color}
                  size="16"
                  fontSize="3xl"
                  isLoading={isLoading}
                  updatedAt={profile?.updatedAt}
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
        </Box>
        <VStack w="80%" mt="12" space="6">
          <Button
            size="lg"
            rounded="xl"
            colorScheme="brand"
            isLoading={isLoadingPostFriend || isLoadingDeleteFriend}
            onPress={() => (friend ? deleteFriend() : postFriend())}
          >
            <Text bold color="white" fontSize="md">
              {friend ? "削除する" : "追加する"}
            </Text>
          </Button>
          <Button
            size="lg"
            rounded="xl"
            colorScheme="brand"
            variant="outline"
            borderColor="brand.600"
            isLoading={isLoadingBlockFriend}
            onPress={() =>
              Alert.alert("ブロック", "ブロックしてもよろしいですか", [
                {
                  text: "キャンセル",
                  style: "cancel",
                },
                {
                  text: "ブロック",
                  style: "destructive",
                  onPress: () => blockFriend(),
                },
              ])
            }
          >
            <Text bold color="brand.600" fontSize="md">
              ブロックする
            </Text>
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default ProfileDetailTemplate;
