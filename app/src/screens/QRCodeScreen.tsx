import React, { useCallback, useEffect } from "react";

import { Camera } from "expo-camera";

import useAlert from "../hooks/utils/useAlert";

import { HomeStackScreenProps } from "../types";
import QRCodeTemplate from "../components/templates/QRCodeTemplate";

const QRCodeScreen = ({ navigation }: HomeStackScreenProps<"QRCode">) => {
  const { showAlert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.getCameraPermissionsAsync();
        if (status !== "granted") {
          showAlert({ status: "error", text: "カメラを許可してください" });
        }
      } catch (error) {
        showAlert({ status: "error", text: "エラーが発生しました" });
      }
    })();
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return <QRCodeTemplate goBackNavigationHandler={goBackNavigationHandler} />;
};

export default QRCodeScreen;
