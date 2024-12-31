import { leftTimeGenerator } from "@/lib/leftTimeGenerator";
import { GatheringDetail } from "@/types/common/gatheringContent";
import Image from "next/image";
import Logo from "@/assets/svg/logo.svg";
import { format } from "date-fns";
import DefaultProfile from "@/assets/svg/default-profile.svg";
import LocalIcon from "@/assets/svg/geography_map_solid.svg";
import Person from "@/assets/svg/person.svg";
import DetailCardMember from "@/app/(main)/gatherings/[id]/_component/DetailCardMember";
import { getCategory, getOnlinePlatform, getSubcategory } from "@/lib/getLabel";
import DetailButton from "@/app/(main)/gatherings/[id]/_component/DetailButton";
import Chip from "../Chip";

export default function DetailCard({ detailData }: { detailData: GatheringDetail }) {
  const data = detailData.gatheringContent;
  const { hours, days } = leftTimeGenerator(data.nextGatheringAt as string);

  const getGatheringCheckTime = (day: number, time: number) => {
    if (!day && !time) {
      return <span className="text-lg font-semibold text-main">모임 진행중</span>;
    }
    if (!day && time > 0 && time < 1) {
      return <span className="text-lg font-semibold text-main">곧 시작!</span>;
    }
    return (
      <div className="flex items-center gap-1">
        <span>
          <span className="text-[32px] font-bold">{days}</span>일
        </span>
        <span>
          <span className="text-[32px] font-bold">{hours}</span>
          시간
        </span>
      </div>
    );
  };

  return (
    <div className="flex h-56 w-full flex-wrap items-center gap-4 max-lg:h-auto max-md:justify-center">
      <div className="relative flex h-56 w-full max-w-60 items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 max-md:max-w-full">
        {data?.image ? <Image alt="thumbnail" src={data.image} layout="fill" objectFit="cover" /> : <Logo />}
      </div>
      <div className="flex min-w-[27rem] flex-[3] flex-col justify-between gap-3 max-sm:min-w-full">
        <div className="w-full font-bold text-main">
          {getCategory(data.category)} ・ {getSubcategory(data.subCategory)}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-start">
            <div className="text-[26px] font-bold transition-all sm:text-[32px]">{data.name}</div>
          </div>
          <div className="flex w-full flex-col justify-start gap-1 text-sm text-gray-700">
            <div className="flex items-center gap-2 max-xs:gap-2">
              <LocalIcon />
              {data.location === "ONLINE" ? (
                <div className="flex-wrap">{getOnlinePlatform(data.address)}</div>
              ) : (
                <div className="flex-wrap">{data.address}</div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <div>{format(data.nextGatheringAt, "yyyy년 MM월 dd일 hh:mm")}</div>
              <div>·</div>
              <div className="flex">
                <div className="flex">
                  <Person />
                </div>
                {data.participantCount}/{data.capacity}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-sm">
            {[data.status, data.location, data.isPeriodic].map((each, idx) => {
              const key = `chip:${data.id}:${idx}`;
              if (typeof each === "boolean") {
                return each ? <Chip key={key} each="REGULAR" /> : null;
              }
              return <Chip key={key} each={each} />;
            })}
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center overflow-hidden rounded-full">
                {data.managerProfileImage === "DEFAULT_PROFILE_IMAGE" ? (
                  <DefaultProfile />
                ) : (
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt="managerProfileImage"
                    src={data.managerProfileImage || ""}
                  />
                )}
              </div>
              <div>{data.managerName}</div>
            </div>
            {data.managerId && (
              <DetailCardMember members={detailData.members} managerId={data.managerId} defaultView={false} />
            )}
          </div>
        </div>
      </div>
      <div className="flex h-full min-w-72 flex-[1.5] flex-col justify-between gap-6">
        {data.managerId && <DetailCardMember members={detailData.members} managerId={data.managerId} defaultView />}
        <div className="w-full">
          <div className="text-gray-500">남은 시간</div>
          {getGatheringCheckTime(days, hours)}
        </div>
        <DetailButton gatheringId={data.id} managerName={data.managerName} members={detailData.members} />
      </div>
    </div>
  );
}
