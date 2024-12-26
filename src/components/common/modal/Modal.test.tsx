import { Modal } from "@/components/common/modal/Modal";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/button";

describe("모달 컴포넌트", () => {
  let mockClick: jest.Mock;

  beforeEach(() => {
    mockClick = jest.fn();
    render(
      <Modal
        title="모임 신청"
        content="해당 모임을 신청하시겠습니까?"
        triggerButton={<Button type="button">신청하기</Button>}
        onSubmit={mockClick}
      />,
    );
  });

  it("모달 컴포넌트를 사용하면 props에 맞는 트리거 버튼명이 렌더링 되어야 한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    expect(applyBtn).toBeInTheDocument();
  });

  it("트리거 버튼을 클릭하면 모달이 열려 해당 내용들이 렌더링 되어야 하고 취소버튼을 클릭하면 모달이 닫혀야한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    fireEvent.click(applyBtn);

    expect(applyBtn).toHaveAttribute("data-state", "open");

    const cancleBtn = screen.getByRole("button", { name: "취소" });
    expect(screen.getByText("해당 모임을 신청하시겠습니까?")).toBeInTheDocument();
    expect(cancleBtn).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();

    fireEvent.click(cancleBtn);
    expect(applyBtn).toHaveAttribute("data-state", "closed");
  });

  it("submit 버튼을 클릭하면 해당 onSubmit이 호출되어야 한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    const clickBtn = screen.getByRole("button", { name: "확인" });
    expect(clickBtn).toBeInTheDocument();
    fireEvent.click(clickBtn);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("X 아이콘을 클릭하면 모달이 닫혀야한다.", () => {
    const closeIcon = screen.getByRole("button", { name: "Close" });
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);
    expect(closeIcon).not.toBeInTheDocument();
  });
});
