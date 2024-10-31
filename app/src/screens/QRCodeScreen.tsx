import React, { useCallback, useEffect } from "react";

import { Camera } from "expo-camera";

import QRCodeTemplate from "../components/templates/QRCodeTemplate";
import { useSearchProfileByProfileId } from "../hooks/profile/mutate";
import useAlert from "../hooks/utils/useAlert";
import useProfileId from "../hooks/utils/useProfileId";
import { HomeStackScreenProps } from "../types";

const QRCodeScreen = ({ navigation }: HomeStackScreenProps<"QRCode">) => {
  const { showAlert } = useAlert();
  const { profileId } = useProfileId();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.getCameraPermissionsAsync();
        if (status !== "granted") {
          const { status } = await Camera.requestCameraPermissionsAsync();
          if (status !== "granted") {
            showAlert({ status: "error", text: "カメラを許可してください" });
            navigation.goBack();
          }
        }
      } catch {
        showAlert({ status: "error", text: "エラーが発生しました" });
        navigation.goBack();
      }
    })();
  }, []);

  const {
    mutateAsync: mutateAsyncSearchProfileByProfileId,
    isPending: isLoadingSearchProfileByProfileId,
  } = useSearchProfileByProfileId({
    onSuccess: async (data) => {
      if (data) {
        navigation.navigate("ProfileDetail", { profileId: data.profileId });
      }
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const searchProfileByProfileId = useCallback(async (profileId: number) => {
    await mutateAsyncSearchProfileByProfileId(profileId);
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <QRCodeTemplate
      profileId={profileId}
      isLoadingSearchProfileByProfileId={isLoadingSearchProfileByProfileId}
      searchProfileByProfileId={searchProfileByProfileId}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default QRCodeScreen;
