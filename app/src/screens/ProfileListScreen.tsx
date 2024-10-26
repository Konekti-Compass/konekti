import React, { useCallback, useRef, useState, useMemo } from "react";

import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

import ProfileListTemplate from "../components/templates/ProfileListTemplate";
import { useQueryBelongsByCode } from "../hooks/belong/query";
import useAuth from "../hooks/utils/useAuth";
import { GroupStackParamList, GroupStackScreenProps } from "../types";

const ProfileListScreen = ({
  navigation,
}: GroupStackScreenProps<"ProfileList">) => {
  const focusRef = useRef(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const { params } = useRoute<RouteProp<GroupStackParamList, "ProfileList">>();

  const { session } = useAuth();

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
    navigation.navigate("ProfileDetail", { profileId });
  };

  const searchProfileNavigationHandler = useCallback(() => {
    // navigation.navigate("SearchProfile");
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <ProfileListTemplate
      belongs={useMemo(
        () =>
          belongs?.filter(
            (item) => item.profile?.authorId !== session?.user.id
          ),
        [belongs, session]
      )}
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
