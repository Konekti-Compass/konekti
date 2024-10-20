import React, { useCallback, useEffect } from "react";

import EditProfileTemplate from "../components/templates/EditProfileTemplate";
import { useDeleteProfile, useUpdateProfile } from "../hooks/profile/mutate";
import { useQueryProfile } from "../hooks/profile/query";
import { HomeStackParamList, HomeStackScreenProps } from "../types";
import useAlert from "../hooks/utils/useAlert";
import { useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"EditProfile">) => {
  const { showAlert } = useAlert();

  const { params } = useRoute<RouteProp<HomeStackParamList, "EditProfile">>();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQueryProfile(params?.profileId);

  useEffect(() => {
    refetchProfile();
  }, []);

  const {
    mutateAsync: mutateAsyncUpdateProfile,
    isPending: isLoadingUpdateProfile,
  } = useUpdateProfile({
    onSuccess: () => {
      showAlert({ status: "success", text: "保存しました" });
      navigation.goBack();
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const {
    mutateAsync: mutateAsyncDeleteProfile,
    isPending: isLoadingDeleteProfile,
  } = useDeleteProfile({
    onSuccess: async () => {
      await AsyncStorage.removeItem("@profileId");
      showAlert({ status: "success", text: "削除しました" });
      navigation.navigate("Home", { profileId: -1 });
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const updateProfile = useCallback(
    async ({
      name,
      displayName,
      hobby,
      talent,
      introduction,
    }: {
      name: string;
      displayName: string;
      hobby: string;
      talent: string;
      introduction: string;
    }) => {
      await mutateAsyncUpdateProfile({
        profileId: params.profileId,
        name,
        displayName,
        hobby,
        talent,
        introduction,
      });
    },
    [params]
  );

  const deleteProfile = useCallback(async () => {
    await mutateAsyncDeleteProfile(params.profileId);
  }, [params]);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <EditProfileTemplate
      profile={profile}
      updateProfile={updateProfile}
      deleteProfile={deleteProfile}
      isLoading={isLoadingProfile}
      isLoadingUpdateProfile={isLoadingUpdateProfile}
      isLoadingDeleteProfile={isLoadingDeleteProfile}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default EditProfileScreen;
