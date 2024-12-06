import Label from "./Label";

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

interface Props {
  moim: Moim;
}

export default function Card({ moim }: Props) {
  const dateFormatter = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedDateSimple = `${month}월 ${day}일 ${hours}:${minutes}`;
    const formattedDateDetail = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    return { simple: formattedDateSimple, detail: formattedDateDetail };
  };

  return (
    <div className="relative flex w-full justify-between border-2 border-white text-xs sm:text-base">
      {(moim.status === "CANCELED" || moim.status === "FINISHED") && (
        <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-[20px] bg-[rgba(0,0,0,0.4)]">
          <button
            type="button"
            className="flex flex-col items-center justify-center text-center text-base text-white hover:text-[#5A25E9]"
          >
            <div>{moim.status === "CANCELED" ? "모임이 취소되었어요" : "모임이 종료되었어요"}</div>
            <div>모임을 지우시겠어요?</div>
          </button>
        </div>
      )}
      <div className="flex w-full items-start">
        <div className="relative my-[16px] flex aspect-square w-[40%] items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-[#F0F1F6] sm:h-[160px] sm:w-[160px] sm:min-w-[160px]">
          {(moim.status === "CANCELED" || moim.status === "FINISHED") && (
            <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.4)] text-center text-white">
              {moim.status === "CANCELED" ? "취소된 모임" : "종료된 모임"}
            </div>
          )}
          <img src="https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png" />
        </div>
        <div
          className={`relative my-[16px] flex h-[128px] w-full flex-col justify-between px-[16px] ${(moim.status === "CANCELED" || moim.status === "FINISHED") && "opacity-30"}`}
        >
          <div className="flex justify-between">
            <div className="text-[16px] font-bold sm:text-[18px]">{moim.name}</div>
            <div>하트</div>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <div>{moim.category}</div>
            <div>·</div>
            <div>{moim.location}</div>
            <div>·</div>
            <div>{dateFormatter(moim.nextGatheringAt).simple}</div>
          </div>
          <div className="flex gap-2">
            <Label status={{ type: moim.status }} />
            <Label status={{ type: moim.gatheringType }} />
            {moim.isPeriodic && <Label status={{ type: "REGULAR" }} />}
          </div>
          <div className="flex justify-between">
            <div className="my-2 flex gap-1">
              <img className="h-[24px] w-[24px]" src="https://i.ibb.co/RptgwQX/shape.png" />
              <img className="h-[24px] w-[24px]" src="https://i.ibb.co/RptgwQX/shape.png" />
              <img className="h-[24px] w-[24px]" src="https://i.ibb.co/RptgwQX/shape.png" />
            </div>
            <div className="flex items-center">인원</div>
          </div>
        </div>
      </div>
    </div>
  );
}
