import React, { useCallback } from "react";

import Alert from "../components/molecules/Alert";
import EditProfileTemplate from "../components/templates/EditProfileTemplate";
import { useUpdateUser } from "../hooks/user/mutate";
import { useQueryUser } from "../hooks/user/query";
import { HomeStackScreenProps } from "../types";
import useAlert from "../hooks/sdk/useAlert";

const EditProfileScreen = ({
  navigation,
}: HomeStackScreenProps<"EditProfile">) => {
  const { showAlert } = useAlert();

  const { data: user, isLoading: isLoadingUser } = useQueryUser();

  const { mutateAsync: mutateAsyncUpdateUser, isPending: isLoadingUpdateUser } =
    useUpdateUser({
      onSuccess: () => {
        showAlert({ status: "success", text: "保存しました" });
        navigation.goBack();
      },
      onError: () => {
        showAlert({ status: "error", text: "エラーが発生しました" });
      },
    });

  const updateUser = useCallback(
    async ({
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
    }) => {
      if (user) {
        await mutateAsyncUpdateUser({
          userId: user.userId,
          name,
          belong,
          hobby,
          talent,
          profile,
        });
      }
    },
    [user]
  );

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <EditProfileTemplate
      user={user}
      updateUser={updateUser}
      isLoading={isLoadingUser}
      isLoadingUpdateUser={isLoadingUpdateUser}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default EditProfileScreen;
