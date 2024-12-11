// type 종류
// home | detail | mypage | review | profile

import Chips from "@/components/common/Chips";
import ProgressBar from "@/components/common/ProgressBar";
import { dateFormatter } from "@/lib/dateFormatter";

interface Props {
  type: string;
  data?: Moim;
  onClickFunction?: () => void;
  customButton?: React.ReactNode;
}

interface Moim {
  id?: number;
  managerId?: number;
  managerName?: string;
  managerProfileImage?: string;
  category?: string;
  subCategory?: string;
  name?: string;
  gatheringType?: string;
  status?: string;
  image?: string;
  description?: string;
  address?: string;
  tags?: string[];
  location?: string;
  capacity?: number;
  participantCount?: number;
  isPeriodic?: boolean;
  nextGatheringAt?: string;
  members?: Members[];
  // api 완성되면 get으로 가져와서 설정
}

interface Members {
  gatheringMemberId: number;
  userId: number;
  email: string;
  name: string;
  profileImage: string;
  joinedAt: string;
}

export default function Card({ type, data, customButton, onClickFunction }: Props) {
  const handleTimeLeft = (timeStamp: string) => {
    const targetDate = Number(new Date(timeStamp));
    const currentDate = Number(new Date());
    const timeDifference = targetDate - currentDate;
    if (timeDifference > 0) {
      const millisecondsInSecond = 1000;
      const secondsInMinute = 60;
      const minutesInHour = 60;
      const hoursInDay = 24;
      const days = Math.floor(timeDifference / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay));
      const hours = Math.floor(
        (timeDifference % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) /
          (millisecondsInSecond * secondsInMinute * minutesInHour),
      );
      const minutes = Math.floor(
        (timeDifference % (millisecondsInSecond * secondsInMinute * minutesInHour)) /
          (millisecondsInSecond * secondsInMinute),
      );
      return { days, hours, minutes };
    }
    return { days: 0, hours: 0, minutes: 0 };
  };

  const cardStyle: { [key: string]: string[] } = {
    home: [
      "w-[366px] p-4",
      "relative flex h-60 w-full items-center overflow-hidden rounded-[20px] bg-gray-100",
      `flex w-full flex-col gap-2 px-2`,
      "",
      "flex justify-between py-2",
      "text-lg font-bold",
      "flex gap-1",
      "flex justify-end",
    ],
    mypage: [
      `flex w-full max-w-[1100px] items-start gap-2 p-3 sm:items-center`,
      `relative flex aspect-square h-[40%] w-[40%] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 sm:w-40 sm:min-w-40`,
      `flex w-full flex-col justify-center gap-1 pl-2`,
      "flex flex-col gap-1",
      `flex justify-between`,
      `text-lg font-bold`,
      `flex gap-1 text-sm text-gray-700 sm:text-base`,
      `flex justify-end text-sm`,
    ],
  };

  if (type === "detail") {
    return (
      <div className="flex flex-col gap-4 p-4 full:min-w-[1100px]">
        <div className="flex w-full flex-col items-center justify-center sm:flex-row">
          <div className="relative mx-2 flex h-60 w-full max-w-[375px] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 sm:max-w-60">
            <img alt="thumbnail" src={data?.image} />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full max-w-[375px] flex-col gap-4 p-2">
              {type === "detail" && <div className="w-full text-start font-bold text-main">{data?.category}</div>}
              <div className="flex flex-col gap-1">
                <div className="flex w-full justify-start">
                  <div className="text-[26px] font-bold sm:text-[32px]">{data?.name}</div>
                  {type !== "detail" && <div>하트</div>}
                </div>
                <div className="flex w-full justify-start gap-2 text-gray-700">
                  <div>{data?.subCategory}</div>
                  <div>·</div>
                  <div>{data?.location}</div>
                  <div>·</div>
                  <div>{dateFormatter(data?.nextGatheringAt as string).simple}</div>
                  <div>·</div>
                  <div>
                    {/* 여기에 사람모양아이콘 */}
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
                    <img src={data?.managerProfileImage} />
                  </div>
                  <div>{data?.managerName}</div>
                </div>
                <div className="flex gap-2.5 full:hidden">
                  <div className="flex gap-2.5">
                    {data?.members?.map((member, idx) => {
                      if (idx >= 3) return null;
                      return (
                        <div key={member?.userId} className="flex h-[34px] w-[34px] items-center rounded-full">
                          <img src={member.profileImage} />
                        </div>
                      );
                    })}
                  </div>
                  {/* 멤버창 컴포넌트 제작시 아래 위치에 버튼 대신 투입 - 1 */}
                  <button type="button">...</button>
                </div>
              </div>
            </div>
            <div className="hidden h-full w-[318px] flex-col gap-6 full:flex">
              <div className="flex gap-2.5">
                <div className="flex gap-2.5">
                  {data?.members?.map((member, idx) => {
                    if (idx >= 5) return null;
                    return (
                      <div key={member?.userId} className="flex h-[34px] w-[34px] items-center rounded-[50%]">
                        <img src={member.profileImage} alt={`Profile of ${member.name || idx}`} />
                      </div>
                    );
                  })}
                </div>
                {/* 멤버창 컴포넌트 제작시 아래 위치에 버튼 대신 투입 - 2 */}
                <button type="button">...</button>
              </div>
              <div className="flex hidden h-full justify-center full:block">
                <div className="w-full">
                  <div className="text-gray-500">남은 시간</div>
                  <div>
                    <span className="text-[32px] font-bold">
                      {handleTimeLeft(data?.nextGatheringAt as string).days}
                    </span>
                    일{" "}
                    <span className="text-[32px] font-bold">
                      {handleTimeLeft(data?.nextGatheringAt as string).hours}
                    </span>
                    시간
                  </div>
                </div>
              </div>
              {customButton}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center px-2 full:hidden">
          <div className="w-full">
            <div className="text-gray-500">남은 시간</div>
            <div>
              <span className="text-[32px] font-bold">{handleTimeLeft(data?.nextGatheringAt as string).days}</span>일{" "}
              <span className="text-[32px] font-bold">{handleTimeLeft(data?.nextGatheringAt as string).hours}</span>시간
            </div>
          </div>
          {customButton}
        </div>
      </div>
    );
  }

  if (type === "home" || type === "mypage") {
    return (
      <button
        type="button"
        className={cardStyle[type][0]}
        onClick={() => {
          if (onClickFunction) {
            onClickFunction();
          }
        }}
      >
        <div className={cardStyle[type][1]}>
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
          <img alt="아오" src={data?.image} />
        </div>
        <div
          className={`${cardStyle[type][2]} ${(data?.status === "CANCELED" || data?.status === "FINISHED" || (data?.status === "CLOSED" && type === "home")) && "opacity-30"}`}
        >
          <div className={cardStyle[type][3]}>
            <div className={cardStyle[type][4]}>
              <div className={cardStyle[type][5]}>{data?.name}</div>
              <div>하트</div>
            </div>
            <div className={cardStyle[type][6]}>
              <div>{data?.subCategory}</div>
              <div>·</div>
              <div>{data?.location}</div>
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
            <div className={cardStyle[type][7]}>
              <div>최대인원 {data?.capacity}명</div>
            </div>
          </div>
        </div>
      </button>
    );
  }
}
