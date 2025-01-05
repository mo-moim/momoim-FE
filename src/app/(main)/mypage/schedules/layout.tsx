import { getSchedulePrefetchApi } from "@/api/schedule";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();
export default function MyPageSchedules({ children }: { children: React.ReactNode }) {
  const thisYear = new Date().getFullYear();
  queryClient.prefetchQuery({
    queryKey: ["schedule", thisYear],
    queryFn: async () => {
      const data = await getSchedulePrefetchApi(thisYear);
      return data;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
}
