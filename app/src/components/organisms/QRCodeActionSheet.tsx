import React, { memo } from "react";

import { Actionsheet, Box, Text, useColorModeValue, VStack } from "native-base";
import QRCode from "react-native-qrcode-svg";

type QRCodeActionSheetProps = {
  value: string;
  isOpen: boolean;
  onClose: () => void;
};

const QRCodeActionSheet = memo(
  ({ value, isOpen, onClose }: QRCodeActionSheetProps) => {
    const bgColor = useColorModeValue("transparent", "white");

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack mt="12" alignItems="center">
            <Box p="3" bg={bgColor}>
              <QRCode
                value={value}
                size={200}
                color="black"
                backgroundColor={bgColor}
              />
            </Box>
            <Text bold mt="6" mb="4" fontSize="sm">
              リンクからユーザーを追加してみましょう。
            </Text>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    );
  },
);

export default QRCodeActionSheet;
