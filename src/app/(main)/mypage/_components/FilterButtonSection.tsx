"use client";

import { useRouter } from "next/navigation";
import FilterButton from "./FilterButton";

interface Props {
  categories: Category[];
}

interface Category {
  name: string;
  value: string;
}

export default function FilterButtonSection({ categories }: Props) {
  const router = useRouter();

  const filter = (category: string) => {
    if (category === "all-moim") {
      router.push("/mypage/moim?filter=all-moim");
    }
    if (category === "belong") {
      router.push("/mypage/moim?filter=belong");
    }
    if (category === "created") {
      router.push("/mypage/moim?filter=created");
    }
    if (category === "all-review") {
      router.push("/mypage/review?filter=all-review");
    }
    if (category === "canreview") {
      router.push("/mypage/review?filter=canreview");
    }
    if (category === "reviewed") {
      router.push("/mypage/review?filter=reviewed");
    }
    if (category === "schedule-before") {
      router.push("/mypage/schedule?filter=schedule-before");
    }
    if (category === "schedule-after") {
      router.push("/mypage/schedule?filter=schedule-after");
    }
    // 필터링 추가될 때마다 여기에 if문 하나씩 추가
  };
  return (
    <div className="my-[16px] flex gap-2">
      {categories?.map((category, idx) => {
        return <FilterButton key={`fb${Date.now()}`} category={category} func={filter} />;
      })}
    </div>
  );
}
