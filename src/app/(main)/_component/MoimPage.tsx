"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HOME_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";
import Tabs from "@/components/common/Tabs";
import Tags from "@/components/common/Tags";
import { SortType } from "@/types/gathering";
import { MoimGrid } from "./MoimGrid";
import { Filters } from "./Filters";

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
  // 필터 상태 추가
  const [location, setLocation] = useState<string>("ALL");
  const [gatheringDate, setGatheringDate] = useState<Date | undefined>();
  const [sortType, setSortType] = useState<string>("UPDATE_AT");

  // URL 업데이트 함수
  const updateURL = (newCategory: string, newSubCategory: string) => {
    const params = new URLSearchParams(searchParams);

    if (newSubCategory !== "ALL") {
      params.set("subCategory", newSubCategory);
    } else {
      params.delete("subCategory");
    }

    if (location !== "ALL") {
      params.set("location", location);
    }
    if (gatheringDate) {
      params.set("gatheringDate", gatheringDate.toISOString().split("T")[0]);
    }
    if (sortType !== "UPDATE_AT") {
      params.set("sortType", sortType);
    }

    const updatedPath = `/${newCategory.toLowerCase()}${params.toString() ? `?${params}` : ""}`;
    router.push(updatedPath);
  };

  return (
    <div className="flex flex-col gap-6">
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
            { name: "전체", value: "ALL" },
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
        />
      )}
      {/* Filters */}
      <Filters
        selectedLocation={location}
        selectedDate={gatheringDate}
        selectedSort={sortType}
        onLocationChange={(value) => {
          setLocation(value);
          updateURL(category, subCategory);
        }}
        onDateChange={(date) => {
          setGatheringDate(date);
          updateURL(category, subCategory);
        }}
        onSortChange={(value) => {
          setSortType(value);
          updateURL(category, subCategory);
        }}
      />

      {/* MoimGrid */}
      <MoimGrid
        category={category}
        subCategory={subCategory}
        location={location}
        gatheringDate={gatheringDate}
        sortType={sortType as SortType}
      />
    </div>
  );
}
