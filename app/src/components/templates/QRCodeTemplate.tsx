import React, { memo } from "react";

import { Feather } from "@expo/vector-icons";
import {
  Box,
  Text,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorModeValue,
  useDisclose,
  VStack,
} from "native-base";
import { CameraView } from "expo-camera";
import QRCodeActionSheet from "../organisms/QRCodeActionSheet";
import { useWindowDimensions } from "react-native";

type QRCodeTemplateProps = {
  goBackNavigationHandler: () => void;
};

const QRCodeTemplate = memo(
  ({ goBackNavigationHandler }: QRCodeTemplateProps) => {
    const iconColor = useColorModeValue("muted.600", "muted.100");

    const { width } = useWindowDimensions();

    const { isOpen, onOpen, onClose } = useDisclose();

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
              <HStack
                px="2"
                alignItems="center"
                justifyContent="space-between"
                position="absolute"
                safeAreaTop
              >
                <IconButton
                  onPress={goBackNavigationHandler}
                  icon={
                    <Icon
                      as={<Feather name="chevron-left" />}
                      size="2xl"
                      color={iconColor}
                    />
                  }
                  variant="unstyled"
                />
                <Box />
                <IconButton
                  onPress={goBackNavigationHandler}
                  icon={
                    <Icon
                      as={<Feather name="x" />}
                      size="xl"
                      color={iconColor}
                    />
                  }
                  variant="unstyled"
                />
              </HStack>
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
          <HStack>
            <Box>
              <Text></Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    );
  }
);

export default QRCodeTemplate;
