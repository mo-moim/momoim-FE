import { ScheduleData } from "@/types/common/scheduleData";
import { format } from "date-fns";
import ScheduleCard from "./ScheduleCard";

interface Props {
  data: ScheduleData[];
  date: Date;
}

export default function ScheduleBox({ data, date }: Props) {
  const selected = format(date, "yyyy-MM-dd");
  let count = 0;
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-solid px-8 pb-6 pt-8 md:w-1/2">
      <div className="text-lg font-semibold">모임 일정 캘린더</div>
      <div className="h-full overflow-y-scroll scrollbar-hide">
        {data.map((item) => {
          if (selected === format(item.nextGatheringAt, "yyyy-MM-dd"))
            return (
              <div key={`key:${item.gatheringId}`} className={`${count !== 0 && "border-t border-solid"}`}>
                <ScheduleCard data={item} />
              </div>
            );

          count += 1;
          return null;
        })}
      </div>
    </div>
  );
}
