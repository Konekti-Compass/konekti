import React, { Dispatch, SetStateAction } from "react";
import { createContext, ReactNode, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { wait } from "../functions";

type ProfileIdContextProps = {
  profileId: number;
  setProfileId: Dispatch<SetStateAction<number>>;
  error: Error | undefined;
  isLoading: boolean;
};

type ProfileIdProviderProps = {
  children: ReactNode;
};

export const ProfileIdContext = createContext({} as ProfileIdContextProps);

export const ProfileIdProvider = ({ children }: ProfileIdProviderProps) => {
  const [profileId, setProfileId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await wait(0.5);
      setIsLoading(false);
    })();
  }, [profileId]);

  useEffect(() => {
    try {
      (async () => {
        if (profileId !== -1) {
          await AsyncStorage.setItem("@profileId", profileId.toString());
        }
      })();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }, [profileId]);

  useEffect(() => {
    try {
      (async () => {
        if (profileId === -1) {
          setIsLoading(true);
          const profileId = await AsyncStorage.getItem("@profileId");
          if (profileId) {
            setProfileId(Number(profileId));
          }
          setIsLoading(false);
        }
      })();
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }, [profileId]);

  return (
    <ProfileIdContext.Provider
      value={{ profileId, setProfileId, error, isLoading }}
    >
      {children}
    </ProfileIdContext.Provider>
  );
};
