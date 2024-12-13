import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Tabs from "@/components/common/tab/Tabs";
import { useRouter, usePathname } from "next/navigation";
import sectionSlider from "@/lib/sectionSlider";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/lib/sectionSlider");

describe("Tabs Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (usePathname as jest.Mock).mockReturnValue("/mypage");
  });

  const tabs = [
    { name: "마이페이지", value: "mypage", path: "/mypage" },
    { name: "Tab 2", value: "tab2", path: "/tab2" },
    { name: "Tab 3", value: "tab3", path: "/tab3" },
  ];

  beforeEach(() => {
    render(<Tabs tabs={tabs} />);
  });

  it("모든 탭이 렌더링 되어야 한다", () => {
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.name)).toBeInTheDocument();
    });
  });

  it("/mypage path에 해당하는 탭은 font-bold 클래스를 받아야 한다", () => {
    expect(screen.getByText("마이페이지")).toHaveClass("font-bold");
    expect(screen.getByText("Tab 2")).not.toHaveClass("font-bold");
  });

  it("Tab 2 클릭 시 router.push가 '/tab2'로 호출되어야 한다.", () => {
    fireEvent.click(screen.getByText("Tab 2"));
    expect(mockPush).toHaveBeenCalledWith("/tab2");
  });

  it("sectionSlider가 탭 wrapper 영역에 onMouseDown 시 호출되어야 한다", () => {
    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(firstButton);
    expect(sectionSlider).toHaveBeenCalled();
  });
});
