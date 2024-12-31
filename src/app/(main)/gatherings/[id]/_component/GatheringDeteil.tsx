"use client";

import DetailCard from "@/components/common/cards/DetailCard";
import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";

export default function GatheringDeteil({ id }: { id: number }) {
  const data = useGetGatheringDetail(id);

  if (!data) {
    return <div>로딩중 표시하기</div>;
  }

  return <DetailCard detailData={data} />;
}
