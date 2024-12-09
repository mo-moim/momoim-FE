"use client";

import { usePathname, useRouter } from "next/navigation";

interface Props {
  tabs: Tab[];
}

interface Tab {
  name: string;
  value: string;
  path: string;
}

export default function Tabs({ tabs }: Props) {
  const router = useRouter();
  const path = usePathname();
  const slash = path.split("/");
  const id = slash[slash.length - 1].split("?")[0];
  return (
    <div className="flex gap-[16px] px-[24px]">
      {tabs.map((tab) => {
        return (
          <div key={tab.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                router.push(tab.path);
              }}
              className={`p-[16px] text-sm sm:text-base ${tab.value === id && "font-bold"}`}
            >
              {tab.name}
            </button>
            {tab.value === id && <div className="h-[2px] w-full bg-black" />}
          </div>
        );
      })}
    </div>
  );
}
