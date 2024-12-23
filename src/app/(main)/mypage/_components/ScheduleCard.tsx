"use client";

import { ScheduleData } from "@/types/common/scheduleData";
import Image from "next/image";
import LocalIcon from "@/assets/svg/geography_map_solid.svg";
import Logo from "@/assets/svg/default-image.svg";
import { imageValidChecker } from "@/lib/imageValidChecker";
import { useRef, useState } from "react";
import { getCategory, getLocation, getSubcategory } from "@/lib/getLabel";
import { format } from "date-fns";
// import { postReviewApi } from "@/api/review";
// import ReviewPostSection from "./ReviewPostSection";

interface Props {
  data: ScheduleData;
}

export default function ScheduleCard({ data }: Props) {
  console.log(data);
  const [rating, setRating] = useState(0);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div className="max-w-[375px]">
      <div className="flex w-full items-center gap-2 py-2 sm:items-center">
        <div className="relative flex aspect-square h-[20%] w-[20%] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 xs:h-20 xs:w-20">
          {imageValidChecker(data?.gatheringImage) ? (
            <Image alt="thumbnail" src={data?.gatheringImage} layout="fill" objectFit="contain" />
          ) : (
            <Logo />
          )}
        </div>
        <div className="flex h-24 min-w-0 flex-grow flex-col justify-center gap-1 pl-2">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-main">{getCategory(data?.category)}</div>
            <div className="flex justify-between">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-lg font-bold">
                {data?.gatheringName}
              </div>
            </div>
            <div className="flex gap-1 text-xs text-gray-700">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{getSubcategory(data?.subCategory)}</div>
              <div>·</div>
              <div className="max-w-11 overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-full">
                {getLocation(data?.gatheringLocation)}
              </div>
              <div>·</div>
              <div className="text-main">{format(data?.nextGatheringAt, "MM월 dd일 hh:mm")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
