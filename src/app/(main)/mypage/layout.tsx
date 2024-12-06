// import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import TabSection from "./_components/TabSection";
import ProfileBox from "./_components/ProfileBox";

export default function MyPage({ children }: { children: React.ReactNode }) {
  //   if (isLoading) return <div>로딩 중...</div>;
  //   if (error instanceof Error) return <div>에러: {error.message}</div>;

  return (
    <div className="bg-white text-black">
      {/* 이건 고칠듯 */}
      <div className="relative flex w-full flex-col items-center">
        <ProfileBox />
        <div className="w-full max-w-[1100px]">
          <TabSection />
          {/* <HydrationBoundary
            state={dehydrate(new QueryClient())}
          > */}
          {children}
          {/* </HydrationBoundary> */}
        </div>
      </div>
    </div>
  );
}
