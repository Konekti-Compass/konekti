import React, { useCallback } from "react";

import SignIn from "../components/templates/SignInTemplate";
import { useSignInWithEmail } from "../hooks/auth/mutate";
import { usePostUser, useSearchUser } from "../hooks/user/mutate";
import { AuthStackScreenProps } from "../types";
import useGoogleAuth from "../hooks/auth/useGoogleAuth";
import useAlert from "../hooks/sdk/useAlert";

const SignInScreen = ({ navigation }: AuthStackScreenProps) => {
  const { showAlert } = useAlert();

  const { mutateAsync: mutateAsyncSearchUser, isPending: isLoadingSearchUser } =
    useSearchUser({
      onError: () =>
        showAlert({ status: "error", text: "エラーが発生しました" }),
    });

  const { mutateAsync: mutateAsyncPostUser, isPending: isLoadingPostUser } =
    usePostUser({
      onError: () =>
        showAlert({ status: "error", text: "エラーが発生しました" }),
    });

  const {
    mutateAsync: mutateAsyncSignInWithEmail,
    isPending: isLoadingSignInWithEmail,
  } = useSignInWithEmail({
    onError: (error) => {
      if (error.status == 400) {
        showAlert({
          status: "error",
          text: "メールまたはパスワードが違います",
        });
      } else {
        showAlert({ status: "error", text: "エラーが発生しました" });
      }
    },
  });

  const { mutateAsync: mutateAsyncSignInWithGoogle } = useGoogleAuth({
    onSuccess: async (data) => {
      if (data?.user) {
        const user = await mutateAsyncSearchUser(data?.user?.id);
        if (!user.length) {
          mutateAsyncPostUser({
            userId: data.user.id,
            name: data.user.user_metadata?.name ?? "ユーザー",
            avatarUrl: data.user.user_metadata?.avatar_url,
            color: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
          });
        }
      }
    },
    onError: () => {
      showAlert({ status: "error", text: "エラーが発生しました" });
    },
    onCancel: () => {
      showAlert({ status: "error", text: "キャンセルされました" });
    }
  });

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      await mutateAsyncSignInWithEmail({ email, password });
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    await mutateAsyncSignInWithGoogle();
  }, []);

  const signUpNavigationHandler = useCallback(() => {
    navigation.navigate("SignUp");
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <SignIn
      isLoading={
        isLoadingSignInWithEmail || isLoadingPostUser || isLoadingSearchUser
      }
      signInWithEmail={signInWithEmail}
      signInWithGoogle={signInWithGoogle}
      signUpNavigationHandler={signUpNavigationHandler}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default SignInScreen;
