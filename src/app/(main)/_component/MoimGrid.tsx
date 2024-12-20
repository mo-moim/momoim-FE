"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Gathering } from "@/types/gathering";
import { useMoimList } from "@/queries/gatherings/useMoimList";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { EmptyState } from "@/components/common/EmptyState";
import { useRouter } from "next/navigation";
import { LOCATIONS, SORT_ORDERS, SORTS } from "@/constants/gatherings";

interface MoimGridProps {
  category: string;
  subCategory: string;
  location: string;
  gatheringDate?: Date;
  sortType?: string;
  sortOrder?: string;
}

export function MoimGrid({
  category,
  subCategory,
  location = LOCATIONS.ALL,
  gatheringDate,
  sortType,
  sortOrder,
}: MoimGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useMoimList(
    category,
    subCategory,
    location,
    gatheringDate,
    sortType,
    sortOrder,
  );
  const router = useRouter();

  useIntersectionObserver({
    target: observerTarget,
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error")
    return <EmptyState title="모임 목록을 불러오는데 실패했습니다." description="다시 시도해주세요." />;
  if (data.pages[0].items.length === 0)
    return (
      <EmptyState
        title="조건에 맞는 모임이 없어요,"
        description="추천하는 모임을 찾아보세요!"
        actionText="추천탭 바로가기"
        onAction={() => router.push("/recommend")}
      />
    );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.pages.map((page) =>
          page.items.map((gathering: Gathering) => (
            <motion.div
              key={gathering.gatheringId}
              className="group relative overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-lg"
            >
              <p className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{gathering.gatheringId}</p>
              <p className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {gathering.category} / {gathering.subCategory}
              </p>
              <p className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{gathering.location}</p>
              <p className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{gathering.nextGatheringAt}</p>
              <p className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {gathering.participantCount} / {gathering.capacity}
              </p>

              <div className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{gathering.status}</span>
                  <span className="text-xs text-gray-500">{gathering.isPeriodic ? "정기 모임" : "일회성 모임"}</span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">{gathering.name}</h3>
              </div>
            </motion.div>
          )),
        )}
      </div>

      <div ref={observerTarget} className={`mt-4 h-10 ${hasNextPage ? "visible" : "hidden"}`} />

      {isFetchingNextPage && (
        <div className="mt-4 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        </div>
      )}

      <div className="my-4 text-center text-sm text-gray-500">
        {hasNextPage ? "더 많은 모임 불러오는 중..." : "모든 모임을 불러왔습니다"}
      </div>
    </>
  );
}
