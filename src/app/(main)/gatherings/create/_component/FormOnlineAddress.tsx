import { Select } from "@/components/common/select/Select";
import { Input } from "@/components/ui/input";
import { ONLINE_PLATFORM } from "@/constants/options";
import { FormFieldProps } from "@/types/common/formFieldprops";
import { useState } from "react";

export default function FormOnlineAddress({ form, field }: FormFieldProps) {
  const [selectPlatform, setSelectPlatform] = useState("");

  return (
    <div className="space-y-4">
      <Select
        data={ONLINE_PLATFORM}
        size="w-full h-12 border-gray-500 text-gray-700 font-medium"
        value={selectPlatform}
        onChange={(value) => {
          setSelectPlatform(value);
          field.onChange(selectPlatform);
          form?.setValue("address", value === "ETC" ? "" : value);
        }}
        placeholder="온라인 모임을 진행할 플랫폼을 선택해주세요."
      />
      {selectPlatform === "ETC" && (
        <Input
          className="border-gray-500 font-medium text-gray-700"
          value={field.value}
          onChange={(e) => form?.setValue("address", e.target.value)}
          placeholder="기타 플랫폼을 입력해주세요."
        />
      )}
    </div>
  );
}
