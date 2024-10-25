import React, { memo } from "react";

import {
  Divider,
  HStack,
  Pressable,
  Text,
  Center,
  VStack,
  useColorModeValue,
} from "native-base";
import { Swipeable, TouchableHighlight } from "react-native-gesture-handler";

import { GetBelongsByProfileIdResponse } from "../../hooks/belong/query";
import Avatar from "../molecules/Avatar";

type GroupListItemProps = {
  item: GetBelongsByProfileIdResponse[number];
  onPress: () => void;
  onPressRight: () => void;
};

const GroupListItem = memo(
  ({ item, onPressRight, onPress }: GroupListItemProps) => {
    const bgColor = useColorModeValue("white", "#171717");
    const pressedColor = useColorModeValue("#f5f5f5", "#262626");
    const textColor = useColorModeValue("muted.600", "muted.300");

    return (
      <Swipeable
        renderRightActions={() => (
          <Pressable
            onPress={onPressRight}
            _pressed={{
              opacity: 0.5,
            }}
          >
            <Center h="100%" w="24" bg="red.500">
              <Text color="white" bold fontSize="md">
                削除
              </Text>
            </Center>
          </Pressable>
        )}
      >
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
                text={item.belongCode?.name.charAt(0)}
                uri={item.belongCode?.imageUrl}
                color={item.belongCode?.color}
                updatedAt={item.updatedAt}
              />
              <VStack space="1">
                <Text bold fontSize="md">
                  {item.belongCode?.name}
                </Text>
                <Text
                  color={textColor}
                  fontSize="xs"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.belongCode?.description ?? "説明がありません。"}
                </Text>
              </VStack>
            </HStack>
            <Divider w="80%" bg="muted.200" />
          </VStack>
        </TouchableHighlight>
      </Swipeable>
    );
  }
);

export default GroupListItem;
