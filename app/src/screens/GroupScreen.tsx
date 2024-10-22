import React, { useCallback, useRef, useState } from "react";
import useProfileId from "../hooks/utils/useProfileId";
import GroupTemplate from "../components/templates/GroupTemplate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";

import { useDeleteBelong } from "../hooks/belong/mutate";
import { useFocusEffect } from "@react-navigation/native";
import useAlert from "../hooks/utils/useAlert";
import { GroupStackScreenProps } from "../types";
import { useQueryProfilesByUserId } from "../hooks/profile/query";

const GroupScreen = ({ navigation }: GroupStackScreenProps<"Group">) => {
  const { showAlert } = useAlert();

  const focusRef = useRef(true);

  const [isRefetching, setIsRefetching] = useState(false);

  const {
    profileId,
    setProfileId,
    isLoading: isLoadingProfileId,
  } = useProfileId();

  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    refetch: refetchProfiles,
  } = useQueryProfilesByUserId();

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

  const profileListNavigationHandler = useCallback(() => {}, []);

  const getProfile = useCallback(() => {
    const profile = profiles?.find(
      (profile) => profile.profileId === profileId
    );
    if (!profile) {
      if (profiles?.length) {
        setProfileId(profiles[0].profileId);
        return profiles[0];
      }
    }
    return profile;
  }, [profiles, profileId]);

  return (
    <GroupTemplate
      profileId={profileId}
      setProfileId={setProfileId}
      profile={getProfile()}
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

export default GroupScreen;
