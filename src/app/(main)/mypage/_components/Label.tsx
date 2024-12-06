interface Props {
  status: {
    type: string;
  };
}

interface EachStyle {
  font: string;
  fc: string;
  bg: string;
}

export default function Label({ status }: Props) {
  const labelStyle: { [key: string]: EachStyle } = {
    OPEN: {
      font: "모집 중",
      fc: "text-white",
      bg: "bg-[#5a25e9]",
    },
    FULL: {
      font: "정원초과",
      fc: "text-white",
      bg: "bg-[#5a25e9]",
    },
    CLOSED: {
      font: "모집 마감",
      fc: "text-gray-600",
      bg: "bg-gray-200",
    },
    CANCELED: {
      font: "모임 취소",
      fc: "text-gray-600",
      bg: "bg-gray-200",
    },
    FINISHED: {
      font: "모임 종료",
      fc: "text-gray-600",
      bg: "bg-gray-200",
    },
    ONLINE: {
      font: "온라인",
      fc: "text-[#7983CB]",
      bg: "bg-[#F1EFFC]",
    },
    OFFLINE: {
      font: "오프라인",
      fc: "text-[#6e3eea]",
      bg: "bg-[#fff2ef]",
    },
    REGULAR: {
      font: "정기 모임",
      fc: "text-[#C73465]",
      bg: "bg-[#FFE9F2]",
    },
    //   irregular: {
    //     font: "",
    //     fc: "text-[]",
    //     bg: "bg-[]",
    //   },
  };
  return (
    <div
      className={`rounded-[24px] px-[3%] py-[2%] text-[80%] font-bold sm:px-2 sm:py-1 sm:text-base ${labelStyle[status.type].fc} ${labelStyle[status.type].bg}`}
    >
      {labelStyle[status.type].font}
    </div>
  );
}
