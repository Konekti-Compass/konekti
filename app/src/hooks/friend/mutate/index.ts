import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { Friend, UseMutationResult } from "../../../types";

export type PostFriendResponse = Awaited<ReturnType<typeof postFriend>>;
export type UpdateFriendResponse = Awaited<ReturnType<typeof updateFriend>>;
export type DeleteFriendResponse = Awaited<ReturnType<typeof deleteFriend>>;
export type SearchFriendByUserIdResponse = Awaited<
  ReturnType<typeof searchFriendByUserId>
>;

const postFriend = async (friend: Friend["Insert"]) => {
  const { data, error } = await supabase.from("friend").insert(friend).select();

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const updateFriend = async (friend: Friend["Update"]) => {
  if (!friend.friendId) {
    return;
  }

  const { data, error } = await supabase
    .from("friend")
    .update(friend)
    .eq("friendId", friend.friendId)
    .select();

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const deleteFriend = async (friendId: number) => {
  await supabase.from("belong").delete().eq("FriendId", friendId);
  const { data, error } = await supabase
    .from("friend")
    .delete()
    .eq("friendId", friendId)
    .select();

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const searchFriendByUserId = async (friendId: number) => {
  const { data, error } = await supabase
    .from("friend")
    .select("*")
    .eq("friendId", friendId);

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

export const usePostFriend = ({
  onSuccess,
  onError,
}: UseMutationResult<PostFriendResponse, Error>) =>
  useMutation({
    mutationFn: postFriend,
    onSuccess,
    onError,
  });

export const useUpdateFriend = ({
  onSuccess,
  onError,
}: UseMutationResult<UpdateFriendResponse, Error>) =>
  useMutation({
    mutationFn: updateFriend,
    onSuccess,
    onError,
  });

export const useDeleteFriend = ({
  onSuccess,
  onError,
}: UseMutationResult<DeleteFriendResponse, Error>) =>
  useMutation({
    mutationFn: deleteFriend,
    onSuccess,
    onError,
  });

export const useSearchFriendByUserId = ({
  onSuccess,
  onError,
}: UseMutationResult<SearchFriendByUserIdResponse, Error>) =>
  useMutation({
    mutationFn: searchFriendByUserId,
    onSuccess,
    onError,
  });
