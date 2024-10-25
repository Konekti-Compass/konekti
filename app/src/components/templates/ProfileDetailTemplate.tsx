import React from "react";

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
  Center,
  ScrollView,
  Skeleton,
} from "native-base";

import { GetBelongsByProfileIdResponse } from "../../hooks/belong/query";
import { GetProfileByProfileIdResponse } from "../../hooks/profile/query";
import Avatar from "../molecules/Avatar";
import Overlay from "../molecules/Overlay";

type ProfileDetailTemplateProps = {
  profile: GetProfileByProfileIdResponse | undefined;
  belongs: GetBelongsByProfileIdResponse | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  goBackNavigationHandler: () => void;
};

const ProfileDetailTemplate = ({
  profile,
  belongs,
  isLoading,
  goBackNavigationHandler,
}: ProfileDetailTemplateProps) => {
  const iconColor = useColorModeValue("muted.600", "muted.100");

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <Overlay isOpen={isLoading} />
      <HStack mb="4" px="2" alignItems="center" justifyContent="space-between">
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
        <Heading>プロフィール編集</Heading>
        <IconButton
          onPress={goBackNavigationHandler}
          icon={<Icon as={<Feather name="x" />} size="xl" color={iconColor} />}
          variant="unstyled"
        />
      </HStack>
      <Box w="80%" h="400px" px="1" py="5" rounded="3xl" bg="muted.100">
        {isLoading || profile ? (
          <ScrollView px="5">
            <HStack w="100%" alignItems="center" justifyContent="space-between">
              {isLoading ? (
                <Skeleton w="24" h="6" rounded="full" />
              ) : (
                <Text h="6" bold fontSize="lg">
                  {profile?.name ?? "11"}
                </Text>
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
    </Box>
  );
};

export default ProfileDetailTemplate;
