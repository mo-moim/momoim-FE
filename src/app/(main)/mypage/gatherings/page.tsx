"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GatheringContent } from "@/types/common/gatheringContent";
import Tags from "@/components/common/Tags";
import MoimCard from "@/components/common/cards/MoimCard";
import { useRef, useState } from "react";
import { EmptyState } from "@/components/common/EmptyState";
import { useGathering } from "@/queries/mypage/useGathering";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function MyMoim() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  const [subcategory, setSubcategory] = useState(sub || "my-gatherings");

  const tags = [
    {
      name: "나의 모임",
      value: "my-gatherings",
    },
    {
      name: "내가 만든 모임",
      value: "created",
    },
    {
      name: "찜한 모임",
      value: "liked",
    },
  ];

  const getEmptyState = async () => {
    if (!sub)
      return (
        <EmptyState
          title="아직 모임에 참여하지 않았어요"
          description="지금 바로 모임에 참여해보세요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
          className="h-full"
        />
      );
    if (sub === "my-gatherings")
      return (
        <EmptyState
          title="아직 모임에 참여하지 않았어요"
          description="지금 바로 모임에 참여해보세요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
          className="h-full"
        />
      );
    if (sub === "created")
      return (
        <EmptyState
          title="아직 모임을 만들지 않았어요"
          description="지금 바로 모임을 만들어보아요!"
          actionText="모임 만들기"
          onAction={() => router.push("/gatherings/create")}
          className="h-full"
        />
      );
    if (sub === "liked")
      return (
        <EmptyState
          title="아직 찜한 모임이 없어요"
          description="마음에 드는 모임을 찾아보아요!"
          actionText="모임 찾기"
          onAction={() => router.push("/all")}
          className="h-full"
        />
      );
    return {};
  };

  const { data, isLoading, error } = useGathering(sub);

  if (isLoading) return null;
  if (error) return null;

  // useIntersectionObserver({
  //   target: observerTarget,
  //   onIntersect: () => fetchNextPage(),
  //   enabled: !!hasNextPage && !isFetchingNextPage,
  // });

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
      {data.length > 0 ? (
        data.map((moim: GatheringContent, idx: number) => {
          return (
            <div key={`key:${moim.gatheringId}`}>
              <MoimCard
                type="mypage"
                data={moim}
                customOnClick={() => {
                  router.push(`/gatherings/${moim.gatheringId}`);
                }}
              />
              {data.length - 1 !== idx ? <hr className="my-4" /> : <br />}
            </div>
          );
        })
      ) : (
        <>{getEmptyState()}</>
      )}
    </div>
  );
}
