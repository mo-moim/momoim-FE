import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/auth/user";
import { useAuthStore } from "@/store/useAuthStore";

export const useUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
    retry: 0,
    enabled: !!accessToken, // 로그인 상태에서만 쿼리 실행
    placeholderData: (previousData) => previousData,
  });
};
