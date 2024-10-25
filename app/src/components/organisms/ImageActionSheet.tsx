import React, { memo } from "react";

import { Feather } from "@expo/vector-icons";
import { Actionsheet, Icon, useColorModeValue } from "native-base";

type ImageActionSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  pickImageByCamera: () => void;
  pickImageByLibrary: () => void;
};

const ImageActionSheet = memo(
  ({
    isOpen,
    onClose,
    onDelete,
    pickImageByCamera,
    pickImageByLibrary,
  }: ImageActionSheetProps) => {
    const pressedColor = useColorModeValue("muted.300", "muted.700");
    const iconColor = useColorModeValue("muted.500", "muted.300");

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={
              <Icon as={<Feather />} name="camera" size="6" color={iconColor} />
            }
            rounded="lg"
            _pressed={{ bg: pressedColor }}
            onPress={() => {
              pickImageByCamera();
              onClose();
            }}
          >
            カメラで撮影
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon as={<Feather />} name="image" size="6" color={iconColor} />
            }
            rounded="lg"
            _pressed={{ bg: pressedColor }}
            onPress={() => {
              pickImageByLibrary();
              onClose();
            }}
          >
            写真を選択
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={
              <Icon as={<Feather />} name="trash" size="6" color={iconColor} />
            }
            rounded="lg"
            _pressed={{ bg: pressedColor }}
            onPress={() => {
              onDelete();
              onClose();
            }}
          >
            画像を削除
          </Actionsheet.Item>
          <Actionsheet.Item
            rounded="lg"
            _pressed={{ bg: pressedColor }}
            onPress={onClose}
          >
            キャンセル
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    );
  },
);

export default ImageActionSheet;
