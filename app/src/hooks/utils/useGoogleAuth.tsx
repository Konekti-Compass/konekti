import { useState, useCallback, useEffect } from "react";

import { User, Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "../../supabase";

type UseGoogleAuthType = {
  onSuccess?: (
    data:
      | {
          user: User | null;
          session: Session | null;
        }
      | {
          user: null;
          session: null;
        },
  ) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
};

const useGoogleAuth = ({ onSuccess, onError, onCancel }: UseGoogleAuthType) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const mutateAsync = useCallback(async () => {
    setIsLoading(true);
    try {
      const redirectURL = Linking.createURL("redirect");
      console.log(redirectURL);

      const { data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectURL },
      });

      if (!data.url) throw Error();

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectURL,
        {
          showInRecents: true,
        },
      );

      if (result.type === "success") {
        const params = new URLSearchParams(result.url.split("#")[1]);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (!!access_token && !!refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            throw error;
          }

          onSuccess && onSuccess(data);
        }
      } else {
        onCancel && onCancel();
      }
    } catch (error) {
      if (error instanceof Error) {
        onError && onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    mutateAsync,
  };
};

export default useGoogleAuth;
