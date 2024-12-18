"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <button type="button" className="p-1" onClick={handleBack}>
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
