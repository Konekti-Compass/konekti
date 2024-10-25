import React, { Dispatch, SetStateAction } from "react";

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

import Input from "../molecules/Input";

type PostProfileTemplateProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  postProfile: ({
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
  isLoadingPostProfile: boolean;
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

const PostProfileTemplate = ({
  tags,
  setTags,
  postProfile,
  isLoadingPostProfile,
  goBackNavigationHandler,
}: PostProfileTemplateProps) => {
  const textColor = useColorModeValue("muted.600", "muted.300");
  const iconColor = useColorModeValue("muted.600", "muted.100");

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Box flex={1} safeAreaTop>
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
        <Heading>プロフィール作成</Heading>
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
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "プロフィール名を入力してください",
                  maxLength: {
                    value: 20,
                    message: "プロフィール名は20文字以内で入力してください",
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
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "ユーザー名を入力してください",
                  maxLength: {
                    value: 20,
                    message: "ユーザー名は20文字以内で入力してください",
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
                              text.slice(0, -1).length > 8 ||
                              text.slice(0, -1).includes(" ") ||
                              text.slice(0, -1).includes("　")
                            ) {
                              return;
                            }
                            if (tags.includes(text.slice(0, -1))) {
                              setValue("belong", "");
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
                        {tags.map((item, index) => {
                          return (
                            <HStack
                              key={index}
                              alignItems="center"
                              mt="6px"
                              pr="8px"
                              pl="10px"
                              py="3px"
                              space="1"
                              rounded="full"
                              bg="muted.200"
                            >
                              <Text fontWeight="600">{item}</Text>
                              <IconButton
                                variant="unstyled"
                                p="3px"
                                _pressed={{ opacity: 1 }}
                                icon={
                                  <Icon as={<Feather />} name="x" size="3" />
                                }
                                onPress={() => {
                                  setTags(tags.filter((_, i) => i !== index));
                                }}
                              />
                            </HStack>
                          );
                        })}
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
                    value: 9,
                    message: "所属は8文字以内で入力してください",
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
                  required: "趣味を入力してください",
                  maxLength: {
                    value: 20,
                    message: "趣味は20文字以内で入力してください",
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
                        <Text color={textColor}>{value?.length ?? 0} / 20</Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "特技を入力してください",
                  maxLength: {
                    value: 20,
                    message: "特技は20文字以内で入力してください",
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
                          {value?.length ?? 0} / 100
                        </Text>
                      </HStack>
                    </VStack>
                  );
                }}
                rules={{
                  required: "自己紹介を入力してください",
                  maxLength: {
                    value: 100,
                    message: "自己紹介は100文字以内で入力してください",
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
            isLoading={isLoadingPostProfile}
            onPress={handleSubmit(async (data) => {
              await postProfile({
                name: data.name,
                displayName: data.displayName,
                hobby: data.hobby,
                talent: data.talent,
                introduction: data.introduction,
              });
            })}
          >
            <Text bold color="white" fontSize="md">
              作成する
            </Text>
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default PostProfileTemplate;
