// FilterButtonSection이랑 같이 쓰세요

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  category: Category;
  func: (type: string) => void;
}
interface Category {
  name: string;
  value: string;
}

export default function FilterButton({ category, func }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("filter");
  return (
    <button
      type="button"
      onClick={() => {
        func(category.value);
      }}
      className={`text-xs sm:text-base ${category.value === query && "bg-[#E1E2E8] font-bold text-[#5A25E9]"} rounded-[12px] bg-[#F8F8FA] px-[16px] py-[12px] text-sm sm:text-base`}
    >
      {category.name}
    </button>
  );
}
