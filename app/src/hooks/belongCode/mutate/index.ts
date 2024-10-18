import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../../supabase";
import { UseMutationResult, BelongCode } from "../../../types";

export type PostBelongCodeResponse = Awaited<ReturnType<typeof postBelongCode>>;

const postBelongCode = async (belongCode: BelongCode["Insert"]) => {
  const { data, error } = await supabase
    .from("belong_code")
    .insert(belongCode)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const usePostBelongCode = ({
  onSuccess,
  onError,
}: UseMutationResult<PostBelongCodeResponse, PostgrestError>) =>
  useMutation({
    mutationFn: postBelongCode,
    onSuccess,
    onError,
  });
