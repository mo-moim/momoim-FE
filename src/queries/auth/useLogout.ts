import { logoutApi } from "@/api/auth/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  //   const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });

      router.push("/");
    },
  });
};
