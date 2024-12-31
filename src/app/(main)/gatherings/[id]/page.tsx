"use client";

import { useParams } from "next/navigation";
import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";
import Viewer from "./_component/DetailViewer";

export default function GatheringDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const data = useGetGatheringDetail(id);
  const description = data?.gatheringContent.description;

  if (!description) return null;

  return (
    <div className="w-full max-md:w-full">
      <Viewer content={description} />
    </div>
  );
}
