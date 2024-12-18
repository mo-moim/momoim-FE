import { Select } from "@/components/common/select/Select";
import { COMMON_CATEGORIES } from "@/constants/options";
import { CategoryKey } from "@/types/category";
import { useEffect } from "react";
import { FormFieldProps } from "@/types/common/formFieldprops";
import SubCategoryButton from "./SubCategoryButton";

export default function Category({ form, field }: FormFieldProps) {
  const defaultCategory = COMMON_CATEGORIES[0]?.value;

  useEffect(() => {
    if (!field.value) {
      field.onChange(defaultCategory);
    }
    if (!form.getValues("category")) {
      form.setValue("category", COMMON_CATEGORIES[0].value);
    }
  }, []);

  return (
    <div className="space-y-4">
      <Select
        data={COMMON_CATEGORIES}
        size="w-full h-12 border-gray-500 text-gray-700 font-medium"
        value={field.value}
        onChange={(value) => field.onChange(value)}
      />
      <SubCategoryButton form={form} category={(field.value as CategoryKey) || defaultCategory} />
    </div>
  );
}
