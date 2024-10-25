import React, { Dispatch, SetStateAction } from "react";
import { RefreshControl } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  Center,
  FlatList,
  Heading,
  Icon,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";

import { GetBelongsByProfileIdResponse } from "../../hooks/belong/query";
import { GetProfilesByUserIdResponse } from "../../hooks/profile/query";
import Fab from "../molecules/Fab";
import GroupListItem from "../organisms/GroupListItem";
import SkeletonGroupList from "../organisms/SkeletonGroupList";

type GroupListTemplateProps = {
  profileId: number;
  setProfileId: Dispatch<SetStateAction<number>>;
  profiles: GetProfilesByUserIdResponse | undefined;
  belongs: GetBelongsByProfileIdResponse | undefined;
  deleteBelong: (belongId: string) => Promise<void>;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  postProfileNavigationHandler: () => void;
  profileListNavigationHandler: (code: number) => void;
};

const GroupListTemplate = ({
  profileId,
  setProfileId,
  profiles,
  belongs,
  deleteBelong,
  refetch,
  isLoading,
  isRefetching,
  postProfileNavigationHandler,
  profileListNavigationHandler,
}: GroupListTemplateProps) => {
  const spinnerColor = useColorModeValue("#a3a3a3", "white");
  const bgColor = useColorModeValue("muted.200", "muted.700");
  const textColor = useColorModeValue("muted.600", "muted.300");

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <Heading w="80%" mt="2">
        グループ
      </Heading>
      <Box mt="6" w="80%" h="12" alignItems="center">
        <FlatList
          w="100%"
          horizontal
          data={profiles}
          renderItem={({ item }) => (
            <Pressable mr="2" onPress={() => setProfileId(item.profileId)}>
              <Center
                px="10px"
                py="6px"
                rounded="full"
                bg={item.profileId === profileId ? "brand.600" : bgColor}
              >
                <Text
                  bold
                  color={item.profileId === profileId ? "white" : textColor}
                >
                  {item.name}
                </Text>
              </Center>
            </Pressable>
          )}
          keyExtractor={(item) => item.profileId.toString()}
        />
      </Box>
      {isLoading ? (
        <SkeletonGroupList rows={5} />
      ) : (
        <FlatList
          w="100%"
          contentContainerStyle={{ paddingBottom: 120 }}
          data={belongs}
          renderItem={({ item }) => (
            <GroupListItem
              item={item}
              onPress={() => {
                if (item.code) {
                  profileListNavigationHandler(item.code);
                }
              }}
              onPressRight={() => deleteBelong(item.belongId)}
            />
          )}
          ListEmptyComponent={
            <Box mt="6" alignItems="center">
              <Text bold fontSize="md">
                参加しているグループがありません。
              </Text>
              <Text mt="2" bold fontSize="md">
                右下のボタンから参加しましょう。
              </Text>
            </Box>
          }
          refreshing={isRefetching}
          onRefresh={refetch}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={spinnerColor}
            />
          }
          keyExtractor={(item) => item?.belongId.toString()}
        />
      )}
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

export default GroupListTemplate;
