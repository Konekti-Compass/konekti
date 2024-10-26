import React, { useCallback, useState } from "react";

import PostProfileTemplate from "../components/templates/PostProfileScreen";
import { usePostBelong } from "../hooks/belong/mutate";
import { usePostProfile } from "../hooks/profile/mutate";
import useAlert from "../hooks/utils/useAlert";
import useAuth from "../hooks/utils/useAuth";
import { HomeStackScreenProps } from "../types";

const PostProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"PostProfile">) => {
  const [tags, setTags] = useState<string[]>([]);

  const { session } = useAuth();
  const { showAlert } = useAlert();

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
      if (data) {
        await Promise.all(
          tags.map(async (item) => {
            await mutateAsyncPostBelong({
              profileId: data.profileId,
              name: item,
            });
          })
        );
        showAlert({ status: "success", text: "作成しました" });
        navigation.navigate("Home", { profileId: data.profileId });
      }
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
      if (session) {
        await mutateAsyncPostProfile({
          name,
          displayName,
          hobby,
          talent,
          introduction,
          color: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
          authorId: session.user.id,
        });
      }
    },
    [session]
  );

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <PostProfileTemplate
      tags={tags}
      setTags={setTags}
      postProfile={postProfile}
      isLoadingPostProfile={isLoadingPostProfile || isLoadingPostBelong}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default PostProfileScreen;
