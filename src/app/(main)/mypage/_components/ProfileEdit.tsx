"use client";

import thumbnail from "@/assets/images/thumbnail.png";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditUser } from "@/queries/auth/useUser";
import { DEFAULT_PROFILE_EDIT_VALUES, profileEditSchema } from "@/schemas/profileEdit";
import { ProfileData } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "@/components/common/select/Select";
import { COMMON_CATEGORIES } from "@/constants/options";
import { CategoryKey } from "@/types/category";
import SubCategoryButton from "../../gatherings/create/_component/SubCategoryButton";
import { FormFileFieldWrapper } from "./FormFileFieldWrapper";

interface Props {
  openSwitch: (boolean: boolean) => void;
}

export default function ProfileEdit({ openSwitch }: Props) {
  const [filename, setFilename] = useState("파일을 선택해주세요.");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFilename(e.target.files[0].name);
  };

  const profileForm = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: DEFAULT_PROFILE_EDIT_VALUES,
  });

  const onSubmit = (values: ProfileData) => {
    console.log(values);
    openSwitch(false);
    // 여기에 실제 제출 로직을 추가합니다.
  };

  useEffect(() => {
    const received = [
      "MEDIA",
      "CRAFTING",
      "DANCE",
      "GAME",
      "PHOTO",
      "MUSIC",
      "BOOK",
      "PET",
      "SUB_CULTURE",
      "FINANCE",
      "SELF_DEVELOP",
    ];
    // profileForm.setValue("subCatrgory", received);
  }, []);

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmit)}>
        <div className="h-full w-full">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative flex aspect-square w-60 items-center justify-center">
              <div
                className="relative h-[80%] w-[80%]"
                // onClick={() => {
                //   console.log(profileForm.setValue("subCatrgory", ));
                // }}
              >
                <Image
                  alt="thumbnail"
                  fill
                  className="rounded-[20px] border-2 border-solid border-gray-200 object-cover"
                  src={thumbnail.src}
                />
              </div>
            </div>
            <div className="flex w-full flex-1 flex-col gap-6 sm:w-auto sm:p-2">
              <div>
                <div>
                  <div className="flex items-end">
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="dummy"
                      label="프로필 이미지"
                      placeholder=""
                      renderContent={(field) => (
                        <input
                          {...field}
                          value={filename}
                          placeholder="파일을 선택해주세요."
                          readOnly
                          className="pointer-events-none h-12 w-full rounded-l-md border-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                        />
                      )}
                    />
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="profileImage"
                      label=""
                      placeholder=""
                      renderContent={(field) => (
                        <label
                          htmlFor="file"
                          className="inline-block flex h-12 min-w-32 cursor-pointer items-center justify-center rounded-r-md border-y-2 border-l border-r-2 border-gray-300 focus-visible:outline-none focus-visible:ring-0"
                        >
                          파일찾기
                          <input
                            {...field}
                            onChange={handleFileUpload}
                            type="file"
                            id="file"
                            className="absolute hidden h-0 w-0 overflow-hidden border-0 p-0"
                          />
                        </label>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div>
                  <FormFieldWrapper
                    control={profileForm.control}
                    name="nickname"
                    label="닉네임"
                    placeholder=""
                    customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
                    renderContent={(field) => (
                      <input
                        {...field}
                        placeholder="닉네임을 선택해주세요."
                        className="h-12 w-full rounded-md border-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                      />
                    )}
                  />
                </div>
                {/* <div className="pl-[10px] text-sm font-semibold text-gray-500">1자 이상 30자 이내로 입력해주세요</div> */}
              </div>
            </div>
          </div>
          <div>
            <FormFieldWrapper
              control={profileForm.control}
              name="interestCategories"
              label="내 관심 카테고리"
              placeholder=""
              customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
              renderContent={(field) => {
                const defaultCategory = COMMON_CATEGORIES[0]?.value;
                console.log(field.value);
                console.log(defaultCategory);
                return (
                  <div>
                    <div className="space-y-4">
                      <Select
                        data={COMMON_CATEGORIES}
                        size="w-full h-12 border-gray-500 text-gray-700 font-medium"
                        value={field.value[0]}
                        onChange={(value) => field.onChange([value])}
                      />
                      <SubCategoryButton
                        multiple
                        form={profileForm}
                        category={(field.value as CategoryKey) || defaultCategory}
                      />
                    </div>
                    {/* {profileForm.formState.errors.subCategory && (
                            <p className="mt-2 text-sm font-medium text-red-500">
                              {(profileForm.formState.errors.subCategory as FieldError).message}
                            </p>
                          )} */}
                  </div>
                );
              }}
            />

            {/* <div>내 관심 카테고리</div>
            <div>카테고리</div>
            <div>서브카테고리</div> */}
          </div>
          <div>
            <div>활동지역</div>
            <div>세부지역</div>
          </div>
          <Button type="submit">테스트</Button>
        </div>
      </form>
    </Form>
  );
}

// export interface ProfileData {
//   name: string;
//   email: string;
//   regions: Region[];
//   profileImage: string | null;
//   interestCategories: Category[];
// }
