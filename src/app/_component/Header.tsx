import React from "react";
import Logo from "@/assets/svg/logo.svg";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/navigation";
import NavigationLink from "./NavigationLink";
import AuthButtons from "./AuthButtons";

export default function Header() {
  return (
    <header className="fixed w-full border-b bg-white">
      <nav className="mx-auto flex h-[80px] max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="hidden text-xl font-bold sm:flex">
            <Logo aria-label="Website Logo" />
          </Link>
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavigationLink href={item.href}>{item.label}</NavigationLink>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex items-center gap-4">
          <AuthButtons />
        </ul>
      </nav>
    </header>
  );
}
