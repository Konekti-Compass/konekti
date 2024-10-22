import React from "react";
import { RefreshControl } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  FlatList,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "native-base";

import { GetBelongsByProfileIdResponse } from "../../hooks/belong/query";
import BelongItem from "../organisms/BelongItem";
import Fab from "../molecules/Fab";

type GroupTemplateProps = {
  belongs: GetBelongsByProfileIdResponse | undefined;
  deleteBelong: (belongId: string) => Promise<void>;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  postProfileNavigationHandler: () => void;
  profileListNavigationHandler: (belongId: string) => void;
};

const GroupTemplate = ({
  belongs,
  deleteBelong,
  refetch,
  isLoading,
  isRefetching,
  postProfileNavigationHandler,
  profileListNavigationHandler,
}: GroupTemplateProps) => {
  const spinnerColor = useColorModeValue("#a3a3a3", "white");

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <Heading w="80%" mt="2" mb="6" textAlign="start">
        グループ
      </Heading>
      {isLoading ? (
        <Box />
      ) : (
        <FlatList
          w="100%"
          contentContainerStyle={{ paddingBottom: 40 }}
          data={belongs}
          renderItem={({ item }) => (
            <BelongItem
              item={item}
              onPress={() => {
                profileListNavigationHandler(item.belongId);
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

export default GroupTemplate;
