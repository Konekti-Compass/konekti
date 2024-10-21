import React, { useCallback, useEffect, useRef, useState } from "react";

import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";

import HomeTemplate from "../components/templates/HomeTemplate";
import useImage from "../hooks/utils/useImage";
import { usePostAvatar, useUpdateProfile } from "../hooks/profile/mutate";
import { supabase } from "../supabase";
import useAlert from "../hooks/utils/useAlert";
import { useQueryUserProfiles } from "../hooks/profile/query";

import { HomeStackParamList, HomeStackScreenProps } from "../types";
import { useSignOut } from "../hooks/auth/mutate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wait } from "../functions";
import { useQueryBelongs } from "../hooks/belong/query";

const HomeScreen = ({ navigation }: HomeStackScreenProps<"Home">) => {
  const { showAlert } = useAlert();

  const focusRef = useRef(true);

  const { params } = useRoute<RouteProp<HomeStackParamList, "EditProfile">>();

  const [profileId, setProfileId] = useState(-1);
  const [isLoadingProfileId, setIsLoadingProfileId] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    refetch: refetchProfiles,
  } = useQueryUserProfiles();

  const {
    data: belongs,
    isLoading: isLoadingBelongs,
    refetch: refetchBelongs,
  } = useQueryBelongs(profileId);

  useFocusEffect(
    useCallback(() => {
      if (focusRef.current) {
        focusRef.current = false;
        return;
      }

      refetchProfiles();
      refetchBelongs();
    }, [])
  );

  useEffect(() => {
    (async () => {
      if (profileId !== -1) {
        await AsyncStorage.setItem("@profileId", profileId.toString());
      }
    })();
  }, [profileId]);

  useEffect(() => {
    (async () => {
      if (profileId === -1) {
        setIsLoadingProfileId(true);
        const profileId = await AsyncStorage.getItem("@profileId");
        if (profileId) {
          setProfileId(Number(profileId));
        }
        setIsLoadingProfileId(false);
      }
    })();
  }, [profileId]);

  useEffect(() => {
    (async () => {
      if (params?.profileId) {
        if (params?.profileId === -1) {
          if (profiles?.length) {
            setProfileId(profiles[0].profileId);
          } else {
            setProfileId(-1);
          }
        } else {
          setIsLoadingProfileId(true);
          setProfileId(params.profileId);
          await wait(1);
          setIsLoadingProfileId(false);
        }
      }
    })();
  }, [params, profiles]);

  const {
    mutateAsync: mutateAsyncUpdateProfile,
    isPending: isLoadingUpdateProfile,
  } = useUpdateProfile({
    onSuccess: async () => {
      await refetchProfiles();
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
        if (profiles?.length) {
          await mutateAsyncUpdateProfile({
            profileId,
            avatarUrl: data.publicUrl,
          });
        }
      },
      onError: () => {
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
    await refetchProfiles();
    await refetchBelongs();
    setIsRefetching(false);
  }, []);

  const deleteAvatar = useCallback(async () => {
    if (profiles?.length) {
      await mutateAsyncUpdateProfile({
        ProfileId: profiles[profileId].profileId,
        avatarUrl: null,
      });
    }
  }, [profiles, profileId]);

  const signOut = useCallback(async () => {
    await mutateAsyncSignOut();
  }, []);

  const postProfileNavigationHandler = useCallback(() => {
    navigation.navigate("PostProfile");
  }, []);

  const editProfileNavigationHandler = useCallback((profileId: number) => {
    navigation.navigate("EditProfile", { profileId });
  }, []);

  const qrCodeNavigationHandler = useCallback(() => {
    navigation.navigate("QRCode");
  }, []);

  const friendListNavigationHandler = useCallback(() => {
    navigation.navigate("FriendList");
  }, []);

  const getProfile = useCallback(() => {
    const profile = profiles?.find(
      (profile) => profile.profileId === profileId
    );
    if (!profile) {
      if (profiles?.length) {
        setProfileId(profiles[0].profileId);
        return profiles[0];
      }
    }
    return profile;
  }, [profiles, profileId]);

  return (
    <HomeTemplate
      profileId={profileId}
      profile={getProfile()}
      profiles={profiles}
      belongs={belongs}
      refetch={refetch}
      pickImageByCamera={pickImageByCamera}
      pickImageByLibrary={pickImageByLibrary}
      isLoading={isLoadingProfileId || isLoadingProfiles || isLoadingBelongs}
      isRefetching={isRefetching}
      isLoadingSignOut={isLoadingSignOut}
      isLoadingAvatar={isLoadingPostAvatar || isLoadingUpdateProfile}
      deleteAvatar={deleteAvatar}
      signOut={signOut}
      setProfileId={setProfileId}
      postProfileNavigationHandler={postProfileNavigationHandler}
      editProfileNavigationHandler={editProfileNavigationHandler}
      friendListNavigationHandler={friendListNavigationHandler}
      qrCodeNavigationHandler={qrCodeNavigationHandler}
    />
  );
};

export default HomeScreen;
