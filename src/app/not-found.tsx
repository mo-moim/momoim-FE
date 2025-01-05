"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotFoundPageLogo from "@/assets/images/notFoundPage.png";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mx-auto mt-36 flex w-[25rem] flex-col items-center justify-center gap-10">
      <h2 className="text-3xl font-medium">페이지를 찾을 수 없습니다</h2>
      <div className="svgBox h-[181px] w-[270px]">
        <Image src={NotFoundPageLogo} width={270} height={180} alt="Not-Found 이미지" />
      </div>
      <div className="flex h-52 w-full flex-col items-center justify-center gap-6 rounded-[20px] bg-gray-100">
        <p className="text-[22px] font-semibold text-black">페이지 주소를 다시 확인해주세요</p>
        <div className="flex items-center gap-4">
          <Button onClick={() => router.replace("/")}>홈으로 이동</Button>
          <Button onClick={() => router.back()}>뒤로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}
