import { Suspense } from "react";
import TopButton from "@/components/common/TopButton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUserPrefetch } from "@/api/auth/user";
import UpperPart from "./_components/UpperPart";

export default async function MyPage({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const initialData = await getUserPrefetch();
      return initialData;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex w-full flex-col items-center gap-4">
        <UpperPart />
        <div className="flex w-full flex-col gap-4">
          <Suspense fallback={<div />}>{children}</Suspense>
        </div>
        <TopButton />
      </div>
    </HydrationBoundary>
  );
}
