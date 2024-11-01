import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Alert } from "react-native";

import { Feather } from "@expo/vector-icons";
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

import { GetProfileByProfileIdResponse } from "../../hooks/profile/query";
import Input from "../molecules/Input";
import Overlay from "../molecules/Overlay";
import * as ValidationConstants from "../../constants/validation";

type EditProfileTemplateProps = {
  profile: GetProfileByProfileIdResponse | undefined;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  updateProfile: ({
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
  }) => Promise<void>;
  deleteProfile: () => Promise<void>;
  isLoading: boolean;
  isLoadingUpdateProfile: boolean;
  isLoadingDeleteProfile: boolean;
  goBackNavigationHandler: () => void;
};

type FormValues = {
  name: string;
  displayName: string;
  belong: string;
  talent: string;
  hobby: string;
  introduction: string;
};

const EditProfileTemplate = ({
  profile,
  tags,
  setTags,
  updateProfile,
  deleteProfile,
  isLoading,
  isLoadingUpdateProfile,
  isLoadingDeleteProfile,
  goBackNavigationHandler,
}: EditProfileTemplateProps) => {
  const textColor = useColorModeValue("muted.600", "muted.300");
  const iconColor = useColorModeValue("muted.600", "muted.100");
  const belongsBgColor = useColorModeValue("muted.200", "muted.700");

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      profile.displayName && setValue("displayName", profile.displayName);
      profile.talent && setValue("talent", profile.talent);
      profile.hobby && setValue("hobby", profile.hobby);
      profile.introduction && setValue("introduction", profile.introduction);
    }
  }, [profile]);

  return (
    <Box flex={1} alignItems="center" safeAreaTop>
      <Overlay isOpen={isLoading} />
      <HStack
        w="100%"
        mb="4"
        px="4"
        alignItems="center"
        justifyContent="space-between"
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
        <Heading>プロフィール編集</Heading>
        <IconButton
          onPress={goBackNavigationHandler}
          icon={<Icon as={<Feather name="x" />} size="xl" color={iconColor} />}
          variant="unstyled"
        />
      </HStack>
      <KeyboardAwareScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="handled"
      >
        <Box flex={1} px="10" pb="16" justifyContent="space-between">
          <VStack space="2">
            <FormControl isInvalid={"name" in errors}>
              <FormControl.Label>プロフィール名</FormControl.Label>
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
                      <HStack
                        mt="1"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControl.ErrorMessage
                          mt="0"
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.name && <Text>{errors.name.message}</Text>}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / {ValidationConstants.NAME_MAX_LENGTH}</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "プロフィール名を入力してください",
                  maxLength: {
                    value: ValidationConstants.NAME_MAX_LENGTH,
                    message: `プロフィール名は${ValidationConstants.NAME_MAX_LENGTH}文字以内で入力してください`,
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"displayName" in errors}>
              <FormControl.Label>ユーザー名</FormControl.Label>
              <Controller
                name="displayName"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        returnKeyType="done"
                        InputRightElement={
                          <IconButton
                            onPress={() => setValue("displayName", "")}
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
                      <HStack
                        mt="1"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControl.ErrorMessage
                          mt="0"
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.displayName && (
                            <Text>{errors.displayName.message}</Text>
                          )}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / {ValidationConstants.DISPLAYNAME_MAX_LENGTH}</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "ユーザー名を入力してください",
                  maxLength: {
                    value: ValidationConstants.DISPLAYNAME_MAX_LENGTH,
                    message: `ユーザー名は${ValidationConstants.DISPLAYNAME_MAX_LENGTH}文字以内で入力してください`,
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"belong" in errors}>
              <FormControl.Label>
                所属（スペースを押して確定）
              </FormControl.Label>
              <Controller
                name="belong"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        isReadOnly
                        returnKeyType="done"
                        InputRightElement={
                          <IconButton
                            onPress={() => setValue("belong", "")}
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
                        onChangeText={(text) => {
                          onChange(text);
                          trigger("belong");
                          if (text.endsWith(" ") || text.endsWith("　")) {
                            if (
                              text.slice(0, -1).length === 0 ||
                              text.slice(0, -1).length > 8
                            ) {
                              return;
                            }
                            setTags([...tags, text.slice(0, -1)]);
                            setValue("belong", "");
                          }
                        }}
                      />
                      <FormControl.ErrorMessage
                        mt="6px"
                        leftIcon={<Icon as={<Feather name="alert-circle" />} />}
                      >
                        {errors.belong && <Text>{errors.belong.message}</Text>}
                      </FormControl.ErrorMessage>
                      <HStack flexWrap="wrap" mt="1" mb="2" space="2">
                        {tags.map((item, index) => (
                          <HStack
                            key={index}
                            alignItems="center"
                            mt="6px"
                            pr="8px"
                            pl="10px"
                            py="3px"
                            space="1"
                            rounded="full"
                            bg={belongsBgColor}
                          >
                            <Text fontWeight="600">{item}</Text>
                            <IconButton
                              variant="unstyled"
                              p="3px"
                              _pressed={{ opacity: 1 }}
                              icon={<Icon as={<Feather />} name="x" size="3" color={textColor} />}
                              onPress={() => {
                                /* 
                                setTags(
                                  tags.filter((_, i) => i !== index)
                                );
                                */
                              }}
                            />
                          </HStack>
                        ))}
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  validate: (value) => {
                    if (!value && tags.length === 0) {
                      return "所属を入力してください";
                    }
                    return true;
                  },
                  maxLength: {
                    value: ValidationConstants.BELONG_MAX_LENGTH + 1,
                    message: `所属は${ValidationConstants.BELONG_MAX_LENGTH}文字以内で入力してください`,
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
                            onPress={() => setValue("hobby", "")}
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
                      <HStack
                        mt="1"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControl.ErrorMessage
                          mt="0"
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.hobby && <Text>{errors.hobby.message}</Text>}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / {ValidationConstants.HOBBY_MAX_LENGTH}</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "趣味を入力してください",
                  maxLength: {
                    value: ValidationConstants.HOBBY_MAX_LENGTH,
                    message: `趣味は${ValidationConstants.HOBBY_MAX_LENGTH}文字以内で入力してください`,
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
                            onPress={() => setValue("talent", "")}
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
                      <HStack
                        mt="1"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControl.ErrorMessage
                          mt="0"
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.talent && (
                            <Text>{errors.talent.message}</Text>
                          )}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>{value?.length ?? 0} / {ValidationConstants.TALENT_MAX_LENGTH}</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "特技を入力してください",
                  maxLength: {
                    value: ValidationConstants.TALENT_MAX_LENGTH,
                    message: `特技は${ValidationConstants.TALENT_MAX_LENGTH}文字以内で入力してください`,
                  },
                }}
              />
            </FormControl>
            <FormControl isInvalid={"introduction" in errors}>
              <FormControl.Label>自己紹介</FormControl.Label>
              <Controller
                name="introduction"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <VStack>
                      <Input
                        h="48"
                        multiline
                        textAlignVertical="top"
                        value={value}
                        onChangeText={onChange}
                      />
                      <HStack
                        mt="1"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControl.ErrorMessage
                          mt="0"
                          leftIcon={
                            <Icon as={<Feather name="alert-circle" />} />
                          }
                        >
                          {errors.introduction && (
                            <Text>{errors.introduction.message}</Text>
                          )}
                        </FormControl.ErrorMessage>
                        <Text color={textColor}>
                          {value?.length ?? 0} / {ValidationConstants.INTRODUCTION_MAX_LENGTH}
                        </Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "自己紹介を入力してください",
                  maxLength: {
                    value: ValidationConstants.INTRODUCTION_MAX_LENGTH,
                    message: `自己紹介は${ValidationConstants.INTRODUCTION_MAX_LENGTH}文字以内で入力してください`,
                  },
                }}
              />
            </FormControl>
          </VStack>
          <VStack mt="12" space="6">
            <Button
              size="lg"
              rounded="xl"
              colorScheme="brand"
              isLoading={isLoadingUpdateProfile}
              onPress={handleSubmit(async (data) => {
                await updateProfile({
                  name: data.name,
                  displayName: data.displayName,
                  hobby: data.hobby,
                  talent: data.talent,
                  introduction: data.introduction,
                });
              })}
            >
              <Text bold color="white" fontSize="md">
                保存する
              </Text>
            </Button>
            <Button
              size="lg"
              rounded="xl"
              colorScheme="brand"
              variant="outline"
              borderColor="brand.600"
              isLoading={isLoadingDeleteProfile}
              onPress={() =>
                Alert.alert(
                  "プロフィール削除",
                  "プロフィールを削除してもよろしいですか",
                  [
                    {
                      text: "キャンセル",
                      style: "cancel",
                    },
                    {
                      text: "削除",
                      onPress: async () => await deleteProfile(),
                      style: "destructive",
                    },
                  ]
                )
              }
            >
              <Text bold color="brand.600" fontSize="md">
                削除する
              </Text>
            </Button>
          </VStack>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default EditProfileTemplate;
