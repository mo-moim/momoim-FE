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
    <div className="my-4 flex gap-2">
      {tags?.map((tag) => {
        return (
          <Button
            key={tag.value}
            variant="secondary"
            type="button"
            onClick={() => {
              router.push(`${path}?sub=${tag.value}`);
            }}
            className={`text-xs sm:text-base ${tag.value.includes(query as string) ? "bg-gray-300 font-bold text-main" : "bg-gray-100"} rounded-xl px-4 py-3 text-sm sm:text-base`}
          >
            {tag.name}
          </Button>
        );
      })}
    </div>
  );
}
