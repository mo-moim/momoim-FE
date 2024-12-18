import { SUB_CATEGORIES } from "@/constants/options";
import { CategoryKey, GatheringCreateFormData } from "@/types/category";
import clsx from "clsx";
import { UseFormReturn } from "react-hook-form";

interface SubCategoryProps {
  form: UseFormReturn<GatheringCreateFormData>;
  category: CategoryKey;
  multiple?: boolean;
}

export default function SubCategoryButton({ form, category, multiple = false }: SubCategoryProps) {
  const subCategoryList = SUB_CATEGORIES[category] || [];
  const selectValue = multiple ? (form.watch("subCategory") as string[]) : (form.watch("subCategory") as string);

  const handleMultiClick = (value: string) => {
    if (multiple) {
      const arrayCheck = Array.isArray(selectValue) ? selectValue : [];
      const newValue = arrayCheck.includes(value) ? arrayCheck.filter((sub) => sub !== value) : [...selectValue, value];
      form.setValue("subCategory", newValue);
    } else {
      form.setValue("subCategory", value);
    }
  };

  const handleSubSelect = (sub: string) => {
    if (Array.isArray(selectValue)) {
      return selectValue.includes(sub);
    }
    return selectValue === sub;
  };

  return (
    <ul className="flex flex-wrap gap-4">
      {subCategoryList.map((sub) => (
        <li key={sub.value}>
          <button
            type="button"
            className={clsx(
              "rounded-lg border border-gray-500 px-4 py-3 text-sm font-medium text-gray-700 transition-all",
              handleSubSelect(sub.value) && "border-main bg-main text-white",
            )}
            onClick={() => handleMultiClick(sub.value)}
          >
            {sub.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
