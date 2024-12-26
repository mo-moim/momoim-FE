"use client";

import ReviewCard from "@/components/common/cards/ReviewCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GatheringContent } from "@/types/common/gatheringContent";
import { useState } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { useReview } from "@/queries/mypage/useReview";
import UnreviewedCard from "../_components/UnreviewedCard";
import Tags from "../../../../components/common/Tags";

interface Review {
  reviewId: number;
  gatheringId: number;
  title: string;
  comment: string;
  gatheringName: string;
  gatheringStatus: string;
  score: number;
  createdAt: string;
}

export default function MyReview() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  const [subcategory, setSubcategory] = useState(sub || "un-review");

  const tags = [
    {
      name: "작성 가능한 리뷰",
      value: "un-review",
    },
    {
      name: "작성한 리뷰",
      value: "my-review",
    },
  ];

  const { data, isLoading, error } = useReview(sub);

  if (isLoading) return <div />;
  if (error) return <div />;

  return (
    <div className="flex flex-col gap-2">
      <Tags
        tags={tags}
        selectedValue={subcategory}
        onSelect={(value) => {
          setSubcategory(value);
          router.push(`${path}?sub=${value}`);
        }}
      />
      {(!sub || sub === "un-review") &&
        ((data?.length as number) > 0 ? (
          <div>
            {data?.map((unreview: GatheringContent, idx: number) => {
              return (
                <div key={`r:${unreview.gatheringId}`}>
                  <UnreviewedCard data={unreview} />
                  {data.length - 1 !== idx ? <hr className="my-[16px]" /> : <br />}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="리뷰를 작성할 모임이 없어요"
            description="지금 바로 모임에 참여해보세요!"
            actionText="모임 찾기"
            onAction={() => router.push("/all")}
          />
        ))}
      {sub === "my-review" &&
        ((data?.length as number) > 0 ? (
          <div>
            {data?.map((review: Review, idx: number) => {
              const r = {
                title: review.title,
                comment: review.comment,
                score: review.score,
                createdAt: review.createdAt,
                reviewId: review.reviewId,
              };
              const t = {
                gatheringId: review.gatheringId,
                gatheringName: review.gatheringName,
                gatheringStatus: review.gatheringStatus,
              };
              return (
                <div key={`r:${review.gatheringId}`}>
                  <ReviewCard review={r} typeData={t} isWriter />
                  {data.length - 1 !== idx ? <hr className="my-[16px]" /> : <br />}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="작성한 리뷰가 없어요"
            description="참여했던 모임의 리뷰를 작성해보세요!"
            actionText="나의 모임 목록 보기"
            onAction={() => router.push("/mypage/gatherings?sub=my-gatherings")}
          />
        ))}
      <div />
    </div>
  );
}
