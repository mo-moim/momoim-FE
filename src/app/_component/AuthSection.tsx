import React from "react";
import { useUser } from "@/queries/auth/useUser";
import { useAuthStore } from "@/store/useAuthStore";
import AuthButtons from "./AuthButtons";
import ProfileButton from "./ProfileButton";

export default function AuthSection() {
  const { data: user, isLoading } = useUser();
  const { isLoggedIn } = useAuthStore();

  // isLoading 중이거나, 로그인 상태인데 아직 user 데이터가 없는 경우 null 반환
  if (isLoading || (isLoggedIn && !user)) return null;

  return <ul className="flex items-center gap-4">{user ? <ProfileButton user={user} /> : <AuthButtons />}</ul>;
}
