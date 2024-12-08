"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`font-medium ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>
      {children}
    </Link>
  );
}
