import { getMoimListClient, getMoimRecommendClient } from "@/api/gatherings/getMoimList";
import { SortType } from "@/types/gathering";
import { useInfiniteQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 15;

export const useMoimList = (
  category: string,
  subCategory: string,
  location: string,
  gatheringDate?: Date,
  sortType: SortType = "UPDATE_AT",
  sortOrder: "ASC" | "DESC" = "DESC",
) => {
  return useInfiniteQuery({
    queryKey: ["gatherings", category, subCategory, location, gatheringDate, sortType, sortOrder],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        offset: pageParam,
        limit: ITEMS_PER_PAGE,
        sortType,
        sortOrder,
        ...(location !== "ALL" && { location }),
        ...(gatheringDate && {
          gatheringDate: gatheringDate.toISOString().split("T")[0],
        }),
      };

      let response;
      if (category === "RECOMMEND") {
        response = await getMoimRecommendClient(params);
      } else {
        const apiParams = {
          ...params,
          ...(category !== "ALL" && { category: [category] }),
          ...(subCategory !== "ALL" && { subCategory: [subCategory] }),
        };
        response = await getMoimListClient(apiParams);
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
