"use client";

import ReviewCard from "@/components/common/cards/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GatheringContent } from "@/types/common/gatheringContent";
import { getReviewsApi } from "@/api/review";
import { useState } from "react";
import UnreviewedCard from "../_components/UnreviewedCard";
import EmptyBlock from "../_components/EmptyBlock";
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

  const getReviews = async () => {
    if (!sub) return getReviewsApi("un-review");
    return getReviewsApi(sub);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["review", searchParams.get("sub")],
    queryFn: getReviews,
    staleTime: 0,
  });

  if (isLoading) return <div />;
  if (error) return <div />;

  return (
    <div className="lg:px-8">
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
          <EmptyBlock type="unreview" />
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
          <EmptyBlock type="myreview" />
        ))}
      <div />
    </div>
  );
}
