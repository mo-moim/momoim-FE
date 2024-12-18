// "use client";

// import ProfileBox from "./_components/ProfileBox";
// import Tabs from "@/components/common/Tabs";
// import { useState } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// export default function MyPage({ children }: { children: React.ReactNode }) {
//   const path = usePathname();
//   const searchParams = useSearchParams();
//   const [category, setCategory] = useState(`${path}?sub=${searchParams.get("sub")}`);
//   const router = useRouter();

//   const tabs = [
//     {
//       name: "나의 일정",
//       value: "/mypage/schedule?sub=schedule-after",
//     },
//     {
//       name: "나의 모임",
//       value: "/mypage/moim?sub=mymoim",
//     },
//     {
//       name: "나의 리뷰",
//       value: "/mypage/review?sub=un-review",
//     },
//   ];
//   return (
//     <div>
//       <div className="relative flex w-full flex-col items-center sm:px-2">
//         <ProfileBox />
//         <div className="w-full max-w-[1100px]">
//           <Tabs
//             tabs={tabs}
//             selectedValue={category}
//             onSelect={(value) => {
//               setCategory(value);
//               router.push(`${value}`);
//             }}
//           />
//           {/* <HydrationBoundary
//             state={dehydrate(new QueryClient())}
//           > */}
//           {children}
//           {/* </HydrationBoundary> */}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Tabs from "@/components/common/Tabs";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProfileBox from "./_components/ProfileBox";

export default function MyPage({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(`${path}`);
  const router = useRouter();

  const tabs = [
    // {
    //   name: "나의 일정",
    //   value: "/mypage/schedule?sub=schedule-after",
    // },
    // {
    //   name: "나의 모임",
    //   value: "/mypage/moim?sub=mymoim",
    // },
    // {
    //   name: "나의 리뷰",
    //   value: "/mypage/review?sub=un-review",
    // },
    {
      name: "나의 일정",
      value: "/mypage/schedule",
    },
    {
      name: "나의 모임",
      value: "/mypage/moim",
    },
    {
      name: "나의 리뷰",
      value: "/mypage/review",
    },
  ];
  return (
    <div>
      <div className="relative flex w-full flex-col items-center sm:px-2">
        <ProfileBox />
        <div className="w-full max-w-[1100px]">
          <Tabs
            tabs={tabs}
            selectedValue={category}
            onSelect={(value) => {
              setCategory(value);
              router.push(`${value}`);
            }}
          />
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
