import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tags from "@/components/common/tag/Tags";
import { useRouter } from "next/navigation";
import sectionSlider from "@/lib/sectionSlider";
import { Button } from "@/components/ui/button"; // 버튼 컴포넌트

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue("/test/path"),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams("sub=1")), // 쿼리 파라미터 설정
}));

jest.mock("@/lib/sectionSlider");

describe("Tags Component", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    render(
      <Tags
        tags={[
          { name: "Tag 1", value: "1" },
          { name: "Tag 2", value: "2" },
          { name: "Tag 3", value: "3" },
        ]}
      />,
    );
  });

  it("태그 버튼들이 렌더링되어야 한다", () => {
    expect(screen.getByText("Tag 1")).toBeInTheDocument();
    expect(screen.getByText("Tag 2")).toBeInTheDocument();
    expect(screen.getByText("Tag 3")).toBeInTheDocument();
  });

  it("쿼리 파라미터 설정에 따라 스타일이 변경되어야 한다", () => {
    const activeTag = screen.getByText("Tag 1");
    expect(activeTag).toHaveClass("bg-gray-300 font-bold text-main");
    const inactiveTag = screen.getByText("Tag 2");
    expect(inactiveTag).toHaveClass("bg-gray-100");
  });

  it("sectionSlider가 onMouseDown 시 호출되어야 한다", () => {
    const firstButton = screen.getAllByRole("button")[0];
    fireEvent.mouseDown(firstButton);
    expect(sectionSlider).toHaveBeenCalled();
  });

  it("Tag 2 버튼 클릭 시 router.push 가 호출되어야 한다", async () => {
    const tagButton = screen.getByText("Tag 2");
    fireEvent.click(tagButton);
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/test/path?sub=2");
    });
  });
});
