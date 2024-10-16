import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  AuthNavigator: NavigatorScreenParams<AuthStackParamList> | undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
