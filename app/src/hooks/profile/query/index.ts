import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import useAuth from "../../utils/useAuth";

export type GetProfileByProfileIdResponse = Awaited<ReturnType<typeof getProfileByProfileId>>;
export type GetProfilesByUserIdResponse = Awaited<
  ReturnType<typeof getProfilesByUserId>
>;

const getProfileByProfileId = async (profileId: number) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*, user(*)")
    .eq("profileId", profileId);

  if (error) {
    throw error;
  }
  return data[0];
};

const getProfilesByUserId = async (userId: string | undefined) => {
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

export const useQueryProfileByProfileId = (profileId: number) =>
  useQuery({
    queryKey: ["profile_by_profile_id", profileId],
    queryFn: async () => await getProfileByProfileId(profileId),
  });

export const useQueryProfilesByUserId = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["profiles_by_user_id", session?.user.id],
    queryFn: async () => await getProfilesByUserId(session?.user.id),
  });
};
