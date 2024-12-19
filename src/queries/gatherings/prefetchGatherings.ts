import { gatheringsApi } from "@/api/gathering";

const ITEMS_PER_PAGE = 15;
export const DEFAULT_SORT = {
  TYPE: "UPDATE_AT",
  ORDER: "DESC",
} as const;

export const gatheringsQueries = {
  initialGatheringsQuery: (category: string) => ({
    queryKey: ["gatherings", category, "ALL", "ALL", undefined, DEFAULT_SORT.TYPE, DEFAULT_SORT.ORDER],
    initialPageParam: 0,
    queryFn: async () => {
      const initialData = await gatheringsApi.getInitialGatherings(category, {
        offset: "0",
        limit: String(ITEMS_PER_PAGE),
        sortType: DEFAULT_SORT.TYPE,
        sortOrder: DEFAULT_SORT.ORDER,
      });

      return {
        items: initialData.data.data,
        hasNext: initialData.data.data.length >= ITEMS_PER_PAGE,
      };
    },
  }),
};
