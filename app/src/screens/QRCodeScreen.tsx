import React, { useEffect } from "react";
import { Box, Link, useDisclose, VStack } from "native-base";
import { Camera, CameraView } from "expo-camera";

import useAlert from "../hooks/sdk/useAlert";
import { useWindowDimensions } from "react-native";
import QRCodeActionSheet from "../components/organisms/QRCodeActionSheet";

const QRCodeScreen = () => {
  const { showAlert } = useAlert();

  const { width } = useWindowDimensions();

  const { isOpen, onOpen, onClose } = useDisclose();

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

  return (
    <Box flex={1}>
      <QRCodeActionSheet value="test" isOpen={isOpen} onClose={onClose} />
      <Box w={`${width}px`} h="540px">
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={({ data }) => {}}
          style={{ width: "100%", height: "100%" }}
        >
          <Box position="relative" flex={1}>
            <Box
              position="absolute"
              top="0px"
              left="0px"
              bottom="0px"
              right={`${width - (width - 320) / 2 - 5}px`}
              bg="black"
              opacity="0.4"
            />
            <Box
              position="absolute"
              top="0px"
              left={`${width - (width - 320) / 2 - 5}px`}
              bottom="0px"
              right="0px"
              bg="black"
              opacity="0.4"
            />
            <Box
              position="absolute"
              top="0px"
              left={`${(width - 320) / 2 + 5}px`}
              bottom={`${540 - ((540 - 320) / 2 + 25) - 5}px`}
              right={`${(width - 320) / 2 + 5}px`}
              bg="black"
              opacity="0.4"
            />
            <Box
              position="absolute"
              top={`${540 - ((540 - 320) / 2 - 25) - 5}px`}
              left={`${(width - 320) / 2 + 5}px`}
              bottom="0px"
              right={`${(width - 320) / 2 + 5}px`}
              bg="black"
              opacity="0.4"
            />
            <Box
              position="absolute"
              top={`${(540 - 320) / 2 + 25}px`}
              left={`${(width - 320) / 2}px`}
              w="320px"
              h="320px"
              borderColor="white"
              borderWidth="5px"
              rounded="24"
            />
          </Box>
        </CameraView>
      </Box>
      <VStack alignItems="center">
        <Link
          mt="6"
          _text={{ color: "brand.600", fontSize: "lg" }}
          onPress={() => onOpen()}
        >
          QRコードを表示する
        </Link>
      </VStack>
    </Box>
  );
};

export default QRCodeScreen;
