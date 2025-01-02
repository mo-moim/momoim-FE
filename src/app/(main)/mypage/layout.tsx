import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import TopButton from "@/components/common/TopButton";
import ClientRedirectHandler from "./_components/ClientRedirectHandler";
import UpperPart from "./_components/UpperPart";

export default function MyPage({ children }: { children: React.ReactNode }) {
  // const cookieStore = cookies();
  // const token = cookieStore.get("accessToken");
  // if (!token) {
  //   return <ClientRedirectHandler />;
  // }

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <UpperPart />
      <div className="flex w-full flex-col gap-4">
        {/* <HydrationBoundary state={dehydrate(new QueryClient())}> */}
        <Suspense fallback={<div />}>{children}</Suspense>
        {/* </HydrationBoundary> */}
      </div>
      <TopButton />
    </div>
  );
}
