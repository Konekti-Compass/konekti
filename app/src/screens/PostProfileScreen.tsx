import React, { useCallback, useState } from "react";

import PostProfileTemplate from "../components/templates/PostProfileScreen";
import { usePostProfile } from "../hooks/profile/mutate";
import { HomeStackScreenProps } from "../types";
import useAlert from "../hooks/utils/useAlert";
import useAuth from "../hooks/auth/useAuth";
import { usePostBelong } from "../hooks/belong/mutate";

const PostProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"PostProfile">) => {
  const { showAlert } = useAlert();

  const [belongNames, setBelongNames] = useState<string[]>([]);

  const { session } = useAuth();

  const { mutateAsync: mutateAsyncPostBelong, isPending: isLoadingPostBelong } =
    usePostBelong({
      onError: () => {
        showAlert({ status: "error", text: "エラーが発生しました" });
      },
    });

  const {
    mutateAsync: mutateAsyncPostProfile,
    isPending: isLoadingPostProfile,
  } = usePostProfile({
    onSuccess: async (data) => {
      await Promise.all(
        belongNames.map(async (item) => {
          await mutateAsyncPostBelong({
            name: item,
            profileId: data.profileId,
          });
        })
      );
      showAlert({ status: "success", text: "作成しました" });
      navigation.navigate("Home", { profileId: data.profileId });
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
  });

  const postProfile = useCallback(
    async ({
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
    }) => {
      if (!session) return;

      await mutateAsyncPostProfile({
        name,
        displayName,
        hobby,
        talent,
        introduction,
        color: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
        userId: session.user.id,
      });
    },
    [session]
  );

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <PostProfileTemplate
      belongNames={belongNames}
      setBelongNames={setBelongNames}
      postProfile={postProfile}
      isLoadingPostProfile={isLoadingPostProfile || isLoadingPostBelong}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default PostProfileScreen;
