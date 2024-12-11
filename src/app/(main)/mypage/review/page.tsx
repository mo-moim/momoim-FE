"use client";

import Tags from "../../../../components/common/Tags";

export default function MyReview() {
  const tags = [
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
      <Tags tags={tags} />
      <div>리뷰컴포넌트</div>
    </div>
  );
}
