import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "@/components/common/progressbar/ProgressBar";
import { motion } from "framer-motion";

jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  },
}));

describe("ProgressBar Component", () => {
  it("progressed percentage를 사용해 적절한 width를 적용한다", () => {
    render(<ProgressBar percentage={50} />);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: expect.objectContaining({ width: "50%" }),
      }),
      expect.anything(),
    );
  });

  it("capacity와 participantCount를 사용하여 progress percentage를 계산한다", () => {
    render(<ProgressBar capacity={200} participantCount={100} />);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: expect.objectContaining({ width: "50%" }),
      }),
      expect.anything(),
    );
  });

  it("props가 없으면 progress가 렌더링 되지 않는다", () => {
    render(<ProgressBar />);
    const progressbar = screen.queryByLabelText("Progress Bar");
    expect(progressbar).not.toBeInTheDocument();
  });

  it("초기 width는 0으로 설정된다", () => {
    render(<ProgressBar percentage={75} />);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        initial: expect.objectContaining({ width: 0 }),
      }),
      expect.anything(),
    );
  });

  it("transition 속성이 제대로 전달된다", () => {
    render(<ProgressBar percentage={75} />);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        transition: expect.objectContaining({
          duration: 1.5,
          ease: "easeOut",
        }),
      }),
      expect.anything(),
    );
  });
});
