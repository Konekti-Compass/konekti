import React, { useCallback, useRef, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import GroupListTemplate from "../components/templates/GroupListTemplate";
import { useDeleteBelong } from "../hooks/belong/mutate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";
import { useQueryProfilesByAuthorId } from "../hooks/profile/query";
import useAlert from "../hooks/utils/useAlert";
import useProfileId from "../hooks/utils/useProfileId";
import { GroupStackScreenProps } from "../types";

const GroupListScreen = ({
  navigation,
}: GroupStackScreenProps<"GroupList">) => {
  const focusRef = useRef(true);
  const [isRefetching, setIsRefetching] = useState(false);

  const { showAlert } = useAlert();

  const {
    profileId,
    setProfileId,
    isLoading: isLoadingProfileId,
  } = useProfileId();

  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    refetch: refetchProfiles,
  } = useQueryProfilesByAuthorId();

  const {
    data: belongs,
    isLoading: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongsByProfileId(profileId);

  useFocusEffect(
    useCallback(() => {
      if (focusRef.current) {
        focusRef.current = false;
        return;
      }

      refetchProfiles();
      refetchBelongs();
    }, [])
  );

  const { mutateAsync: mutateAsyncDeleteBelong } = useDeleteBelong({
    onSuccess: () => {
      showAlert({ status: "success", text: "所属を削除しました" });
      refetch();
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await refetchProfiles();
    await refetchBelongs();
    setIsRefetching(false);
  }, []);

  const deleteBelong = useCallback(async (belongId: string) => {
    await mutateAsyncDeleteBelong(belongId);
  }, []);

  const postProfileNavigationHandler = useCallback(() => {
    navigation.navigate("TabNavigator", {
      screen: "HomeNavigator",
      params: {
        screen: "PostProfile",
      },
    });
  }, []);

  const profileListNavigationHandler = useCallback((code: number) => {
    navigation.navigate("ProfileList", { code });
  }, []);

  return (
    <GroupListTemplate
      profileId={profileId}
      setProfileId={setProfileId}
      profiles={profiles}
      belongs={belongs}
      deleteBelong={deleteBelong}
      refetch={refetch}
      isLoading={isLoadingProfiles || isLoadingProfileId || isLoadingBelongs}
      isRefetching={isRefetching}
      postProfileNavigationHandler={postProfileNavigationHandler}
      profileListNavigationHandler={profileListNavigationHandler}
    />
  );
};

export default GroupListScreen;
