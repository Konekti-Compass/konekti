import React from "react";
import { RefreshControl } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";

import { GetFriendsByProfileIdResponse } from "../../hooks/friend/query";
import SearchBar from "../molecules/SearchBar";
import FriendListItem from "../organisms/FriendListItem";
import SkeletonGroupList from "../organisms/SkeletonGroupList";

type FriendListTemplateProps = {
  friends: GetFriendsByProfileIdResponse | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  profileDetailNavigationHandler: (
    senderId: number,
    receiverId: number
  ) => void;
  searchFriendNavigationHandler: () => void;
  goBackNavigationHandler: () => void;
};

const FriendListTemplate = ({
  friends,
  refetch,
  isLoading,
  isRefetching,
  profileDetailNavigationHandler,
  searchFriendNavigationHandler,
  goBackNavigationHandler,
}: FriendListTemplateProps) => {
  const spinnerColor = useColorModeValue("#a3a3a3", "white");
  const iconColor = useColorModeValue("muted.600", "muted.100");

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <HStack
        w="90%"
        mt="2"
        mb="4"
        alignItems="center"
        justifyContent="space-between"
      >
        <IconButton
          p="0"
          onPress={goBackNavigationHandler}
          icon={
            <Icon
              as={<Feather />}
              name="chevron-left"
              size="2xl"
              color={iconColor}
            />
          }
          variant="unstyled"
        />
        <Pressable w="75%" onPress={searchFriendNavigationHandler}>
          <SearchBar
            isReadOnly
            placeholder="フレンドを検索"
            onPressIn={searchFriendNavigationHandler}
          />
        </Pressable>
        <IconButton
          px="1"
          py="0"
          icon={
            <Icon as={<Feather />} name="sliders" size="lg" color={iconColor} />
          }
          variant="unstyled"
        />
      </HStack>
      {isLoading ? (
        <SkeletonGroupList rows={5} />
      ) : (
        <FlatList
          w="100%"
          contentContainerStyle={{ paddingBottom: 120 }}
          data={friends}
          renderItem={({ item }) => (
            <FriendListItem
              item={item}
              onPress={() => {
                profileDetailNavigationHandler(item.senderId, item.receiverId);
              }}
            />
          )}
          ListEmptyComponent={
            <Box mt="6" alignItems="center">
              <Text bold fontSize="md">
                フレンドになっているユーザーはいません
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
          keyExtractor={(item) => item?.friendId.toString()}
        />
      )}
    </Box>
  );
};

export default FriendListTemplate;
