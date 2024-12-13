// type 종류
// home | detail | mypage | review | profile

import Chips from "@/components/common/chip/Chips";
import ProgressBar from "@/components/common/progressbar/ProgressBar";
import Heart from "@/components/common/heart/Heart";
import { dateFormatter } from "@/lib/dateFormatter";
import { leftTimeGenerator } from "@/lib/leftTimeGenerator";
import { MOIM_CARD_STYLE } from "@/types/common/moimCard";
import { GatheringContent } from "@/types/common/gatheringContent";
import { Members } from "@/types/common/members";
import DefaultProfile from "../../../assets/svg/default-profile.svg";
import LocalIcon from "../../../assets/svg/geography_map_solid.svg";
import Person from "../../../assets/svg/person.svg";

interface Props {
  type: string;
  data: GatheringContent;
  isWishList: boolean;
  likeTask?: () => void;
  members?: Members[];
  customOnClick?: () => void;
  customButton?: React.ReactNode;
}

export default function MoimCard({ type, data, members, customButton, customOnClick, isWishList, likeTask }: Props) {
  const handleClickToEnter = customOnClick || (() => {});
  const handleLike = likeTask || (() => {});

  if (type === "detail") {
    return (
      <div className="flex flex-col items-center gap-4 p-4 blg:w-[1100px]">
        <div className="flex w-full flex-col items-center justify-center sm:flex-row">
          <div className="relative mx-2 flex h-60 w-full max-w-[375px] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 sm:max-w-60">
            <img alt="thumbnail" src={data?.image} />
          </div>
          <div className="flex w-full items-center justify-center sm:justify-between">
            <div className="flex w-full max-w-[375px] flex-col gap-4 p-2 sm:max-w-full">
              <div className="w-full text-start font-bold text-main">{data?.category}</div>
              <div className="flex flex-col gap-1">
                <div className="flex w-full justify-start">
                  <div className="text-overflow text-[26px] font-bold sm:text-[32px]">{data?.name}</div>
                </div>
                <div className="flex w-full justify-start gap-1 text-xs text-gray-700">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.subCategory}</div>
                  <div>·</div>
                  <div className="flex">
                    <div className="flex items-center">
                      <LocalIcon />
                    </div>
                    <div className="max-w-11 overflow-hidden text-ellipsis whitespace-nowrap xs:max-w-16 md:max-w-full">
                      {data?.location}
                    </div>
                  </div>
                  <div>·</div>
                  <div>{dateFormatter(data?.nextGatheringAt as string).simple}</div>
                  <div>·</div>
                  <div className="flex">
                    <div className="flex">
                      <Person />
                    </div>
                    {data?.participantCount}/{data?.capacity}
                  </div>
                </div>
                <div>
                  {data?.status && data?.gatheringType && (
                    <Chips status={data?.status} gatheringType={data?.gatheringType} isPeriodic={data?.isPeriodic} />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex h-[34px] w-[34px] items-center rounded-full">
                    {data?.managerProfileImage ? <img src={data?.managerProfileImage} /> : <DefaultProfile />}
                    <img src={data?.managerProfileImage} />
                  </div>
                  <div>{data?.managerName}</div>
                </div>
                {/* 멤버창 컴포넌트 별도제작시 아래 div 대신 투입 - 1 */}
                <div className="flex gap-2.5 lg:hidden">
                  <div className="flex gap-2.5">
                    {members?.map((member, idx) => {
                      if (idx >= 3) return null;
                      return (
                        <div key={member?.userId} className="flex h-[34px] w-[34px] items-center rounded-full">
                          {member.profileImage ? <img src={member.profileImage} /> : <DefaultProfile />}
                        </div>
                      );
                    })}
                  </div>
                  <button type="button">...</button>
                </div>
                {/* @@@ */}
              </div>
            </div>
            <div className="hidden h-full w-[318px] flex-col gap-6 lg:flex">
              {/* 멤버창 컴포넌트 제작시 아래 div 대신 투입 - 2 */}
              <div className="flex gap-2.5">
                <div className="flex gap-2.5">
                  {members?.map((member, idx) => {
                    if (idx >= 5) return null;
                    return (
                      <div key={member?.userId} className="flex h-[34px] w-[34px] items-center rounded-[50%]">
                        {member.profileImage ? <img src={member.profileImage} /> : <DefaultProfile />}
                      </div>
                    );
                  })}
                </div>
                <button type="button">...</button>
              </div>
              {/* @@@ */}
              <div className="hidden h-full justify-center lg:flex">
                <div className="w-full">
                  <div className="text-gray-500">남은 시간</div>
                  <div>
                    <span className="text-[32px] font-bold">
                      {leftTimeGenerator(data?.nextGatheringAt as string).days}
                    </span>
                    일{" "}
                    <span className="text-[32px] font-bold">
                      {leftTimeGenerator(data?.nextGatheringAt as string).hours}
                    </span>
                    시간
                  </div>
                </div>
              </div>
              {customButton}
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-[375px] flex-col items-center justify-center px-2 sm:max-w-full lg:hidden">
          <div className="w-full">
            <div className="text-gray-500">남은 시간</div>
            <div>
              <span className="text-[32px] font-bold">{leftTimeGenerator(data?.nextGatheringAt as string).days}</span>일{" "}
              <span className="text-[32px] font-bold">{leftTimeGenerator(data?.nextGatheringAt as string).hours}</span>
              시간
            </div>
          </div>
          {customButton}
        </div>
      </div>
    );
  }

  if (type === "home" || type === "mypage") {
    return (
      <button type="button" className={MOIM_CARD_STYLE[type][0]} onClick={handleClickToEnter}>
        <div className={MOIM_CARD_STYLE[type][1]}>
          {["CANCELED", "FINISHED"].includes(data?.status as string) ||
          (data?.status === "CLOSED" && type === "home") ? (
            <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.4)] text-center text-white">
              {{
                CANCELED: "취소된 모임",
                CLOSED: "마감 되었어요",
                FINISHED: "종료된 모임",
              }[data?.status as string] || ""}
            </div>
          ) : null}
          <img alt="thumbnail" src={data?.image} />
        </div>
        <div
          aria-label="dividing-point"
          className={`${MOIM_CARD_STYLE[type][2]} ${(data?.status === "CANCELED" || data?.status === "FINISHED" || (data?.status === "CLOSED" && type === "home")) && "opacity-30"}`}
        >
          <div className={MOIM_CARD_STYLE[type][3]}>
            <div className={MOIM_CARD_STYLE[type][4]}>
              <div className={MOIM_CARD_STYLE[type][5]}>{data?.name}</div>
              <div className="pt-1">
                <Heart likeTask={handleLike} isWishList={isWishList} />
              </div>
            </div>
            <div className={MOIM_CARD_STYLE[type][6]}>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.subCategory}</div>
              <div>·</div>
              <div className="flex">
                <div className="flex items-center">
                  <LocalIcon />
                </div>
                <div className={MOIM_CARD_STYLE[type][7]}>{data?.location}</div>
              </div>
              <div>·</div>
              <div>{dateFormatter(data?.nextGatheringAt as string).simple}</div>
            </div>
            <div>
              {data?.status && data?.gatheringType && (
                <Chips status={data?.status} gatheringType={data?.gatheringType} isPeriodic={data?.isPeriodic} />
              )}
            </div>
          </div>
          <div>
            <div>
              <ProgressBar participantCount={data?.participantCount} capacity={data?.capacity} />
            </div>
            <div className={MOIM_CARD_STYLE[type][8]}>
              <div>최대인원 {data?.capacity}명</div>
            </div>
          </div>
        </div>
      </button>
    );
  }
}
