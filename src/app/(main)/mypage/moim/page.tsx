"use client";

import { useEffect, useState } from "react";
import Card from "../_components/Card";
import FilterButton from "../_components/FilterButton";
import FilterButtonSection from "../_components/FilterButtonSection";

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
  const [moims, setMoims] = useState<Moim[]>([]);

  const categories = [
    {
      name: "전체",
      value: "all-moim",
    },
    {
      name: "내가 속한 모임",
      value: "belong",
    },
    {
      name: "내가 만든 모임",
      value: "created",
    },
  ];

  const data = [
    {
      name: "나는 코양이다 야옹",
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
      name: "나는 코양이다 야옹",
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
      name: "나는 코양이다 야옹",
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

  return (
    <div className="px-[32px]">
      <FilterButtonSection categories={categories} />
      {moims.map((moim, idx) => {
        return (
          <>
            <Card key={`card${Date.now()}`} moim={moim} />
            <hr className="my-[16px]" />
          </>
        );
      })}
    </div>
  );
}
