import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import useAuth from "../../utils/useAuth";

export type GetProfileByProfileIdResponse = Awaited<
  ReturnType<typeof getProfileByProfileId>
>;
export type GetProfilesByAuthorIdResponse = Awaited<
  ReturnType<typeof getProfilesByAuthorId>
>;

const getProfileByProfileId = async (profileId: number) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*, user(*)")
    .eq("profileId", profileId);

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const getProfilesByAuthorId = async (authorId: string | undefined) => {
  if (!authorId) {
    return [];
  }

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("authorId", authorId)
    .order("updatedAt", { ascending: false });

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

export const useQueryProfilesByAuthorId = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["profiles_by_author_id", session?.user.id],
    queryFn: async () => await getProfilesByAuthorId(session?.user.id),
  });
};
