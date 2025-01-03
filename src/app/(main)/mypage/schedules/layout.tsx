import { useSchedulePrefetch } from "@/queries/mypage/useSchedule";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default function MyPageSchedules({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  useSchedulePrefetch(queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
}
