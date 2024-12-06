"use client";

import FilterButtonSection from "../_components/FilterButtonSection";

export default function MyReview() {
  const categories = [
    {
      name: "전체",
      value: "all-review",
    },
    {
      name: "작성 가능한 리뷰",
      value: "canreview",
    },
    {
      name: "작성한 리뷰",
      value: "reviewed",
    },
  ];

  return (
    <div className="px-[32px]">
      <FilterButtonSection categories={categories} />
      <div>리뷰컴포넌트</div>
    </div>
  );
}
