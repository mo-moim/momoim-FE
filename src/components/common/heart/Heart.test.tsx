import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { motion } from "framer-motion";
import Heart from "@/components/common/heart/Heart";

jest.mock("framer-motion", () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
    svg: jest.fn(({ children, ...props }) => <svg {...props}>{children}</svg>),
  },
}));

describe("Heart Component", () => {
  it("하트모양 svg가 렌더링 되어야 한다", () => {
    render(<Heart likeTask={jest.fn()} isWishList={false} />);
    const heartIcon = screen.getByLabelText("Heart Component");
    expect(heartIcon).toBeInTheDocument();
  });

  it("클릭시 onClick 함수가 발동되면서 state가 토글되어야 한다", () => {
    render(<Heart likeTask={jest.fn()} isWishList={false} />);
    const heartContainer = screen.getByLabelText("Heart Component Wrapper");
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: expect.objectContaining({ scale: 1, rotate: 0 }),
      }),
      expect.anything(),
    );
    fireEvent.click(heartContainer);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: expect.objectContaining({ scale: 1.2 }),
      }),
      expect.anything(),
    );
  });

  it("isWishList가 true일 때 올바른 스타일을 적용해야 한다", () => {
    render(<Heart likeTask={jest.fn()} isWishList />);
    expect(motion.div).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: expect.objectContaining({ scale: 1.2 }),
      }),
      expect.anything(),
    );
    expect(motion.svg).toHaveBeenCalledWith(
      expect.objectContaining({
        animate: expect.objectContaining({ fill: "#FF0000" }),
      }),
      expect.anything(),
    );
  });
});
