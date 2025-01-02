import { logoutApi } from "@/api/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      logout();
      router.push("/");
    },
  });
};
