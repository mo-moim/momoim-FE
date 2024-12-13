import { DEFAULT_CHIP_STYLE, EACH_CHIP_STYLE } from "@/types/common/chip";

interface Props {
  status: string;
  gatheringType: string;
  isPeriodic?: boolean;
}

export default function Chips({ status, gatheringType, isPeriodic }: Props) {
  return (
    <div className="flex gap-1 text-sm">
      <div className={`${DEFAULT_CHIP_STYLE} ${EACH_CHIP_STYLE[status].fc} ${EACH_CHIP_STYLE[status].bg}`}>
        {EACH_CHIP_STYLE[status].font}
      </div>
      <div
        className={`${DEFAULT_CHIP_STYLE} ${EACH_CHIP_STYLE[gatheringType].fc} ${EACH_CHIP_STYLE[gatheringType].bg}`}
      >
        {EACH_CHIP_STYLE[gatheringType].font}
      </div>
      {isPeriodic && (
        <div className={`${DEFAULT_CHIP_STYLE} ${EACH_CHIP_STYLE.REGULAR.fc} ${EACH_CHIP_STYLE.REGULAR.bg}`}>
          {EACH_CHIP_STYLE.REGULAR.font}
        </div>
      )}
    </div>
  );
}
