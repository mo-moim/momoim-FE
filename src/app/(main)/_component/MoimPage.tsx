"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HOME_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";
import Tabs from "@/components/common/Tabs";
import Tags from "@/components/common/Tags";
import { MoimGrid } from "./MoimGrid";

export type Category = "ALL" | "RECOMMENDED" | "CULTURE" | "FOOD" | "SPORTS" | "HOBBY" | "TRAVEL" | "STUDY" | "MEETING";

interface MoimPageProps {
  initialCategory?: string;
}

export default function MoimPage({ initialCategory = "ALL" }: MoimPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState<Category>(() => {
    const pathSegments = pathname.split("/");
    const categoryFromPath = pathSegments[1]?.toUpperCase() || initialCategory;
    return categoryFromPath as Category;
  });
  const [subCategory, setSubCategory] = useState<string>(() => {
    const subCategoryPath = searchParams.get("subCategory")?.toUpperCase() || "ALL";
    return subCategoryPath;
  });

  // URL 업데이트 함수
  const updateURL = (newCategory: string, newSubCategory: string) => {
    const params = new URLSearchParams(searchParams);

    if (newSubCategory !== "ALL") {
      params.set("subCategory", newSubCategory);
    } else {
      params.delete("subCategory");
    }

    const updatedPath = `/${newCategory.toLowerCase()}${params.toString() ? `?${params}` : ""}`;
    router.push(updatedPath);
  };

  return (
    <>
      {/* Categories */}
      <Tabs
        tabs={HOME_CATEGORIES.map((cate) => ({
          name: cate.label,
          value: cate.value,
        }))}
        selectedValue={category}
        onSelect={(value) => {
          const newCategory = value as Category;
          setCategory(newCategory);
          updateURL(newCategory, "ALL");
          setSubCategory("ALL");
        }}
      />
      {/* Sub Categories */}
      {category !== "ALL" && category !== "RECOMMENDED" && SUB_CATEGORIES[category] && (
        <Tags
          tags={[
            { name: "전체", value: "ALL" }, // 공통 옵션 추가
            ...SUB_CATEGORIES[category].map((subCate) => ({
              name: subCate.label,
              value: subCate.value,
            })),
          ]}
          selectedValue={subCategory}
          onSelect={(value) => {
            setSubCategory(value);
            updateURL(category, value);
          }}
          className="mt-8"
        />
      )}
      {/* Filters */}

      {/* MoimGrid */}
      <MoimGrid category={category} subCategory={subCategory} />
    </>
  );
}
