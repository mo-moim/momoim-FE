"use client";

import { useUser } from "@/queries/auth/useUser";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const CREATE_GATHERING_URL = "/gatherings/create";

export default function CreateMoimButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();

  if (isLoading || !user || pathname === CREATE_GATHERING_URL) return null;

  return (
    <button
      type="button"
      className="group fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-main drop-shadow-[0_0_10px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out hover:w-36"
      onClick={() => router.push(CREATE_GATHERING_URL)}
    >
      <Plus className="h-6 w-6 text-white" />
      <span className="w-0 overflow-hidden whitespace-nowrap font-semibold text-white transition-all duration-300 group-hover:w-24">
        모임 만들기
      </span>
    </button>
  );
}
