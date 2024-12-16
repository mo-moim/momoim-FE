"use client";

import { User } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import DefaultProfile from "@/assets/svg/default-profile.svg";

interface ProfileButtonProps {
  user: User;
}

export default function ProfileButton({ user }: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const closePopover = () => setIsOpen(false);

  // 팝오버 외부 클릭 감지
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        closePopover();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
        <div className="relative h-7 w-7 overflow-hidden rounded-full">
          {user.profileImage === "DEFAULT_PROFILE_IMAGE" ? (
            <DefaultProfile width={28} height={28} />
          ) : (
            <Image src={user.profileImage} alt="프로필 이미지" fill sizes="28px" className="object-cover" />
          )}
        </div>
        <span className="hidden font-semibold xs:flex">{user.name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-32 rounded-md border border-gray-200 bg-white py-1 font-medium drop-shadow-base">
          <Link href="/mypage" className="flex items-center px-4 py-2 hover:text-main-selected" onClick={closePopover}>
            마이페이지
          </Link>
          <button
            type="button"
            className="flex w-full items-center px-4 py-2 font-medium hover:text-main-selected"
            onClick={() => {
              closePopover();
              // TODO:로그아웃 로직 추가
              console.log("로그아웃 처리");
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
