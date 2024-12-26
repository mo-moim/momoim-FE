import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MypageTabs from "./_components/MypageTabs";
import ProfileBox from "./_components/ProfileBox";
import ClientRedirectHandler from "./_components/ClientRedirectHandler";
// import { toast } from "@/hooks/use-toast";

export default function MyPage({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    return <ClientRedirectHandler token={token} />;
  }

  return (
    <div>
      <div className="relative flex w-full flex-col items-center sm:px-2">
        <ProfileBox />
        <div className="flex w-full max-w-[1100px] flex-col gap-4">
          <MypageTabs />
          {/* <HydrationBoundary state={dehydrate(new QueryClient())}> */}
          <Suspense fallback={<div />}>{children}</Suspense>
          {/* </HydrationBoundary> */}
        </div>
      </div>
    </div>
  );
}
