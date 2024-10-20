import React, { Dispatch, SetStateAction, memo } from "react";

import {
  Actionsheet,
  Text,
  Box,
  useColorModeValue,
  FlatList,
  HStack,
  Center,
  Pressable,
} from "native-base";
import { GetUserProfilesResponse } from "../../hooks/profile/query";

type ProfileActionSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  profiles: GetUserProfilesResponse | undefined;
  profileId: number;
  setProfileId: Dispatch<SetStateAction<number>>;
};

const ProfileActionSheet = memo(
  ({
    isOpen,
    onClose,
    profiles,
    profileId,
    setProfileId,
  }: ProfileActionSheetProps) => {
    const textColor = useColorModeValue("muted.600", "muted.200");

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {profiles?.length && (
            <FlatList
              w="90%"
              h="64"
              data={profiles}
              renderItem={({ item}) => (
                <Pressable
                  py="2"
                  onPress={() => {
                    setProfileId(item.profileId);
                  }}
                >
                  <HStack alignItems="center" space="2">
                    <Center
                      size="5"
                      borderColor={
                        profileId === item.profileId ? "brand.600" : "muted.300"
                      }
                      borderWidth="3px"
                      rounded="full"
                    >
                      <Box
                        size="2.5"
                        rounded="full"
                        bg={profileId === item.profileId ? "brand.600" : "muted.300"}
                      />
                    </Center>
                    <Text bold fontSize="md" color={textColor}>
                      {item.name}
                    </Text>
                  </HStack>
                </Pressable>
              )}
            />
          )}
        </Actionsheet.Content>
      </Actionsheet>
    );
  }
);

export default ProfileActionSheet;
