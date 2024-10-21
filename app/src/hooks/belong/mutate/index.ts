import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../supabase";
import { Belong, UseMutationResult } from "../../../types";

export type PostBelongResponse = Awaited<ReturnType<typeof postBelong>>;
export type UpdateBelongResponse = Awaited<ReturnType<typeof updateBelong>>;
export type DeleteBelongResponse = Awaited<ReturnType<typeof deleteBelong>>;
export type SearchBelongByNameResponse = Awaited<
  ReturnType<typeof searchBelongByName>
>;

const postBelong = async (belong: Belong["Insert"]) => {
  const { data, error } = await supabase
    .from("belong")
    .insert(belong)
    .select()
    .single();

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
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const deleteBelong = async (belongId: number) => {
  const { data, error } = await supabase
    .from("belong")
    .delete()
    .eq("belongId", belongId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const searchBelongByName = async (name: string) => {
  const { data, error } = await supabase
    .from("belong")
    .select()
    .eq("name", name)
    .single();

  if (error) {
    throw error;
  }
  return data;
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

export const useSearchBelongByName = ({
  onSuccess,
  onError,
}: UseMutationResult<SearchBelongByNameResponse, Error>) =>
  useMutation({
    mutationFn: searchBelongByName,
    onSuccess,
    onError,
  });
