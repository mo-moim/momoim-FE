// TabSection이랑 같이 사용하세요

"use client";

interface Props {
  type: string;
  func: (type: string) => string | undefined;
  condition: string;
}

export default function Tab({ type, func, condition }: Props) {
  const label: { [key: string]: string } = {
    schedule: "나의 일정",
    review: "나의 리뷰",
    moim: "나의 모임",
    // 이곳에 탭 내용들을 추가
  };
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => {
          func(type);
        }}
        className={`p-[16px] text-sm sm:text-base ${condition === type && "font-bold"}`}
      >
        {label[type]}
      </button>
      {condition === type && <div className="h-[2px] w-full bg-black" />}
    </div>
  );
}
