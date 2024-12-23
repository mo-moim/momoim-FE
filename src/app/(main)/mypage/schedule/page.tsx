"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ScheduleData } from "@/types/common/scheduleData";
import { useQuery } from "@tanstack/react-query";
import { getScheduleApi } from "@/api/schedule";
import ScheduleBox from "../_components/ScheduleBox";
import { Calendar } from "../_components/Calendar";

export default function MySchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentDate, setCurrentDate] = React.useState<Date | undefined>(new Date());

  const getSchedules = async () => {
    const data = await getScheduleApi(currentYear);
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["schedule", currentYear],
    queryFn: getSchedules,
    staleTime: 0,
  });

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  };

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="pb-8 lg:px-8">
      <div className="flex w-full flex-col gap-6 pt-6 md:flex-row">
        <Calendar
          className="flex-grow overflow-hidden md:w-1/2"
          mode="single"
          selected={currentDate}
          onSelect={setCurrentDate}
          onDateChange={handleDateChange}
          onYearChange={handleYearChange}
          formatters={{
            formatCaption: (date) => format(date, "yyyy년 MM월", { locale: ko }), // 날짜 형식 지정
            formatWeekdayName: (day) => format(day, "EEEEE", { locale: ko }), // 요일 한글 표시 (월, 화, 수...)
          }}
          customContent={data.map((item: ScheduleData) => {
            const fullDate = format(item.nextGatheringAt, "yyyy/MM/dd").split("/");
            const [year, month, day] = fullDate;
            return { date: new Date(+year, +month - 1, +day), content: "exsist" };
          })}
        />
        <ScheduleBox data={data} date={selectedDate} />
      </div>
    </div>
  );
}
