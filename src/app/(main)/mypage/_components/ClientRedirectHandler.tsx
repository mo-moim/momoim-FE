"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function ClientRedirectHandler({ token }: { token: string | undefined }) {
  const router = useRouter();
  useEffect(() => {
    // 미들웨어 작업하기 전까지만 쓰자
    router.push("/");
  }, []);
  return <div />;
}
