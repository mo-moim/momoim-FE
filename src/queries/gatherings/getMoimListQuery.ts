import { getMoimListServer } from "@/api/gatherings/getMoimList";

const ITEMS_PER_PAGE = 15;

export const DEFAULT_SORT = {
  TYPE: "UPDATE_AT",
  ORDER: "DESC",
} as const;

export const getMoimListQuery = {
  initialGatheringsQuery: (category: string) => ({
    queryKey: ["gatherings", category, "ALL", "ALL", null, DEFAULT_SORT.TYPE, DEFAULT_SORT.ORDER],
    initialPageParam: 0,
    queryFn: async () => {
      const initialData = await getMoimListServer(category, {
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
