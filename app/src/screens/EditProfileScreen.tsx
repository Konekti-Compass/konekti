import React, { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, RouteProp } from "@react-navigation/native";

import EditProfileTemplate from "../components/templates/EditProfileTemplate";
import { useQueryBelongsByProfileId } from "../hooks/belong/query";
import { useDeleteProfile, useUpdateProfile } from "../hooks/profile/mutate";
import { useQueryProfileByProfileId } from "../hooks/profile/query";
import useAlert from "../hooks/utils/useAlert";
import { HomeStackParamList, HomeStackScreenProps } from "../types";

const EditProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"EditProfile">) => {
  const [tags, setTags] = useState<string[]>([]);
  const { params } = useRoute<RouteProp<HomeStackParamList, "EditProfile">>();

  const { showAlert } = useAlert();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQueryProfileByProfileId(params?.profileId);

  const {
    data: belongs,
    isLoading: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongsByProfileId(params?.profileId);

  useEffect(() => {
    refetchProfile();
    refetchBelongs();
  }, []);

  useEffect(() => {
    if (belongs) {
      setTags(belongs.map((item) => item.belongCode?.name || ""));
    }
  }, [belongs]);

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
      if (params) {
        await mutateAsyncUpdateProfile({
          profileId: params.profileId,
          name,
          displayName,
          hobby,
          talent,
          introduction,
        });
      }
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
      tags={tags}
      setTags={setTags}
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
