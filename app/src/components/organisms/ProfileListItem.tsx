import React from "react";

import { VStack, HStack, Divider, Text, useColorModeValue } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";

import { GetBelongsByCodeResponse } from "../../hooks/belong/query";
import Avatar from "../molecules/Avatar";

type ProfileListItemProps = {
  item: GetBelongsByCodeResponse[number];
  onPress: () => void;
};

const ProfileListItem = ({ item, onPress }: ProfileListItemProps) => {
  const bgColor = useColorModeValue("white", "#171717");
  const pressedColor = useColorModeValue("#f5f5f5", "#262626");
  const textColor = useColorModeValue("muted.600", "muted.300");

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        backgroundColor: bgColor,
      }}
      underlayColor={pressedColor}
    >
      <VStack alignItems="center">
        <HStack w="80%" h="24" alignItems="center" space="3">
          <Avatar
            size="md"
            fontSize="2xl"
            disabled
            text={item.profile?.name.charAt(0)}
            uri={item.profile?.avatarUrl}
            color={item.profile?.color}
            updatedAt={item.updatedAt}
          />
          <VStack space="1">
            <Text bold fontSize="md">
              {item.profile?.displayName}
            </Text>
            <Text
              color={textColor}
              fontSize="xs"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.profile?.introduction}
            </Text>
          </VStack>
        </HStack>
        <Divider w="80%" bg="muted.200" />
      </VStack>
    </TouchableHighlight>
  );
};

export default ProfileListItem;
