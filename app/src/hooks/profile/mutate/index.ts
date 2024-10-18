import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { Profile, UseMutationResult } from "../../../types";

export type PostProfileResponse = Awaited<ReturnType<typeof postProfile>>;
export type UpdateProfileResponse = Awaited<ReturnType<typeof updateProfile>>;
export type DeleteProfileResponse = Awaited<ReturnType<typeof deleteProfile>>;

const postProfile = async (profile: Profile["Insert"]) => {
  const { data, error } = await supabase
    .from("profile")
    .insert(profile)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const updateProfile = async (profile: Profile["Update"]) => {
  if (!profile.profileId) {
    throw Error();
  }

  const { data, error } = await supabase
    .from("profile")
    .update(profile)
    .eq("profileId", profile.profileId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const deleteProfile = async (profileId: number) => {
  const { data, error } = await supabase
    .from("profile")
    .delete()
    .eq("profileId", profileId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};


export const usePostProfile = ({
  onSuccess,
  onError,
}: UseMutationResult<PostProfileResponse, Error>) =>
  useMutation({
    mutationFn: postProfile,
    onSuccess,
    onError,
  });

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: UseMutationResult<UpdateProfileResponse, Error>) =>
  useMutation({
    mutationFn: updateProfile,
    onSuccess,
    onError,
  });

export const useDeleteProfile = ({
  onSuccess,
  onError,
}: UseMutationResult<DeleteProfileResponse, Error>) =>
  useMutation({
    mutationFn: deleteProfile,
    onSuccess,
    onError,
  });