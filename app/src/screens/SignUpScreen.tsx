import React, { useCallback, useEffect } from "react";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useToast } from "native-base";

import Alert from "../components/molecules/Alert";
import SignUpTemplate from "../components/templates/SignUpTemplate";
import { showAlert } from "../functions";
import { useSignUpWithEmail } from "../hooks/auth/mutate";
import { usePostUser, useSearchUser } from "../hooks/user/mutate";
import { AuthStackScreenProps } from "../types";
import { supabase } from "../supabase";
import useGoogleAuth from "../hooks/auth/useGoogleAuth";

const SignUpScreen = ({ navigation }: AuthStackScreenProps) => {
  const toast = useToast();

  const { mutateAsync: mutateAsyncSearchUser, isPending: isLoadingSearchUser } =
    useSearchUser({
      onError: () => {
        showAlert(
          toast,
          <Alert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text="エラーが発生しました"
          />
        );
      },
    });

  const { mutateAsync: mutateAsyncPostUser, isPending: isLoadingPostUser } =
    usePostUser({
      onError: () => {
        showAlert(
          toast,
          <Alert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text="エラーが発生しました"
          />
        );
      },
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
        showAlert(
          toast,
          <Alert
            status="success"
            onPressCloseButton={() => toast.closeAll()}
            text="確認メールを送信しました"
          />
        );
      } else {
        showAlert(
          toast,
          <Alert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text="既にアカウントが存在します"
          />
        );
      }
    },
    onError: (error) => {
      if (error.status === 429) {
        showAlert(
          toast,
          <Alert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text="もう一度お試しください"
          />
        );
      } else {
        showAlert(
          toast,
          <Alert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text="エラーが発生しました"
          />
        );
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
      showAlert(
        toast,
        <Alert
          status="error"
          onPressCloseButton={() => toast.closeAll()}
          text="エラーが発生しました"
        />
      );
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
