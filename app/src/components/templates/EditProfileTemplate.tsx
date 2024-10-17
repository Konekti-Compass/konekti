import React, { useEffect, useRef, useState } from "react";
import { Keyboard, useWindowDimensions } from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";
import {
  Button,
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  HStack,
  IconButton,
  Icon,
  useColorModeValue,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { GetUserResponse } from "../../hooks/user/query";
import Input from "../molecules/Input";
import Overlay from "../molecules/Overlay";

type EditProfileTemplateProps = {
  user: GetUserResponse | undefined;
  updateUser: ({
    name,
    belong,
    hobby,
    talent,
    profile,
  }: {
    name: string;
    belong: string | null;
    hobby: string | null;
    talent: string | null;
    profile: string | null;
  }) => Promise<void>;
  isLoading: boolean;
  isLoadingUpdateUser: boolean;
  goBackNavigationHandler: () => void;
};

type FormValues = {
  name: string;
  profile: string | null;
  talent: string | null;
  belong: string | null;
  hobby: string | null;
};

const EditProfileTemplate = ({
  user,
  updateUser,
  isLoading,
  isLoadingUpdateUser,
  goBackNavigationHandler,
}: EditProfileTemplateProps) => {
  const textColor = useColorModeValue("muted.600", "muted.300");
  const iconColor = useColorModeValue("muted.600", "muted.100");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      user.profile && setValue("profile", user.profile);
      user.talent && setValue("talent", user.talent);
      user.belong && setValue("belong", user.belong);
      user.hobby && setValue("hobby", user.hobby);
    }
  }, [user]);

  return (
    <Box flex={1} safeAreaTop>
      <Overlay isOpen={isLoading} />
      <HStack mb="4" px="2" alignItems="center" justifyContent="space-between">
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
        <Heading>プロフィール編集</Heading>
        <IconButton
          onPress={goBackNavigationHandler}
          icon={<Icon as={<Feather name="x" />} size="xl" color={iconColor} />}
          variant="unstyled"
        />
      </HStack>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="handled"
      >
        <Box flex={1} px="10" pb="16" justifyContent="space-between">
          <VStack space="2">
            <FormControl isRequired isInvalid={"name" in errors}>
              <FormControl.Label>ユーザー名</FormControl.Label>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        returnKeyType="done"
                        InputRightElement={
                          <IconButton
                            onPress={() => setValue("name", "")}
                            icon={
                              <Icon
                                as={<Feather name="x" />}
                                size="4"
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
                      <HStack mt="1" justifyContent="space-between">
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.name && <Text>{errors.name.message}</Text>}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "ユーザー名を入力してください",
                  maxLength: {
                    value: 20,
                    message: "ユーザー名は20文字以上で入力してください",
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"belong" in errors}>
              <FormControl.Label>所属</FormControl.Label>
              <Controller
                name="belong"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        returnKeyType="done"
                        InputRightElement={
                          <IconButton
                            onPress={() => setValue("belong", null)}
                            icon={
                              <Icon
                                as={<Feather name="x" />}
                                size="4"
                                color="muted.400"
                              />
                            }
                            variant="unstyled"
                            _pressed={{
                              opacity: 0.5,
                            }}
                          />
                        }
                        value={value ?? ""}
                        onChangeText={onChange}
                      />
                      <HStack mt="1" justifyContent="space-between">
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.belong && (
                            <Text>{errors.belong.message}</Text>
                          )}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  maxLength: {
                    value: 20,
                    message: "所属は20文字以上で入力してください",
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"hobby" in errors}>
              <FormControl.Label>趣味</FormControl.Label>
              <Controller
                name="hobby"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        returnKeyType="done"
                        InputRightElement={
                          <IconButton
                            onPress={() => setValue("hobby", null)}
                            icon={
                              <Icon
                                as={<Feather name="x" />}
                                size="4"
                                color="muted.400"
                              />
                            }
                            variant="unstyled"
                            _pressed={{
                              opacity: 0.5,
                            }}
                          />
                        }
                        value={value ?? ""}
                        onChangeText={onChange}
                      />
                      <HStack mt="1" justifyContent="space-between">
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.hobby && <Text>{errors.hobby.message}</Text>}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  maxLength: {
                    value: 20,
                    message: "趣味は20文字以上で入力してください",
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"talent" in errors}>
              <FormControl.Label>特技</FormControl.Label>
              <Controller
                name="talent"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        returnKeyType="done"
                        InputRightElement={
                          <IconButton
                            onPress={() => setValue("talent", null)}
                            icon={
                              <Icon
                                as={<Feather name="x" />}
                                size="4"
                                color="muted.400"
                              />
                            }
                            variant="unstyled"
                            _pressed={{
                              opacity: 0.5,
                            }}
                          />
                        }
                        value={value ?? ""}
                        onChangeText={onChange}
                      />
                      <HStack mt="1" justifyContent="space-between">
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.talent && (
                            <Text>{errors.talent.message}</Text>
                          )}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  maxLength: {
                    value: 20,
                    message: "特技は20文字以上で入力してください",
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"profile" in errors}>
              <FormControl.Label>プロフィール</FormControl.Label>
              <Controller
                name="profile"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        h="48"
                        multiline
                        textAlignVertical="top"
                        value={value ?? ""}
                        onChangeText={onChange}
                      />
                      <HStack mt="1" justifyContent="space-between">
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.profile && (
                            <Text>{errors.profile.message}</Text>
                          )}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>
                          {value?.length ?? 0} / 100
                        </Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  maxLength: {
                    value: 100,
                    message: "プロフィールは100文字以上で入力してください",
                  },
                }}
              />
            </FormControl>
          </VStack>
          <Button
            mt="12"
            size="lg"
            rounded="xl"
            colorScheme="brand"
            isLoading={isLoadingUpdateUser}
            onPress={handleSubmit(async (data) => {
              await updateUser({
                name: data.name,
                belong: data.belong,
                hobby: data.hobby,
                talent: data.talent,
                profile: data.profile,
              });
            })}
          >
            <Text bold color="white" fontSize="md">
              保存する
            </Text>
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default EditProfileTemplate;
