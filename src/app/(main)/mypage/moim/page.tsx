"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "../_components/Card";
import Tags from "../../../../components/common/Tags";

interface Moim {
  // api 완성되면 get으로 가져와서 설정
  name: string;
  category: string;
  subCategory: string;
  location: string;
  nextGatheringAt: string;
  gatheringType: string;
  status: string;
  isPeriodic: boolean;
  capacity: number;
  participantCount: number;
}

export default function MyMoim() {
  const searchParams = useSearchParams();
  const [moims, setMoims] = useState<Moim[]>([]);

  const tags = [
    {
      name: "나의 모임",
      value: "belong",
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

  const data = [
    {
      name: "코엑스에서 만나요",
      category: "취미",
      subCategory: "축구",
      location: "SEOUL",
      nextGatheringAt: "2024-12-04T07:05:21.522Z",
      gatheringType: "OFFLINE",
      status: "CLOSED",
      isPeriodic: true,
      capacity: 20,
      participantCount: 10,
    },
    {
      name: "코엑스에서 만나요",
      category: "취미",
      subCategory: "축구",
      location: "SEOUL",
      nextGatheringAt: "2024-12-04T07:05:21.522Z",
      gatheringType: "OFFLINE",
      status: "FINISHED",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
    },
    {
      name: "코엑스에서 만나요",
      category: "취미",
      subCategory: "축구",
      location: "SEOUL",
      nextGatheringAt: "2024-12-04T07:05:21.522Z",
      gatheringType: "OFFLINE",
      status: "CANCELED",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
    },
  ];

  useEffect(() => {
    setMoims(data); // api 완성되면 get으로 가져와서 설정
  }, []);

  useEffect(() => {
    console.log(searchParams.get("filter"));
    // 이걸 기반으로 get해온다
  }, [searchParams]);

  return (
    <div className="px-[24px]">
      <Tags tags={tags} />
      {moims.map((moim, idx) => {
        return (
          <>
            {/* 이거 key 고쳐야함 */}
            <Card key={`card${Date.now()}`} moim={moim} />
            <hr className="my-[16px]" />
          </>
        );
      })}
    </div>
  );
}
