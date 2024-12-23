"use client";

import { getMyCreatedMoimApi, getMyLikedMoimApi, getMyMoimApi } from "@/api/moim";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GatheringContent } from "@/types/common/gatheringContent";
import Tags from "@/components/common/Tags";
import MoimCard from "@/components/common/cards/MoimCard";
import { useState, Suspense } from "react";
import EmptyBlock from "../_components/EmptyBlock";

export default function MyMoim() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  const [subcategory, setSubcategory] = useState(sub || "mymoim");

  const tags = [
    {
      name: "나의 모임",
      value: "mymoim",
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

  const getMoim = async () => {
    if (!sub) return getMyMoimApi();
    if (sub === "mymoim") return getMyMoimApi();
    if (sub === "created") return getMyCreatedMoimApi();
    if (sub === "liked") return getMyLikedMoimApi();
    return {};
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["moim", searchParams.get("sub")],
    queryFn: getMoim,
    staleTime: 0,
  });

  if (isLoading) return null;
  if (error) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="lg:px-8">
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
                <MoimCard type="mypage" data={moim} />
                {data.length - 1 !== idx ? <hr className="my-4" /> : <br />}
              </div>
            );
          })
        ) : (
          <EmptyBlock type={sub as string} />
        )}
      </div>
    </Suspense>
  );
}
