import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteReviewApi, getReviewsApi, patchReviewApi, postReviewApi } from "@/api/review";

import { toast } from "@/hooks/use-toast";
import { useModalStore } from "@/store/modalStore";

interface ReviewParams {
  gatheringId: number;
  score: number;
  title: string;
  comment: string;
}

export const useReview = (sub: string | null) => {
  return useQuery({
    queryKey: ["review", sub],
    queryFn: () => getReviewsApi(sub || "un-review"),
    staleTime: 0,
  });
};

export const usePostReview = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  return useMutation({
    mutationFn: (params: ReviewParams) => postReviewApi(params.gatheringId, params.score, params.title, params.comment),
    onSuccess: () => {
      closeModal();
      toast({
        title: "리뷰 작성",
        description: "리뷰가 작성되었습니다!",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "리뷰 작성 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};

export const useEditReview = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  return useMutation({
    mutationFn: (params: ReviewParams) =>
      patchReviewApi(params.gatheringId, params.score, params.title, params.comment),
    onSuccess: () => {
      closeModal();
      toast({
        title: "리뷰 수정",
        description: "리뷰가 수정되었습니다!",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "리뷰 수정 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();
  return useMutation({
    mutationFn: (params: { id: number }) => deleteReviewApi(params.id),
    onSuccess: () => {
      closeModal();
      toast({
        title: "리뷰 삭제",
        description: "리뷰가 삭제되었습니다!",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "리뷰 수정 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
    },
  });
};
