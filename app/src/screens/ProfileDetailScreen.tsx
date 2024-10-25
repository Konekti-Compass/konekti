import React, { useCallback, useRef, useState } from "react";

import { useRoute, RouteProp, useFocusEffect } from "@react-navigation/native";

import ProfileDetailTemplate from "../components/templates/ProfileDetailTemplate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";
import { useQueryProfileByProfileId } from "../hooks/profile/query";
import { RootStackParamList, RootStackScreenProps } from "../types";

const ProfileDetailScreen = ({ navigation }: RootStackScreenProps) => {
  const [isRefetching, setIsRefetching] = useState(false);
  const { params } = useRoute<RouteProp<RootStackParamList, "ProfileDetail">>();

  const focusRef = useRef(true);

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

  useFocusEffect(
    useCallback(() => {
      if (focusRef.current) {
        focusRef.current = false;
        return;
      }

      refetchProfile();
      refetchBelongs();
    }, []),
  );

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await refetchProfile();
    await refetchBelongs();
    setIsRefetching(false);
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <ProfileDetailTemplate
      profile={profile}
      belongs={belongs}
      refetch={refetch}
      isLoading={isLoadingProfile || isLoadingBelongs}
      isRefetching={isRefetching}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default ProfileDetailScreen;
