"use client";

import { usePathname } from "next/navigation";
import TopButton from "./TopButton";
import CreateMoimButton from "./CreateMoimButton";

export default function ButtonPath() {
  const path = usePathname().split("/")[1];
  if (path === "mypage") return <TopButton />;
  return <CreateMoimButton />;
}
