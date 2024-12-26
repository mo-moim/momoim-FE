import { useQuery } from "@tanstack/react-query";
import { getMyCreatedMoimApi, getMyLikedMoimApi, getMyMoimApi } from "@/api/moim";

const getMoim = async (sub: string) => {
  if (sub === "my-gatherings") return getMyMoimApi();
  if (sub === "created") return getMyCreatedMoimApi();
  if (sub === "liked") return getMyLikedMoimApi();
  return {};
};

export const useGathering = (sub: string | null) => {
  return useQuery({
    queryKey: ["gathering", sub],
    queryFn: () => getMoim(sub || "my-gatherings"),
    staleTime: 0,
  });
};
