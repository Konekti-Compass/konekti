import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Database } from "./schema.d/ts";

export type User = Database["public"]["Tables"]["user"];
export type Profile = Database["public"]["Tables"]["profile"];
export type Belong = Database["public"]["Tables"]["belong"];
export type BelongCode = Database["public"]["Tables"]["belong_code"];

export type UseQueryResult<T1, T2> = {
  onSuccess?: (response: T1) => void;
  onError?: (error: T2) => void;
};

export type UseMutationResult<T1, T2> = {
  onSuccess?: (response: T1) => void;
  onError?: (error: T2) => void;
};

export type RootStackParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList> | undefined;
  AuthNavigator: NavigatorScreenParams<AuthStackParamList> | undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type TabParamList = {
  HomeNavigator: NavigatorScreenParams<HomeStackParamList>;
  GroupNavigator: NavigatorScreenParams<GroupStackParamList>;
  SearchNavigator: NavigatorScreenParams<SearchStackParamList>;
  RecordNavigator: NavigatorScreenParams<RecordStackParamList>;
  SettingNavigator: NavigatorScreenParams<SettingStackParamList>;
};

export type HomeStackParamList = {
  Home: { profileId?: number };
  PostProfile: undefined;
  EditProfile: { profileId: number };
  QRCode: undefined;
  FriendList: undefined;
};

export type GroupStackParamList = {
  Group: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

export type RecordStackParamList = {
  Record: undefined;
};

export type SettingStackParamList = {
  Setting: undefined;
};

export type RootStackScreenProps = NativeStackScreenProps<RootStackParamList>;

export type AuthStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList>,
  NativeStackScreenProps<RootStackParamList>
>;

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<TabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type GroupStackScreenProps<Screen extends keyof GroupStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<GroupStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<TabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type SearchStackScreenProps<Screen extends keyof SearchStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<SearchStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<TabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type RecordStackScreenProps<Screen extends keyof RecordStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RecordStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<TabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;

export type SettingStackScreenProps<
  Screen extends keyof SettingStackParamList
> = CompositeScreenProps<
  BottomTabScreenProps<SettingStackParamList, Screen>,
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;
