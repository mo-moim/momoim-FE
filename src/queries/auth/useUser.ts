import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/auth/user";
import { useAuthStore } from "@/store/useAuthStore";

export const useUser = () => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
    retry: 0,
    enabled: !!accessToken,
    placeholderData: (previousData) => previousData,
  });
};
