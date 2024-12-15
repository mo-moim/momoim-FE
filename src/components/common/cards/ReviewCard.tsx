import { dateFormatter } from "@/lib/dateFormatter";
import { useEffect, useRef, useState } from "react";
import Stars from "../Star";

interface Props {
  review: Review;
  isWriter: boolean;
}

interface Review {
  reviewId: number;
  writerId: number;
  writer: string;
  writerProfileImage: string;
  title: string;
  comment: string;
  score: number;
  createdAt: string;
}

export default function ReviewCard({ review, isWriter }: Props) {
  const reviewRef = useRef<HTMLDivElement>(null);
  const [longComment, setLongComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function timeAgo(dateString: string) {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMillis = Number(currentDate) - Number(givenDate);
    const differenceInDays = Math.floor(differenceInMillis / (24 * 60 * 60 * 1000));
    const differenceInHours = Math.floor(differenceInMillis / (60 * 60 * 1000));
    const differenceInMinutes = Math.floor(differenceInMillis / (60 * 1000));
    if (differenceInDays >= 1) return `${differenceInDays}일 전`;
    if (differenceInHours >= 1) return `${differenceInHours}시간 전`;
    return `${differenceInMinutes}분 전`;
  }
  useEffect(() => {
    if (reviewRef.current) {
      // 이건 변화에 따라 useEffect로 계속 관리해줘야할 수도 있다
      if (reviewRef.current.scrollHeight > reviewRef.current.clientHeight) {
        setLongComment(true);
      }
    }
  }, []);
  return (
    <div className="flex w-full max-w-[1100px] flex-col items-start gap-2 py-4 sm:items-center">
      <div className="flex w-full justify-between">
        <div className="text-lg font-bold text-gray-900">{review.title}</div>
        <div>
          <Stars score={review.score} />
        </div>
      </div>
      <div className="relative w-full">
        <div
          ref={reviewRef}
          className={`flex w-full flex-col justify-start overflow-y-hidden text-start transition-all duration-300 ${isExpanded ? "h-auto" : "h-24"}`}
        >
          {review.comment}
        </div>
        {isExpanded && <br />}
        {longComment && (
          <div
            className={`absolute bottom-0 flex h-20 w-full items-end justify-end ${!isExpanded && "bg-gradient-to-t from-white via-transparent to-transparent"} text-center`}
          >
            <button
              type="button"
              className="cursor-pointer font-bold text-main"
              onClick={() => {
                if (reviewRef.current) {
                  setIsExpanded(!isExpanded);
                }
              }}
            >
              {isExpanded ? "접기" : "펼치기"}
            </button>
          </div>
        )}
      </div>
      <div className="flex w-full justify-between text-xs text-gray-500 xs:text-sm">
        <div className="flex gap-2.5">
          <div className="hidden xs:block">{dateFormatter(review.createdAt).detail}</div>
          <div className="block xs:hidden">{dateFormatter(review.createdAt).simple}</div>
          {isWriter && (
            <>
              <button type="button">수정</button>
              <button type="button">삭제</button>
            </>
          )}
        </div>
        <div className="flex gap-2.5">
          <div className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap">{review.writer}</div>
          <div>{timeAgo(review.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
