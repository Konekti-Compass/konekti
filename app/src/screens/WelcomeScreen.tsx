import React, { useCallback } from "react";

import WelcomeTemplate from "../components/templates/WelcomeTemplate";
import { AuthStackScreenProps } from "../types";

const WelcomeScreen = ({ navigation }: AuthStackScreenProps) => {

  const signInNavigationHandler = useCallback(() => {
    navigation.navigate("SignIn");
  }, []);

  return (
    <WelcomeTemplate
      signInNavigationHandler={signInNavigationHandler}
    />
  );
};

export default WelcomeScreen;
