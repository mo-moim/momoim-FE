// import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";
import Tabs from "@/components/common/Tabs";

export default function MyPage({ children }: { children: React.ReactNode }) {
  //   if (isLoading) return <div>로딩 중...</div>;
  //   if (error instanceof Error) return <div>에러: {error.message}</div>;
  const tabs = [
    {
      name: "안녕",
      value: "hello",
      path: "/test/hello",
    },
    {
      name: "안녕ㅜ",
      value: "hellow",
      path: "/test/hellow",
    },
    {
      name: "안녕ㅗ",
      value: "helloo",
      path: "/test/helloo",
    },
  ];
  return (
    <div>
      <div className="relative flex w-full flex-col items-center">
        <div className="w-full max-w-[1100px]">
          <Tabs tabs={tabs} />
          {children}
        </div>
      </div>
    </div>
  );
}
