import React, { useCallback } from "react";

import * as Linking from "expo-linking";

import SignUpTemplate from "../components/templates/SignUpTemplate";
import { useSignUpWithEmail } from "../hooks/auth/mutate";
import { usePostUser, useSearchUser } from "../hooks/user/mutate";
import { AuthStackScreenProps } from "../types";
import useGoogleAuth from "../hooks/auth/useGoogleAuth";
import useAlert from "../hooks/sdk/useAlert";

const SignUpScreen = ({ navigation }: AuthStackScreenProps) => {
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
    mutateAsync: mutateAsyncSignUpWithEmail,
    isPending: isLoadingSignUpWithEmail,
  } = useSignUpWithEmail({
    onSuccess: async ({ user }) => {
      if (user && user.identities && user.identities.length > 0) {
        mutateAsyncPostUser({
          userId: user.id,
          name: "ユーザー",
          color: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
        });

        showAlert({ status: "success", text: "確認メールを送信しました" });
      } else {
        showAlert({ status: "error", text: "既にアカウントが存在します" });
      }
    },
    onError: (error) => {
      if (error.status === 429) {
        showAlert({
          status: "error",
          text: "もう一度お試しください",
        });
      } else {
        showAlert({
          status: "error",
          text: "エラーが発生しました",
        });
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
      showAlert({
        status: "error",
        text: "エラーが発生しました",
      });
    },
  });

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      const redirectURL = Linking.createURL("redirect");
      await mutateAsyncSignUpWithEmail({
        email,
        password,
        options: {
          emailRedirectTo: redirectURL,
        },
      });
    },
    []
  );

  const signUpWithGoogle = useCallback(async () => {
    await mutateAsyncSignInWithGoogle();
  }, []);

  const signInNavigationHandler = useCallback(() => {
    navigation.navigate("SignIn");
  }, []);

  const goBackNavigationHandler = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <SignUpTemplate
      isLoading={
        isLoadingSignUpWithEmail || isLoadingPostUser || isLoadingSearchUser
      }
      signUpWithEmail={signUpWithEmail}
      signUpWithGoogle={signUpWithGoogle}
      signInNavigationHandler={signInNavigationHandler}
      goBackNavigationHandler={goBackNavigationHandler}
    />
  );
};

export default SignUpScreen;
