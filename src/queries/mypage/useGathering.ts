import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import {
  getMyCreatedMoimApi,
  getMyCreatedMoimPrefetchApi,
  getMyLikedMoimApi,
  getMyLikedMoimPrefetchApi,
  getMyMoimApi,
  getMyMoimPrefetchApi,
} from "@/api/moim";
import { Pagination } from "@/types/pagination";

const getMoim = async (sub: string, page: Pagination) => {
  if (sub === "my-gatherings") return getMyMoimApi(page);
  if (sub === "created") return getMyCreatedMoimApi(page);
  if (sub === "liked") return getMyLikedMoimApi(page);
  return {};
};

const getMoimPrefetch = async (sub: string, page: Pagination) => {
  if (sub === "my-gatherings") return getMyMoimPrefetchApi(page);
  if (sub === "created") return getMyCreatedMoimPrefetchApi(page);
  if (sub === "liked") return getMyLikedMoimPrefetchApi(page);
  return {};
};

export const useGathering = (sub: string | null) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", sub],
    queryFn: async ({ pageParam = 0 }) => {
      const page: Pagination = {
        offset: pageParam * 12,
        limit: 12,
      };
      const data = await getMoim(sub || "my-gatherings", page);
      return { data, nextPage: data.length === 12 ? pageParam + 1 : null };
    },
    getNextPageParam: (lastPage) => (lastPage.nextPage !== null ? lastPage.nextPage : undefined),
    initialPageParam: 0,
    staleTime: 0,
  });
};

export const useGatheringPrefetch = (queryClient: QueryClient, sub: string | null | undefined) => {
  return () =>
    queryClient.prefetchInfiniteQuery({
      queryKey: ["gatherings", sub || "my-gatherings"],
      queryFn: async ({ pageParam = 0 }) => {
        const data = await getMoimPrefetch(sub || "my-gatherings", { offset: 0, limit: 12 });
        return { data, nextPage: data.length === 12 ? pageParam + 1 : null };
      },
      initialPageParam: 0,
    });
};
