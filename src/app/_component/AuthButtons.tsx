"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthButtons() {
  const pathname = usePathname();

  // 로그인 페이지에서는 회원가입만 보임
  if (pathname === "/login") {
    return (
      <li>
        <Link href="/signup" className="font-semibold text-main hover:text-main-selected">
          회원가입
        </Link>
      </li>
    );
  }

  // 회원가입 페이지에서는 로그인만 보임
  if (pathname === "/signup") {
    return (
      <li>
        <Link href="/login" className="font-semibold text-gray-900 hover:text-main-selected">
          로그인
        </Link>
      </li>
    );
  }

  // 다른 페이지에서는 모바일에서 로그인만, 데스크탑에서 둘 다 보임
  return (
    <>
      <li>
        <Link href="/login" className="font-semibold text-gray-900 hover:text-main-selected">
          로그인
        </Link>
      </li>
      <li className="hidden sm:block">
        <Link href="/signup" className="font-semibold text-main hover:text-main-selected">
          회원가입
        </Link>
      </li>
    </>
  );
}
