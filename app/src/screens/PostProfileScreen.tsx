import React, { useCallback } from "react";

import PostProfileTemplate from "../components/templates/PostProfileScreen";
import { usePostProfile } from "../hooks/profile/mutate";
import { HomeStackScreenProps } from "../types";
import useAlert from "../hooks/utils/useAlert";
import useAuth from "../hooks/auth/useAuth";

const PostProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"PostProfile">) => {
  const { showAlert } = useAlert();

  const { session } = useAuth();
  const {
    mutateAsync: mutateAsyncPostProfile,
    isPending: isLoadingPostProfile,
  } = usePostProfile({
    onSuccess: (data) => {
      showAlert({ status: "success", text: "作成しました" });
      navigation.navigate("Home", { profileId: data.profileId });
    },
    onError: (error) => {
      console.log(error);
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
      await mutateAsyncPostProfile({
        name,
        displayName,
        hobby,
        talent,
        introduction,
        color: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
        userId: session?.user.id,
      });
    },
    [session]
  );

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <PostProfileTemplate
      postProfile={postProfile}
      isLoadingPostProfile={isLoadingPostProfile}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default PostProfileScreen;
