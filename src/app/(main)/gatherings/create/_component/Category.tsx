import { Select } from "@/components/common/select/Select";
import { COMMON_CATEGORIES } from "@/constants/options";
import { CategoryKey } from "@/types/category";
import { FormFieldProps } from "@/types/common/formFieldprops";
import SubCategoryButton from "./SubCategoryButton";

export default function Category({ form, field }: FormFieldProps) {
  const defaultCategory = COMMON_CATEGORIES[0]?.value;

  return (
    <>
      <div className="space-y-4">
        <Select
          data={COMMON_CATEGORIES}
          size="w-full h-12 border-gray-500 text-gray-700 font-medium"
          value={field.value}
          onChange={(value) => field.onChange(value)}
        />
        <SubCategoryButton form={form} category={(field.value as CategoryKey) || defaultCategory} />
      </div>
      {form.formState.errors.subCategory && (
        <p className="mt-2 text-sm font-medium text-red-500">{form.formState.errors.subCategory.message}</p>
      )}
    </>
  );
}
