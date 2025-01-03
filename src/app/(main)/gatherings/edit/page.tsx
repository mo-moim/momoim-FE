"use client";

import { useGetGatheringDetail } from "@/queries/gatherings-workspace/useGatheringDetail";
import { useSearchParams } from "next/navigation";
import GatheringForm from "../create/_component/GatheringForm";
import FormLayout from "../_component/FormLayout";

export default function GetheringEdit() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const data = useGetGatheringDetail(Number(id));
  const defaultContentData = data?.gatheringContent;

  if (defaultContentData) {
    localStorage.setItem("defaultContentData", JSON.stringify(defaultContentData));
  }

  return (
    <FormLayout title="모임 수정하기">
      <GatheringForm mode="edit" id={Number(id)} />
    </FormLayout>
  );
}
