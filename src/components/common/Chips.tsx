interface Props {
  status: string;
  gatheringType: string;
  isPeriodic: boolean;
}

interface ChipStyle {
  font: string;
  fc: string;
  bg: string;
}

export default function Chips({ status, gatheringType, isPeriodic }: Props) {
  const defaultChipStyle = "rounded-3xl px-2 py-1 font-bold text-[80%] sm:px-2 sm:py-1 sm:text-base";
  const labelStyle: { [key: string]: ChipStyle } = {
    OPEN: {
      font: "모집 중",
      fc: "text-white",
      bg: "bg-[#5a25e9]",
    },
    FULL: {
      font: "정원 초과",
      fc: "text-white",
      bg: "bg-[#C73465]",
    },
    CLOSED: {
      font: "접수 마감",
      fc: "text-gray-600",
      bg: "bg-gray-200",
    },
    CANCELED: {
      font: "모임 취소",
      fc: "text-[#C73465]",
      bg: "bg-[#FFE9F2]",
    },
    FINISHED: {
      font: "모임 종료",
      fc: "text-gray-600",
      bg: "bg-gray-200",
    },
    ONLINE: {
      font: "온라인",
      fc: "text-[#FF6C00]",
      bg: "bg-[#FFFDC3]",
    },
    OFFLINE: {
      font: "오프라인",
      fc: "text-[#6e3eea]",
      bg: "bg-[#fff2ef]",
    },
    REGULAR: {
      font: "정기 모임",
      fc: "text-[#00CB00]",
      bg: "bg-[#E6F8E7]",
    },
  };
  return (
    <div className="flex gap-1">
      <div className={`${defaultChipStyle} ${labelStyle[status].fc} ${labelStyle[status].bg}`}>
        {labelStyle[status].font}
      </div>
      <div className={`${defaultChipStyle} ${labelStyle[gatheringType].fc} ${labelStyle[gatheringType].bg}`}>
        {labelStyle[gatheringType].font}
      </div>
      {isPeriodic && (
        <div className={`${defaultChipStyle} ${labelStyle.REGULAR.fc} ${labelStyle.REGULAR.bg}`}>
          {labelStyle.REGULAR.font}
        </div>
      )}
    </div>
  );
}
