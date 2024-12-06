"use client";

import FilterButtonSection from "../_components/FilterButtonSection";

export default function MySchedule() {
  const categories = [
    {
      name: "지난 일정",
      value: "schedule-before",
    },
    {
      name: "다가올 일정",
      value: "schedule-after",
    },
  ];

  return (
    <div className="px-[32px]">
      <FilterButtonSection categories={categories} />
      <div>나의일정</div>
    </div>
  );
}
