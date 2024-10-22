import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import useAuth from "../../utils/useAuth";

export type GetUserByUserIdResponse = Awaited<
  ReturnType<typeof getUserByUserId>
>;

const getUserByUserId = async (userId: string | undefined) => {
  if (!userId) {
    return;
  }

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const useQueryUserByUserId = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["user_by_user_id", session?.user.id],
    queryFn: async () => await getUserByUserId(session?.user.id),
  });
};
