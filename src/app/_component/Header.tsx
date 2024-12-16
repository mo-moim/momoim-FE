import React from "react";
import Logo from "@/assets/svg/logo.svg";
import Link from "next/link";
import { cookies } from "next/headers";
import { serverAxios } from "@/lib/axios";
import AuthButtons from "./AuthButtons";
import ProfileButton from "./ProfileButton";

async function getUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");

    if (!token) return null;

    const response = await serverAxios.get("/api/auths/user");
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export default async function Header() {
  const user = await getUser();

  return (
    <header className="fixed z-50 w-full bg-white">
      <nav className="mx-auto flex h-[80px] max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex text-xl font-bold">
            <Logo aria-label="Website Logo" />
          </Link>
        </div>

        <ul className="flex items-center gap-4"> {user ? <ProfileButton user={user} /> : <AuthButtons />}</ul>
      </nav>
    </header>
  );
}
