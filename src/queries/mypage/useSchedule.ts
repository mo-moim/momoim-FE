import { QueryClient, useQuery } from "@tanstack/react-query";
import { getScheduleApi, getSchedulePrefetchApi } from "@/api/schedule";

export const useSchedule = (year: number) => {
  return useQuery({
    queryKey: ["schedule", year],
    queryFn: async () => {
      const data = await getScheduleApi(year);
      return data;
    },
  });
};

export const useSchedulePrefetch = (queryClient: QueryClient) => {
  const thisYear = new Date().getFullYear();
  return queryClient.prefetchQuery({
    queryKey: ["schedule", thisYear],
    queryFn: async () => {
      const data = await getSchedulePrefetchApi(thisYear);
      return data;
    },
  });
};
