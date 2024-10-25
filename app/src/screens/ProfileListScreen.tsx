import React, { useCallback, useRef, useState } from "react";

import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

import ProfileListTemplate from "../components/templates/ProfileListTemplate";
import { useQueryBelongsByCode } from "../hooks/belong/query";
import { GroupStackParamList, GroupStackScreenProps } from "../types";

const ProfileListScreen = ({
  navigation,
}: GroupStackScreenProps<"ProfileList">) => {
  const focusRef = useRef(true);

  const { params } = useRoute<RouteProp<GroupStackParamList, "ProfileList">>();

  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data: belongs,
    isPending: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongsByCode(params?.code);

  useFocusEffect(
    useCallback(() => {
      if (focusRef.current) {
        focusRef.current = false;
        return;
      }

      refetchBelongs();
    }, [])
  );

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await refetchBelongs();
    setIsRefetching(false);
  }, []);

  const profileDetailNavigationHandler = (profileId: number) => {
    // navigation.navigate("ProfileDetail", { profileId });
  };

  const searchProfileNavigationHandler = () => {
    // navigation.navigate("SearchProfile");
  };

  const goBackNavigationHandler = () => {
    navigation.goBack();
  };

  return (
    <ProfileListTemplate
      belongs={belongs}
      refetch={refetch}
      isLoading={isLoadingBelongs}
      isRefetching={isRefetching}
      profileDetailNavigationHandler={profileDetailNavigationHandler}
      searchProfileNavigationHandler={searchProfileNavigationHandler}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default ProfileListScreen;
