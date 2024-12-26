"use client";

import { ArrowUpToLine } from "lucide-react";

export default function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      type="button"
      className="group fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(90,37,233,0.5)] drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]"
      onClick={scrollToTop}
    >
      <ArrowUpToLine className="text-white" />
    </button>
  );
}
