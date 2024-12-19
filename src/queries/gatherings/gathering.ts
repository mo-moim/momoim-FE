import { fetchGatherings, fetchRecommendedGatherings } from "@/api/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 15;

export const useGatheringsQuery = (category: string, subCategory: string) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", category, subCategory],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        offset: pageParam,
        limit: ITEMS_PER_PAGE,
        sortType: "UPDATE_AT" as const,
        sortOrder: "DESC" as const,
      };

      let response;
      if (category === "RECOMMEND") {
        response = await fetchRecommendedGatherings(params);
      } else {
        const apiParams = {
          ...params,
          ...(category !== "ALL" && { category: [category] }),
          ...(subCategory !== "ALL" && { subCategory: [subCategory] }),
        };
        response = await fetchGatherings(apiParams);
      }

      return {
        items: response.data,
        hasNext: response.data.length >= ITEMS_PER_PAGE,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasNext) return undefined;
      return allPages.length * ITEMS_PER_PAGE;
    },
    initialPageParam: 0,
  });
};
