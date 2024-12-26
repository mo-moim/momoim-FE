import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";

export const useProfile = () => {
  return useQuery({ queryKey: ["profile"], queryFn: getUser });
};
