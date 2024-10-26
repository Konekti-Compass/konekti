import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";

export type GetBelongsByProfileIdResponse = Awaited<
  ReturnType<typeof getBelongsByProfileId>
>;
export type GetBelongsByCodeResponse = Awaited<
  ReturnType<typeof getBelongsByCode>
>;

const getBelongsByProfileId = async (profileId: number | undefined) => {
  if (!profileId) {
    return [];
  }

  const { data, error } = await supabase
    .from("belong")
    .select("*, belongCode:belong_code(*)")
    .eq("profileId", profileId)
    .order("updatedAt", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};

const getBelongsByCode = async (code: number) => {
  const { data, error } = await supabase
    .from("belong")
    .select("*, profile:profile(*)")
    .eq("code", code)
    .order("updatedAt", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
};

export const useQueryBelongsByProfileId = (profileId: number | undefined) => {
  return useQuery({
    queryKey: ["belongs_by_profile_id", profileId],
    queryFn: async () => await getBelongsByProfileId(profileId),
  });
};

export const useQueryBelongsByCode = (code: number) => {
  return useQuery({
    queryKey: ["belongs_by_code", code],
    queryFn: async () => await getBelongsByCode(code),
  });
};
