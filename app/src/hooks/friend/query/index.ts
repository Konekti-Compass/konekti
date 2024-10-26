import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { Friend, Profile } from "../../../types";

export type GetFriendBySenderIdAndReceiverIdResponse = Awaited<
  ReturnType<typeof getFriendBySenderIdAndReceiverId>
>;
export type GetFriendsByProfileIdResponse = Awaited<
  ReturnType<typeof getFriendsByProfileId>
>;

const getFriendBySenderIdAndReceiverId = async (
  senderId: number,
  receiverId: number
) => {
  const { data, error } = await supabase
    .from("friend")
    .select("*")
    .or(
      `and(senderId.eq.${senderId},receiverId.eq.${receiverId}),and(senderId.eq.${receiverId},receiverId.eq.${senderId})`
    );

  if (error) {
    throw error;
  }

  return data[0] ?? null;
};

const getFriendsByProfileId = async (profileId: number) => {
  if (!profileId) {
    return [];
  }

  const { data, error } = await supabase
    .from("friend")
    .select("*, receiver:receiverId(*), sender:senderId(*)")
    .or(`senderId.eq.${profileId}, receiverId.eq.${profileId}`)
    .order("updatedAt", { ascending: false })
    .returns<
      (Friend["Row"] & {
        receiver: Profile["Row"];
        sender: Profile["Row"];
      })[]
    >();

  if (error) {
    throw error;
  }
  return data;
};

export const useQueryFriendBySenderIdAndReceiverId = (
  senderId: number,
  receiverId: number
) =>
  useQuery({
    queryKey: ["friend_by_sender_id_and_receiver_id", senderId, receiverId],
    queryFn: async () =>
      await getFriendBySenderIdAndReceiverId(senderId, receiverId),
  });

export const useQueryFriendsByProfileId = (profileId: number) =>
  useQuery({
    queryKey: ["friends_by_profile_id", profileId],
    queryFn: async () => await getFriendsByProfileId(profileId),
  });
