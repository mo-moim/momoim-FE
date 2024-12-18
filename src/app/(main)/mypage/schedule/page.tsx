"use client";

import MoimCard from "@/components/common/cards/MoimCard";
import Tags from "@/components/common/Tags";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MySchedule() {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const sub = searchParams.get("sub");
  const [subcategory, setSubcategory] = useState(sub || "schedule-after");
  const tags = [
    {
      name: "다가올 일정",
      value: "schedule-after",
    },
    {
      name: "지난 일정",
      value: "schedule-before",
    },
  ];

  const data = {
    success: true,
    data: [
      {
        gatheringId: 0,
        image: "",
        name: "string",
        gatheringType: "OFFLINE",
        status: "OPEN",
        category: "string",
        subCategory: "string",
        location: "SEOUL",
        nextGatheringAt: "2024-12-15T11:15:08.021Z",
        tags: ["string"],
        capacity: 2,
        participantCount: 1,
        isWishlist: true,
        isPeriodic: true,
        members: [
          {
            gatheringMemberId: 0,
            userId: 0,
            email: "string",
            name: "string",
            profileImage: "string",
            joinedAt: "2024-12-15T11:15:08.021Z",
          },
        ],
      },
    ],
  };

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

      <MoimCard type="home" data={data.data[0]} />
    </div>
  );
}
