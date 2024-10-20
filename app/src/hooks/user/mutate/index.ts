import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { UseMutationResult, User } from "../../../types";

export type PostUserResponse = Awaited<ReturnType<typeof postUser>>;
export type UpdateUserResponse = Awaited<ReturnType<typeof updateUser>>;
export type SearchUserResponse = Awaited<ReturnType<typeof searchUser>>;
export type SearchUsersResponse = Awaited<ReturnType<typeof searchUsers>>;

const postUser = async (user: User["Insert"]) => {
  const { data, error } = await supabase
    .from("user")
    .insert(user)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const updateUser = async (user: User["Update"]) => {
  if (!user.userId) {
    throw Error();
  }

  const { data, error } = await supabase
    .from("user")
    .update(user)
    .eq("userId", user.userId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const searchUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("userId", userId);

  if (error) {
    throw error;
  }
  return data;
};

const searchUsers = async (query: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) {
    throw error;
  }
  return data;
};

export const usePostUser = ({
  onSuccess,
  onError,
}: UseMutationResult<PostUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: postUser,
    onSuccess,
    onError,
  });

export const useUpdateUser = ({
  onSuccess,
  onError,
}: UseMutationResult<UpdateUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: updateUser,
    onSuccess,
    onError,
  });

export const useSearchUser = ({
  onSuccess,
  onError,
}: UseMutationResult<SearchUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: searchUser,
    onSuccess,
    onError,
  });

export const useSearchUsers = ({
  onSuccess,
  onError,
}: UseMutationResult<SearchUsersResponse, PostgrestError>) =>
  useMutation({
    mutationFn: searchUsers,
    onSuccess,
    onError,
  });
