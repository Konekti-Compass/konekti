import "dotenv/config";
import { ConfigContext, ExpoConfig } from "@expo/config";

export type Extra = {
  eas: { projectId: string };
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  STRIPE_KEY_LIVE: string;
  STRIPE_KEY_TEST: string;
};

export interface ExtendedExpoConfig extends ExpoConfig {
  extra: Extra;
}

export default ({ config }: ConfigContext): ExtendedExpoConfig => ({
  ...config,
  name: "konekti",
  slug: "konekti",
  scheme: "konekti",
  owner: "konekti",
  version: "1.0.0",
  orientation: "portrait",
  privacy: "public",
  icon: "./assets/icon.png",
  jsEngine: "hermes",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [],
  extra: {
    eas: {
      projectId: "",
    },
    SUPABASE_URL: process.env.SUPABASE_URL as string,
    SUPABASE_KEY: process.env.SUPABASE_KEY as string,
    STRIPE_KEY_LIVE: process.env.STRIPE_KEY_LIVE as string,
    STRIPE_KEY_TEST: process.env.STRIPE_KEY_TEST as string,
  },
});
