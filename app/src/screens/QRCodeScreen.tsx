import React, { useCallback, useEffect } from "react";

import { Camera } from "expo-camera";

import QRCodeTemplate from "../components/templates/QRCodeTemplate";
import useAlert from "../hooks/utils/useAlert";
import { HomeStackScreenProps } from "../types";

const QRCodeScreen = ({ navigation }: HomeStackScreenProps<"QRCode">) => {
  const { showAlert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.getCameraPermissionsAsync();
        if (status !== "granted") {
          showAlert({ status: "error", text: "カメラを許可してください" });
        }
      } catch {
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
