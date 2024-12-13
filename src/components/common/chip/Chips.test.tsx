import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EACH_CHIP_STYLE, DEFAULT_CHIP_STYLE } from "@/types/common/chip";
import Chips from "./Chips"; // 컴포넌트 경로 수정

jest.mock("@/types/common/chip", () => ({
  EACH_CHIP_STYLE: {
    OPEN: { font: "모집 중", fc: "text-white", bg: "bg-[#5a25e9]" },
    FULL: { font: "정원 초과", fc: "text-white", bg: "bg-[#C73465]" },
    CLOSED: { font: "접수 마감", fc: "text-gray-600", bg: "bg-gray-200" },
    CANCELED: { font: "모임 취소", fc: "text-[#C73465]", bg: "bg-[#FFE9F2]" },
    FINISHED: { font: "모임 종료", fc: "text-gray-600", bg: "bg-gray-200" },
    ONLINE: { font: "온라인", fc: "text-[#FF6C00]", bg: "bg-[#FFFDC3]" },
    OFFLINE: { font: "오프라인", fc: "text-[#6e3eea]", bg: "bg-[#fff2ef]" },
    REGULAR: { font: "정기 모임", fc: "text-[#00CB00]", bg: "bg-[#E6F8E7]" },
  },
  DEFAULT_CHIP_STYLE: "rounded-3xl px-2 py-1 font-bold sm:px-2 sm:py-1",
}));

describe("Chips Component", () => {
  it("최소 2가지 chip이 렌더링 되어야 한다", () => {
    render(<Chips status="OPEN" gatheringType="FULL" />);
    const chips = screen.getAllByText(/모집 중|정원 초과/);
    expect(chips.length).toBe(2);
  });

  it("isPeriodic이 true일 때 chip이 하나 더 렌더링 되어야 한다", () => {
    render(<Chips status="OPEN" gatheringType="FULL" isPeriodic />);
    const chip = screen.getByText("정기 모임");
    expect(chip).toBeInTheDocument();
  });

  it("isPeriodic이 false일 때 3번째 chip이 렌더링 되어선 안 된다", () => {
    render(<Chips status="OPEN" gatheringType="FULL" isPeriodic={false} />);
    const chip = screen.queryByText("정기 모임");
    expect(chip).not.toBeInTheDocument();
  });

  it("status와 gatheringType에 따른 올바른 스타일이 적용되어야 한다", () => {
    render(<Chips status="OPEN" gatheringType="FULL" />);
    const openChip = screen.getByText("모집 중");
    const fullChip = screen.getByText("정원 초과");
    expect(openChip).toHaveClass(`${DEFAULT_CHIP_STYLE} ${EACH_CHIP_STYLE.OPEN.fc} ${EACH_CHIP_STYLE.OPEN.bg}`);
    expect(fullChip).toHaveClass(`${DEFAULT_CHIP_STYLE} ${EACH_CHIP_STYLE.FULL.fc} ${EACH_CHIP_STYLE.FULL.bg}`);
  });

  it("isPeriodic이 true일 때 올바른 스타일이 적용된 칩이 렌더링 되어야 한다", () => {
    render(<Chips status="OPEN" gatheringType="FULL" isPeriodic />);
    const regularChip = screen.getByText("정기 모임");
    expect(regularChip).toHaveClass(
      `${DEFAULT_CHIP_STYLE} ${EACH_CHIP_STYLE.REGULAR.fc} ${EACH_CHIP_STYLE.REGULAR.bg}`,
    );
  });
});
