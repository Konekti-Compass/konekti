import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { Belong, UseMutationResult } from "../../../types";

export type PostBelongResponse = Awaited<ReturnType<typeof postBelong>>;
export type UpdateBelongResponse = Awaited<ReturnType<typeof updateBelong>>;
export type DeleteBelongResponse = Awaited<ReturnType<typeof deleteBelong>>;

const postBelong = async (belong: Belong["Insert"]) => {
  const { data, error } = await supabase.from("belong").insert(belong).select();

  if (error) {
    throw error;
  }
  return data;
};

const updateBelong = async (belong: Belong["Update"]) => {
  if (!belong.belongId) {
    throw Error();
  }

  const { data, error } = await supabase
    .from("belong")
    .update(belong)
    .eq("belongId", belong.belongId)
    .select();

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const deleteBelong = async (belongId: string) => {
  const { data, error } = await supabase
    .from("belong")
    .delete()
    .eq("belongId", belongId)
    .select();

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

export const usePostBelong = ({
  onSuccess,
  onError,
}: UseMutationResult<PostBelongResponse, Error>) =>
  useMutation({
    mutationFn: postBelong,
    onSuccess,
    onError,
  });

export const useUpdateBelong = ({
  onSuccess,
  onError,
}: UseMutationResult<UpdateBelongResponse, Error>) =>
  useMutation({
    mutationFn: updateBelong,
    onSuccess,
    onError,
  });

export const useDeleteBelong = ({
  onSuccess,
  onError,
}: UseMutationResult<DeleteBelongResponse, Error>) =>
  useMutation({
    mutationFn: deleteBelong,
    onSuccess,
    onError,
  });
