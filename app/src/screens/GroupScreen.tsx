import React, { useCallback, useRef, useState } from "react";
import useProfileId from "../hooks/utils/useProfileId";
import GroupTemplate from "../components/templates/GroupTemplate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";

import { useDeleteBelong } from "../hooks/belong/mutate";
import { useFocusEffect } from "@react-navigation/native";
import useAlert from "../hooks/utils/useAlert";
import { GroupStackScreenProps } from "../types";

const GroupScreen = ({ navigation }: GroupStackScreenProps<"Group">) => {
  const { showAlert } = useAlert();

  const focusRef = useRef(true);

  const [isRefetching, setIsRefetching] = useState(false);

  const { profileId } = useProfileId();

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

  return (
    <GroupTemplate
      belongs={belongs}
      deleteBelong={deleteBelong}
      refetch={refetch}
      isLoading={isLoadingBelongs}
      isRefetching={isRefetching}
      postProfileNavigationHandler={postProfileNavigationHandler}
      profileListNavigationHandler={profileListNavigationHandler}
    />
  );
};

export default GroupScreen;
