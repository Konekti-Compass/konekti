import React from "react";
import { RefreshControl } from "react-native";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";

import { GetBelongsByCodeResponse } from "../../hooks/belong/query";
import SkeletonGroupList from "../organisms/SkeletonGroupList";
import SearchBar from "../molecules/SearchBar";
import ProfileListItem from "../organisms/ProfileListItem";

type ProfileListTemplateProps = {
  belongs: GetBelongsByCodeResponse | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isRefetching: boolean;
  profileDetailNavigationHandler: (profileId: number) => void;
  searchProfileNavigationHandler: () => void;
  goBackNavigationHandler: () => void;
};

const ProfileListTemplate = ({
  belongs,
  refetch,
  isLoading,
  isRefetching,
  profileDetailNavigationHandler,
  searchProfileNavigationHandler,
  goBackNavigationHandler,
}: ProfileListTemplateProps) => {
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
        <Pressable w="75%" onPress={searchProfileNavigationHandler}>
          <SearchBar
            isReadOnly
            placeholder="プロフィールを検索"
            onPressIn={searchProfileNavigationHandler}
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
          data={belongs}
          renderItem={({ item }) => (
            <ProfileListItem
              item={item}
              onPress={() => profileDetailNavigationHandler(item.profileId)}
            />
          )}
          ListEmptyComponent={
            <Box mt="6" alignItems="center">
              <Text bold fontSize="md">
                参加しているユーザーはいません
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
    </Box>
  );
};

export default ProfileListTemplate;
