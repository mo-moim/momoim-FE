"use client";

import thumbnail from "@/assets/images/thumbnail.png";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEditUser } from "@/queries/auth/useUser";
import { DEFAULT_PROFILE_EDIT_VALUES, profileEditSchema } from "@/schemas/profileEdit";
import { ProfileData } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "@/components/common/select/Select";
import { COMMON_CATEGORIES } from "@/constants/options";
import { CategoryKey } from "@/types/category";
import { ImageUploadApi } from "@/api/imageFile";
import { X } from "lucide-react";
import SubCategoryButton from "../../gatherings/create/_component/SubCategoryButton";
import RegionButtons from "./RegionButtons";

interface Props {
  data: ProfileData;
  openSwitch: (boolean: boolean) => void;
}

interface Field {
  value: string;
  onChange: (value: string | null) => void;
}

export default function ProfileEdit({ data, openSwitch }: Props) {
  const [filename, setFilename] = useState("파일을 선택해주세요.");
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profileForm = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: DEFAULT_PROFILE_EDIT_VALUES,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: Field) => {
    if (e.target.files) {
      const { files } = e.target;
      setFilename(files[0].name);
      const selectFile = files ? files[0] : null;
      if (selectFile) {
        try {
          const uploadImage = await ImageUploadApi("profile", selectFile);
          field.onChange(uploadImage);
          profileForm.setValue("profileImage", uploadImage);
          setCurrentProfileImage(uploadImage);
        } catch (error) {
          console.error("Image upload failed", error);
        }
      }
    }
  };

  const handleFileDelete = () => {
    setFilename("파일을 선택해주세요.");
    setCurrentProfileImage("");
    profileForm.setValue("profileImage", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { mutate: edit } = useEditUser();

  const onSubmit = (values: ProfileData) => {
    edit({
      email: values.email,
      name: values.name,
      profileImage: values.profileImage as string,
      interestCategories: values.subCategory,
      regions: values.regions,
    });
    openSwitch(false);
  };

  // console.log(profileForm.watch());

  useEffect(() => {
    setCurrentProfileImage(data.profileImage as string);
    profileForm.setValue("subCategory", data.subCategory);
    profileForm.setValue("name", data.name);
    profileForm.setValue("email", data.email);
    profileForm.setValue("regions", data.regions);
  }, []);

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmit)}>
        <div className="flex h-full w-full flex-col gap-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative flex aspect-square w-60 items-center justify-center">
              <div className="relative h-[80%] w-[80%]">
                <Image
                  alt="thumbnail"
                  fill
                  className="rounded-[20px] border-2 border-solid border-gray-200 object-cover"
                  src={currentProfileImage || thumbnail.src}
                />
              </div>
              {currentProfileImage && (
                <button
                  type="button"
                  className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white"
                  onClick={handleFileDelete}
                >
                  <X className="w-3" />
                </button>
              )}
            </div>
            <div className="flex w-full flex-1 flex-col gap-6 sm:w-auto sm:p-2">
              <div className="w-full">
                <div className="w-full">
                  <div className="flex w-full items-end justify-between">
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="dummy"
                      label="프로필 이미지"
                      placeholder=""
                      formItemCustomStyle="w-full"
                      customStyle="w-full"
                      renderContent={(field) => (
                        <input
                          {...field}
                          value={filename}
                          placeholder="파일을 선택해주세요."
                          readOnly
                          className="pointer-events-none h-12 w-full flex-grow rounded-l-md border-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                        />
                      )}
                    />
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="profileImage"
                      label=""
                      type="text"
                      placeholder=""
                      renderContent={(field) => (
                        <label
                          htmlFor="file"
                          className="inline-block flex h-12 min-w-32 cursor-pointer items-center justify-center rounded-r-md border-y-2 border-l border-r-2 border-gray-300 focus-visible:outline-none focus-visible:ring-0"
                        >
                          파일찾기
                          <input
                            ref={fileInputRef}
                            onChange={(e) => {
                              handleFileUpload(e, field);
                            }}
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
                    name="name"
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
          <div className="flex flex-col gap-4">
            <div>
              <div className="space-y-4">
                <FormFieldWrapper
                  control={profileForm.control}
                  name="selectedCategory"
                  label="내 관심 카테고리"
                  placeholder=""
                  customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
                  renderContent={(field) => (
                    <Select
                      data={COMMON_CATEGORIES}
                      size="w-full h-12 border-gray-500 text-gray-700 font-medium"
                      value={field.value[0]}
                      onChange={(value) => field.onChange([value])}
                    />
                  )}
                />
                <FormFieldWrapper
                  control={profileForm.control}
                  name="subCategory"
                  label=""
                  placeholder=""
                  customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
                  renderContent={() => {
                    const defaultCategory = COMMON_CATEGORIES[0]?.value;
                    return (
                      <SubCategoryButton
                        multiple
                        form={profileForm}
                        category={(profileForm.watch().selectedCategory[0] as CategoryKey) || defaultCategory}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="py-4">
              <FormFieldWrapper
                control={profileForm.control}
                name="regions"
                label="활동 지역"
                placeholder=""
                // customStyle="border-2 focus-visible:outline-none focus-visible:ring-0 my-4"
                renderContent={() => <RegionButtons multiple form={profileForm} />}
              />
            </div>
            <Button type="submit">변경 내용 저장</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
