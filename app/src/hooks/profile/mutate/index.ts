import { useMutation } from "@tanstack/react-query";
import { decode } from "base64-arraybuffer";

import { supabase } from "../../../supabase";
import { Profile, UseMutationResult } from "../../../types";

export type PostProfileResponse = Awaited<ReturnType<typeof postProfile>>;
export type UpdateProfileResponse = Awaited<ReturnType<typeof updateProfile>>;
export type PostAvatarResponse = Awaited<ReturnType<typeof postAvatar>>;
export type DeleteProfileResponse = Awaited<ReturnType<typeof deleteProfile>>;
export type SearchProfileByProfileIdResponse = Awaited<
  ReturnType<typeof searchProfileByProfileId>
>;

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

const postAvatar = async (base64: string) => {
  const filePath = `avatar/${Math.random()}.png`;

  const { data, error } = await supabase.storage
    .from("image")
    .upload(filePath, decode(base64), {
      contentType: "image",
      upsert: true,
    });

  if (error) {
    throw error;
  }
  return data;
};

const deleteProfile = async (profileId: number) => {
  await supabase.from("belong").delete().eq("profileId", profileId);
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

const searchProfileByProfileId = async (profileId: number) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("profileId", profileId)
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

export const usePostAvatar = ({
  onSuccess,
  onError,
}: UseMutationResult<PostAvatarResponse, Error>) =>
  useMutation({
    mutationFn: postAvatar,
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

export const useSearchProfileByProfileId = ({
  onSuccess,
  onError,
}: UseMutationResult<SearchProfileByProfileIdResponse, Error>) =>
  useMutation({
    mutationFn: searchProfileByProfileId,
    onSuccess,
    onError,
  });
