import React, { useCallback, useEffect, useState } from "react";

import EditProfileTemplate from "../components/templates/EditProfileTemplate";
import { useDeleteProfile, useUpdateProfile } from "../hooks/profile/mutate";
import { useQueryProfile } from "../hooks/profile/query";
import { HomeStackParamList, HomeStackScreenProps } from "../types";
import useAlert from "../hooks/utils/useAlert";
import { useRoute, RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUpdateBelong } from "../hooks/belong/mutate";
import { useQueryBelongs } from "../hooks/belong/query";

const EditProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"EditProfile">) => {
  const { showAlert } = useAlert();

  const [belongNames, setBelongNames] = useState<string[]>([]);

  const { params } = useRoute<RouteProp<HomeStackParamList, "EditProfile">>();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQueryProfile(params?.profileId);

  const {
    data: belongs,
    isLoading: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongs(params?.profileId);

  useEffect(() => {
    refetchProfile();
    refetchBelongs();
  }, []);

  useEffect(() => {
    if (belongs) {
      setBelongNames(belongs.map((item) => item.name));
    }
  }, [belongs]);

  const {
    mutateAsync: mutateAsyncUpdateBelong,
    isPending: isLoadingUpdateBelong,
  } = useUpdateBelong({
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const {
    mutateAsync: mutateAsyncUpdateProfile,
    isPending: isLoadingUpdateProfile,
  } = useUpdateProfile({
    onSuccess: async (data) => {
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
      if (!params) return;

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
      belongNames={belongNames}
      setBelongNames={setBelongNames}
      profile={profile}
      updateProfile={updateProfile}
      deleteProfile={deleteProfile}
      isLoading={isLoadingProfile || isLoadingBelongs}
      isLoadingUpdateProfile={isLoadingUpdateProfile}
      isLoadingDeleteProfile={isLoadingDeleteProfile}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default EditProfileScreen;
