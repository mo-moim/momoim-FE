"use client";

interface MoimGridProps {
  category: string;
  subCategory: string;
}

export function MoimGrid({ category, subCategory }: MoimGridProps) {
  return (
    <div className="mt-8">
      <div>
        {category} {subCategory}
      </div>
    </div>
  );
}
