import React, { memo, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Pressable,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../molecules/Input";
import * as ValidationConstants from "../../constants/validation";

type SignUpTemplateProps = {
  isLoading: boolean;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  signInNavigationHandler: () => void;
  goBackNavigationHandler: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

const SignUpTemplate = memo(
  ({
    isLoading,
    signUpWithEmail,
    signUpWithGoogle,
    signInNavigationHandler,
    goBackNavigationHandler,
  }: SignUpTemplateProps) => {
    const bgColor = useColorModeValue("white", "muted.700");
    const borderColor = useColorModeValue("muted.200", "muted.800");
    const pressedColor = useColorModeValue("muted.200", "muted.800");
    const textColor = useColorModeValue("muted.500", "muted.300");
    const iconColor = useColorModeValue("black", "white");

    const [showPassword, setShowPassword] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>();

    return (
      <VStack flex={1} safeAreaTop>
        <StatusBar style={useColorModeValue("dark", "light")} />
        <HStack px="2" alignItems="center" justifyContent="space-between">
          <IconButton
            onPress={goBackNavigationHandler}
            icon={
              <Icon
                as={<Feather name="chevron-left" />}
                size="2xl"
                color={iconColor}
              />
            }
            alignSelf="flex-start"
            variant="unstyled"
          />
          <Heading fontSize="3xl">新規登録</Heading>
          <Box size="12" />
        </HStack>
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps="handled"
        >
          <VStack pt="24" pb="12" px="12" space="3">
            <FormControl isRequired isInvalid={"email" in errors}>
              <FormControl.Label>メールアドレス</FormControl.Label>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    keyboardType="email-address"
                    returnKeyType="done"
                    placeholder=""
                    placeholderTextColor="muted.400"
                    InputRightElement={
                      <Icon
                        as={<Feather />}
                        name="mail"
                        size="5"
                        mr="2"
                        color="muted.400"
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                rules={{
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
                    message: "メールアドレスが不正です",
                  },
                }}
              />
              <FormControl.ErrorMessage
                mt="1"
                leftIcon={<Icon as={<Feather name="alert-circle" />} />}
              >
                {errors.email && <Text>{errors.email.message}</Text>}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"password" in errors}>
              <FormControl.Label>パスワード</FormControl.Label>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    returnKeyType="done"
                    placeholder=""
                    placeholderTextColor="muted.400"
                    autoCapitalize="none"
                    style={{ fontFamily: "monospace" }}
                    type={showPassword ? "text" : "password"}
                    InputRightElement={
                      <IconButton
                        onPress={() => setShowPassword(!showPassword)}
                        icon={
                          <Icon
                            as={<Feather />}
                            name={showPassword ? "eye" : "eye-off"}
                            size="5"
                            color="muted.400"
                          />
                        }
                        variant="unstyled"
                        _pressed={{
                          opacity: 0.5,
                        }}
                      />
                    }
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                rules={{
                  required: "パスワードを入力してください",
                  minLength: {
                    value: ValidationConstants.PASSWORD_MAX_LENGTH,
                    message: `パスワードは${ValidationConstants.PASSWORD_MAX_LENGTH}文字以上で入力してください`,
                  },
                  pattern: {
                    value: /[a-zA-Z0-9.?/-]/,
                    message: "パスワードは半角英数字で入力してください",
                  },
                }}
              />
              <FormControl.ErrorMessage
                mt="1"
                leftIcon={<Icon as={<Feather name="alert-circle" />} />}
              >
                {errors.password && <Text>{errors.password.message}</Text>}
              </FormControl.ErrorMessage>
            </FormControl>
            <VStack alignItems="center">
              <Button
                w="100%"
                mt="9"
                size="lg"
                rounded="xl"
                colorScheme="brand"
                onPress={handleSubmit((data) =>
                  signUpWithEmail(data.email, data.password),
                )}
                isLoading={isLoading}
              >
                <Text bold color="white" fontSize="md">
                  新規登録
                </Text>
              </Button>
              <HStack mt="3" alignItems="center" space="2">
                <Text color={textColor}>既にアカウントをお持ちの場合</Text>
                <Link
                  _text={{ color: "brand.600" }}
                  onPress={signInNavigationHandler}
                >
                  ログイン
                </Link>
              </HStack>
            </VStack>
            <HStack
              my="5"
              alignItems="center"
              justifyContent="center"
              space="3"
            >
              <Divider w="40%" bg="muted.300" />
              <Text color={textColor}>または</Text>
              <Divider w="40%" bg="muted.300" />
            </HStack>
            <VStack space="3">
              <Pressable
                py="3"
                rounded="full"
                borderWidth="1"
                borderColor={borderColor}
                alignItems="center"
                bg={bgColor}
                _pressed={{ bg: pressedColor }}
                onPress={signUpWithGoogle}
              >
                <Center h="100%" position="absolute" top="3" left="3">
                  <Image
                    style={{ width: 32, height: 32 }}
                    source={require("../../../assets/provider/google.png")}
                    contentFit="contain"
                  />
                </Center>
                <Text>Googleで新規登録</Text>
              </Pressable>
            </VStack>
          </VStack>
        </KeyboardAwareScrollView>
      </VStack>
    );
  },
);

export default SignUpTemplate;
