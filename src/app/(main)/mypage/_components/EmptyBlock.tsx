interface Props {
  type: string;
}

export default function EmptyBlock({ type }: Props) {
  console.log(type);
  const section: { [key: string]: string } = {
    mymoim: "아직 모임에 참여하지 않았어요",
    created: "만든 모임이 없어요",
    liked: "찜한 모임이 없어요",
    unreview: "리뷰를 작성할 모임이 없어요",
    myreview: "작성한 리뷰가 없어요",
  };
  return (
    <div className="mb-4 flex h-[200px] w-full max-w-[1100px] items-center justify-center bg-gray-100">
      <div className="text-lg text-[#6b7280]">{section[type]}</div>
    </div>
  );
}
