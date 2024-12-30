import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUser, getUser } from "@/api/user";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";

export const useUser = () => {
  const accessToken = Cookies.get("accessToken");

  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
    retry: 0,
    enabled: !!accessToken, // 로그인 상태에서만 쿼리 실행
    placeholderData: (previousData) => previousData,
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      toast({
        title: "프로필을 수정",
        description: "프로필을 수정이 완료되었어요",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "작업 실패",
        description: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
