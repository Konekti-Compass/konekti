import React, { useCallback, useRef, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import HomeTemplate from "../components/templates/HomeTemplate";
import useImage from "../hooks/sdk/useImage";
import { usePostAvatar, useUpdateUser } from "../hooks/user/mutate";
import { useQueryUser } from "../hooks/user/query";
import { supabase } from "../supabase";
import useAlert from "../hooks/sdk/useAlert";
import { useQueryUserProfiles } from "../hooks/profile/query";

import { HomeStackScreenProps } from "../types";
import { useSignOut } from "../hooks/auth/mutate";

const HomeScreen = ({ navigation }: HomeStackScreenProps<"Home">) => {
  const { showAlert } = useAlert();

  const focusRef = useRef(true);

  const [profileIndex, setIsProfileIndex] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useQueryUser();

  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    refetch: refetchProfile,
  } = useQueryUserProfiles();

  useFocusEffect(
    useCallback(() => {
      if (focusRef.current) {
        focusRef.current = false;
        return;
      }

      refetchUser();
      refetchProfile();
    }, [])
  );

  const { mutateAsync: mutateAsyncUpdateUser, isPending: isLoadingUpdateUser } =
    useUpdateUser({
      onSuccess: async () => {
        await refetchUser();
      },
      onError: () => {
        showAlert({ status: "error", text: "エラーが発生しました" });
      },
    });

  const { mutateAsync: mutateAsyncSignOut, isPending: isLoadingSignOut } =
    useSignOut({
      onError: () => {
        showAlert({ status: "error", text: "エラーが発生しました" });
      },
    });

  const { mutateAsync: mutateAsyncPostAvatar, isPending: isLoadingPostAvatar } =
    usePostAvatar({
      onSuccess: async ({ path }) => {
        const { data } = supabase.storage.from("image").getPublicUrl(path);
        if (user) {
          await mutateAsyncUpdateUser({
            userId: user.userId,
            avatarUrl: data.publicUrl,
          });
        }
      },
      onError: (error) => {
        console.log(error);
        showAlert({ status: "error", text: "エラーが発生しました" });
      },
    });

  const { pickImageByCamera, pickImageByLibrary } = useImage({
    onSuccess: async ({ base64 }) => {
      if (base64) {
        await mutateAsyncPostAvatar(base64);
      }
    },
    onDisable: () => {
      showAlert({ status: "error", text: "カメラを許可してください" });
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const refetch = useCallback(async () => {
    setIsRefetching(true);
    await refetchUser();
    setIsRefetching(false);
  }, []);

  const deleteAvatar = useCallback(async () => {
    if (user) {
      await mutateAsyncUpdateUser({ userId: user.userId, avatarUrl: null });
    }
  }, [user]);

  const signOut = useCallback(async () => {
    await mutateAsyncSignOut();
  }, []);

  const editProfileNavigationHandler = useCallback(() => {
    navigation.navigate("EditProfile");
  }, []);

  const qrCodeNavigationHandler = useCallback(() => {
    navigation.navigate("QRCode");
  }, []);

  const friendListNavigationHandler = useCallback(() => {
    navigation.navigate("FriendList");
  }, []);

  return (
    <HomeTemplate
      profileIndex={profileIndex}
      user={user}
      profiles={profiles}
      refetch={refetch}
      pickImageByCamera={pickImageByCamera}
      pickImageByLibrary={pickImageByLibrary}
      isLoading={isLoadingUser || isLoadingProfiles}
      isRefetching={isRefetching}
      isLoadingAvatar={isLoadingPostAvatar || isLoadingUpdateUser}
      deleteAvatar={deleteAvatar}
      signOut={signOut}
      editProfileNavigationHandler={editProfileNavigationHandler}
      friendListNavigationHandler={friendListNavigationHandler}
      qrCodeNavigationHandler={qrCodeNavigationHandler}
    />
  );
};

export default HomeScreen;
