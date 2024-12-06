"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Tab from "./Tab";

export default function TabSection() {
  const router = useRouter();
  const path = usePathname();
  const slash = path.split("/");
  const id = slash[slash.length - 1].split("?")[0];
  const [currentPlace, setCurrentPlace] = useState(id);

  const handleTabRouter = (type: string) => {
    setCurrentPlace(type);
    if (type === "schedule") {
      router.push("/mypage/schedule?filter=schedule-before");
    }
    if (type === "moim") {
      router.push("/mypage/moim?filter=all-moim");
    }
    if (type === "review") {
      router.push("/mypage/review?filter=all-review");
    }
    // 탭 추가될 때마다 여기에 if문 하나씩 추가
    return "";
  };

  return (
    <div className="flex gap-[16px] px-[24px]">
      <Tab type="schedule" func={handleTabRouter} condition={currentPlace} />
      <Tab type="moim" func={handleTabRouter} condition={currentPlace} />
      <Tab type="review" func={handleTabRouter} condition={currentPlace} />
    </div>
  );
}
