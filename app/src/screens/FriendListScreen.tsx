import React, { useCallback, useRef, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import FrinedListTemplate from "../components/templates/FriendListTemplate";
import { useQueryFriendsByProfileId } from "../hooks/friend/query";
import useProfileId from "../hooks/utils/useProfileId";
import { HomeStackScreenProps } from "../types";

const FriendListScreen = ({
  navigation,
}: HomeStackScreenProps<"FriendList">) => {
  const focusRef = useRef(true);
  const [isRefetching, setIsRefetching] = useState(false);

  const { profileId } = useProfileId();

  const {
    data: friends,
    isLoading: isLoadingFriends,
    refetch: refetchFriends,
  } = useQueryFriendsByProfileId(profileId);

  useFocusEffect(
    useCallback(() => {
      if (focusRef.current) {
        focusRef.current = false;
        return;
      }

      refetchFriends();
    }, [])
  );

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await refetchFriends();
    setIsRefetching(false);
  }, []);

  const profileDetailNavigationHandler = useCallback(
    (senderId: number, receiverId: number) => {
      if (senderId === profileId) {
        navigation.navigate("ProfileDetail", { profileId: receiverId });
      }
      if (receiverId === profileId) {
        navigation.navigate("ProfileDetail", { profileId: senderId });
      }
    },
    []
  );

  const searchProfileNavigationHandler = useCallback(() => {
    // navigation.navigate("SearchProfile");
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <FrinedListTemplate
      friends={friends}
      refetch={refetch}
      isLoading={isLoadingFriends}
      isRefetching={isRefetching}
      profileDetailNavigationHandler={profileDetailNavigationHandler}
      searchFriendNavigationHandler={searchProfileNavigationHandler}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default FriendListScreen;
