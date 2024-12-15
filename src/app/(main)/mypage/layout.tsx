// import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import ProfileBox from "./_components/ProfileBox";
import Tabs from "../../../components/common/Tabs";

export default function MyPage({ children }: { children: React.ReactNode }) {
  //   if (isLoading) return <div>로딩 중...</div>;
  //   if (error instanceof Error) return <div>에러: {error.message}</div>;
  const tabs = [
    {
      name: "나의 일정",
      value: "schedule",
      path: "/mypage/schedule?sub=schedule-after",
    },
    {
      name: "나의 모임",
      value: "moim",
      path: "/mypage/moim?sub=mymoim",
    },
    {
      name: "나의 리뷰",
      value: "review",
      path: "/mypage/review?sub=all-review",
    },
  ];
  return (
    <div>
      <div className="relative flex w-full flex-col items-center">
        <ProfileBox />
        <div className="w-full max-w-[1100px]">
          <Tabs tabs={tabs} />
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
