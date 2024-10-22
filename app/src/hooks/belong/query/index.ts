import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";

export type GetBelongsByProfileIdResponse = Awaited<
  ReturnType<typeof getBelongsByProfileId>
>;

const getBelongsByProfileId = async (profileId: number | undefined) => {
  if (!profileId) {
    return [];
  }

  const { data, error } = await supabase
    .from("belong")
    .select("*, belongCode:belong_code(*)")
    .eq("profileId", profileId);

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
