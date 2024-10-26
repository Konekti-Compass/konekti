import React, { useCallback, useEffect, useState } from "react";

import { useRoute, RouteProp } from "@react-navigation/native";

import ProfileDetailTemplate from "../components/templates/ProfileDetailTemplate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";
import { useDeleteFriend, usePostFriend } from "../hooks/friend/mutate";
import {
  useQueryFriendBySenderIdAndReceiverId,
  useQueryFriendsByProfileId,
} from "../hooks/friend/query";
import { useQueryProfileByProfileId } from "../hooks/profile/query";
import useAlert from "../hooks/utils/useAlert";
import useProfileId from "../hooks/utils/useProfileId";
import { RootStackParamList, RootStackScreenProps } from "../types";

const ProfileDetailScreen = ({ navigation }: RootStackScreenProps) => {
  const [isRefetching, setIsRefetching] = useState(false);
  const { params } = useRoute<RouteProp<RootStackParamList, "ProfileDetail">>();

  const { showAlert } = useAlert();
  const { profileId } = useProfileId();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQueryProfileByProfileId(params?.profileId);

  const {
    data: belongs,
    isLoading: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongsByProfileId(params.profileId);

  const {
    data: frined,
    isLoading: isLoadingFriend,
    refetch: refetchFriend,
  } = useQueryFriendBySenderIdAndReceiverId(profileId, params.profileId);

  const { refetch: refetchFriends } = useQueryFriendsByProfileId(profileId);

  useEffect(() => {
    refetchProfile();
    refetchBelongs();
    refetchFriend();
  }, []);

  const { mutateAsync: mutateAsyncPostFriend, isPending: isLoadingPostFriend } =
    usePostFriend({
      onSuccess: async () => {
        await refetchFriends();
        showAlert({ status: "success", text: "フレンドを追加しました" });
        navigation.goBack();
      },
      onError: () => {
        showAlert({ status: "error", text: "エラーが発生しました" });
      },
    });

  const {
    mutateAsync: mutateAsyncDeleteFriend,
    isPending: isLoadingDeleteFriend,
  } = useDeleteFriend({
    onSuccess: async () => {
      await refetchFriends();
      showAlert({ status: "success", text: "フレンドを削除しました" });
      navigation.goBack();
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await refetchProfile();
    await refetchBelongs();
    await refetchFriend();
    setIsRefetching(false);
  }, []);

  const postFriend = useCallback(async () => {
    if (profileId !== -1 && params && profileId !== params.profileId) {
      await mutateAsyncPostFriend({
        senderId: profileId,
        receiverId: params.profileId,
        mutual: false,
      });
    }
  }, [profileId, params]);

  const deleteFriend = useCallback(async () => {
    if (frined) {
      await mutateAsyncDeleteFriend(frined.friendId);
    }
  }, [frined]);

  const blockFriend = useCallback(async () => {}, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <ProfileDetailTemplate
      profile={profile}
      belongs={belongs}
      friend={frined}
      refetch={refetch}
      isLoading={isLoadingProfile || isLoadingBelongs || isLoadingFriend}
      isLoadingPostFriend={isLoadingPostFriend}
      isLoadingDeleteFriend={isLoadingDeleteFriend}
      isLoadingBlockFriend={false}
      isRefetching={isRefetching}
      postFriend={postFriend}
      goBackNavigationHandler={goBackNavigationHandler}
      deleteFriend={deleteFriend}
      blockFriend={blockFriend}
    />
  );
};

export default ProfileDetailScreen;
