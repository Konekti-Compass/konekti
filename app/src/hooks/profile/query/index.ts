import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { Profile, User } from "../../../types";
import useAuth from "../../auth/useAuth";

export type GetProfileResponse = Awaited<ReturnType<typeof getProfile>>;
export type GetUserProfilesResponse = Awaited<ReturnType<typeof getUserProfiles>>;

const getProfile = async (profileId: number) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*, user(*)")
    .eq("profileId", profileId)
    .returns<(Profile["Row"] & { user: User["Row"] })[]>();

  if (error) {
    throw error;
  }
  return data[0];
};

const getUserProfiles = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};

export const useQueryProfile = (profileId: number) =>
  useQuery({
    queryKey: ["profile", profileId],
    queryFn: async () => await getProfile(profileId),
  });

export const useQueryUserProfiles = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["profiles", session?.user.id],
    queryFn: async () => await getUserProfiles(session?.user.id),
  });
};
