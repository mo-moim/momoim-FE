"use client";

import Tags from "../../../../components/common/Tags";

export default function MySchedule() {
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

  return (
    <div className="px-[32px]">
      <Tags tags={tags} />
      <div>나의일정</div>
    </div>
  );
}
