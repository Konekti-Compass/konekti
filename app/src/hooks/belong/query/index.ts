import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";

export type GetBelongsResponse = Awaited<ReturnType<typeof getBelongs>>;

const getBelongs = async (profileId: number | undefined) => {
  if (!profileId) {
    return [];
  }

  const { data, error } = await supabase
    .from("belong")
    .select("*")
    .eq("profileId", profileId);

  if (error) {
    throw error;
  }
  return data;
};

export const useQueryBelongs = (profileId: number | undefined) => {
  return useQuery({
    queryKey: ["belongs", profileId],
    queryFn: async () => await getBelongs(profileId),
  });
};
