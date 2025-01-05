import { Suspense } from "react";
import TopButton from "@/components/common/TopButton";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUserPrefetch } from "@/api/auth/user";
import ProfileBox from "./_components/ProfileBox";
import MypageTabs from "./_components/MypageTabs";

const queryClient = new QueryClient();
export default async function MyPage({ children }: { children: React.ReactNode }) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex w-full flex-col items-center gap-4">
        <div className="flex w-full flex-col">
          <ProfileBox />
          <MypageTabs />
        </div>
        <div className="flex w-full flex-col gap-4">
          <Suspense fallback={<div />}>{children}</Suspense>
        </div>
        <TopButton />
      </div>
    </HydrationBoundary>
  );
}
