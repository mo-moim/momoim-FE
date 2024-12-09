"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  tags: Tag[];
}

interface Tag {
  name: string;
  value: string;
}

export default function Tags({ tags }: Props) {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("sub");
  return (
    <div className="my-[16px] flex gap-2">
      {tags?.map((tag) => {
        return (
          <Button
            key={tag.value}
            variant="secondary"
            type="button"
            onClick={() => {
              router.push(`${path}?sub=${tag.value}`);
            }}
            className={`text-xs sm:text-base ${tag.value.includes(query as string) ? "bg-[#E1E2E8] font-bold text-[#5A25E9]" : "bg-[#F8F8FA]"} rounded-[12px] px-[16px] py-[12px] text-sm sm:text-base`}
          >
            {tag.name}
          </Button>
        );
      })}
    </div>
  );
}
