import { headers } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { useReviewPrefetch } from "@/queries/mypage/useReview";

export default function MyPageReviews({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const headersList = headers();
  const sub = headersList.get("x-url")?.split("=")[1];

  useReviewPrefetch(queryClient, sub);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
}
