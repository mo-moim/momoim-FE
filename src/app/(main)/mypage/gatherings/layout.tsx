import { headers } from "next/headers";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { useGatheringPrefetch } from "@/queries/mypage/useGathering";

export default function MyPageGatherings({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const headersList = headers();
  const sub = headersList.get("x-url")?.split("=")[1];

  useGatheringPrefetch(queryClient, sub);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
}
