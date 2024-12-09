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
  const currentId = path.split("/").pop()?.split("?")[0] ?? "";
  return (
    <div className="flex gap-4 px-6">
      {tabs.map((tab) => {
        const isSelected = tab.value === currentId;
        return (
          <div key={tab.value} className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                router.push(tab.path);
              }}
              className={`p-3 text-sm sm:text-base ${isSelected && "font-bold"}`}
            >
              {tab.name}
            </button>
            {isSelected && <div className="h-0.5 w-full bg-black" />}
          </div>
        );
      })}
    </div>
  );
}
