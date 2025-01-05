import { headers } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getReviewsPrefetchApi } from "@/api/review";

const queryClient = new QueryClient();
export default function MyPageReviews({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const sub = headersList.get("x-url")?.split("=")[1];

  queryClient.prefetchInfiniteQuery({
    queryKey: ["review", sub || "un-review"],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getReviewsPrefetchApi(sub || "un-review", { offset: 0, limit: 12 });
      return { data, nextPage: data.length === 12 ? pageParam + 1 : null };
    },
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
}
