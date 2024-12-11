import { Modal } from "@/components/common/modal/Modal";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MODAL_INFO, ModalOption, ModalType } from "@/types/common/modal";

describe("모달 컴포넌트", () => {
  let data: Record<ModalType, Partial<Record<ModalOption, string>>>;

  beforeEach(() => {
    data = MODAL_INFO;
  });

  it("해당 type props를 지정하면 그에 맞는 트리거 버튼명이 렌더링 되어야 한다.", () => {
    render(<Modal type="apply" />);
    const applyBtn = screen.getByRole("button", { name: data.apply.trigger_btn });
    expect(applyBtn).toBeInTheDocument();

    render(<Modal type="review" />);
    const reviewBtn = screen.getByRole("button", { name: data.review.trigger_btn });
    expect(reviewBtn).toBeInTheDocument();
  });

  it("트리거 버튼을 클릭하면 모달이 열리고 해당 모달의 내용들이 렌더링 되어야 한다.", () => {
    render(<Modal type="apply" />);

    const applyBtn = screen.getByRole("button", { name: data.apply.trigger_btn });
    fireEvent.click(applyBtn);

    if (data.apply.description) {
      expect(screen.getByText(data.apply.description)).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: data.apply.submit_btn })).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();

    render(<Modal type="review" />);

    const reviewBtn = screen.getByRole("button", { name: data.review.trigger_btn });
    fireEvent.click(reviewBtn);

    if (data.review.title) {
      expect(screen.getByText(data.review.title)).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: data.review.submit_btn })).toBeInTheDocument();
  });

  it("submit 버튼을 클릭하면 해당 onSubmit이 호출되어야 한다.", () => {
    const mockSubmit = jest.fn();
    render(<Modal type="apply" onSubmit={mockSubmit} />);

    const applyBtn = screen.getByRole("button", { name: data.apply.trigger_btn });
    fireEvent.click(applyBtn);

    const submitBtn = screen.getByRole("button", { name: data.apply.submit_btn });
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("title이 없는 경우 제목 없음이 렌더링되어야 한다", () => {
    render(<Modal type="apply" />);

    const applyBtn = screen.getByRole("button", { name: data.apply.trigger_btn });
    fireEvent.click(applyBtn);
    expect(screen.getByText("제목 없음")).toBeInTheDocument();
  });

  it("member type일때 footer 버튼들이 렌더링 되지 않아야 한다.", () => {
    render(<Modal type="member" />);

    const memberBtn = screen.getByRole("button", { name: data.member.trigger_btn });
    fireEvent.click(memberBtn);
    expect(screen.queryByText("취소")).not.toBeInTheDocument();
  });

  it("모달이 열리고 취소 버튼과 X아이콘을 클릭하면 모달이 닫혀야한다.", () => {
    render(<Modal type="apply" />);

    const applyBtn = screen.getByRole("button", { name: data.apply.trigger_btn });
    fireEvent.click(applyBtn);

    const cancleBtn = screen.getByRole("button", { name: "취소" });
    expect(cancleBtn).toBeInTheDocument();
    const closeIcon = screen.getByRole("button", { name: "Close" });
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(cancleBtn);
    expect(cancleBtn).not.toBeInTheDocument();
    fireEvent.click(closeIcon);
    expect(closeIcon).not.toBeInTheDocument();
  });
});
