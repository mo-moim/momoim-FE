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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormFileFieldWrapper } from "./FormFileFieldWrapper";

export default function ProfileEdit() {
  const [filename, setFilename] = useState("파일을 선택해주세요.");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFilename(e.target.files[0].name);
  };

  const profileForm = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: DEFAULT_PROFILE_EDIT_VALUES,
  });

  console.log(profileForm);

  const onSubmit = (values: ProfileData) => {
    console.log(values);
    // 여기에 실제 제출 로직을 추가합니다.
  };

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(onSubmit)}>
        <div className="h-full w-full">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative flex aspect-square w-60 items-center justify-center">
              <div className="relative h-[80%] w-[80%]">
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
                {/* <div className="text-lg">프로필 이미지</div> */}
                <div>
                  <div className="flex items-end">
                    {/* <Input
                      className="flex-grow rounded-l-md rounded-r-none border-y-2 border-l-2 border-r border-gray-300 px-2 text-gray-600 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-0"
                      value={filename}
                      readOnly
                    /> */}
                    {/* <FormFileFieldWrapper
                      control={profileForm.control}
                      name="profileImage"
                      label="프로필 이미지"
                      isReadonly={true}
                      placeholder="파일을 선택해주세요."
                      customStyle="pointer-events-none m-0 flex-grow rounded-l-md rounded-r-none border-y-2 border-l-2 border-r border-gray-300 px-2 text-gray-600 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-0"
                    /> */}
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="profile"
                      label="프로필 이미지"
                      placeholder=""
                      renderContent={() => (
                        <>
                          {/* <div>프로필 이미지</div> */}
                          <input
                            value={filename}
                            placeholder="파일을 선택해주세요."
                            readOnly
                            className="pointer-events-none h-12 w-full rounded-l-md border-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                          />
                        </>
                      )}
                    />
                    {/* <input
                      onChange={handleFileUpload}
                      type="file"
                      id="file"
                      className="absolute h-0 w-0 overflow-hidden border-0 p-0"
                      /> */}
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="profile"
                      label=""
                      placeholder=""
                      renderContent={() => (
                        <label
                          htmlFor="file"
                          className="inline-block flex h-12 min-w-32 cursor-pointer items-center justify-center rounded-r-md border-y-2 border-l border-r-2 border-gray-300 focus-visible:outline-none focus-visible:ring-0"
                        >
                          파일찾기
                          <input
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
                    name="name"
                    label="닉네임"
                    placeholder=""
                    customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
                    renderContent={() => (
                      <>
                        {/* <div>닉네임</div> */}
                        <input
                          value={filename}
                          placeholder="닉네임을 선택해주세요."
                          className="h-12 w-full rounded-md border-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                        />
                      </>
                    )}
                  />
                </div>
                {/* <div className="pl-[10px] text-sm font-semibold text-gray-500">1자 이상 30자 이내로 입력해주세요</div> */}
              </div>
            </div>
          </div>
          <div>
            <div>내 관심 카테고리</div>
            <div>카테고리</div>
            <div>서브카테고리</div>
          </div>
          <div>
            <div>활동지역</div>
            <div>세부지역</div>
          </div>
          <Button type="submit" onClick={profileForm.handleSubmit(onSubmit)}>
            왜안되지
          </Button>
        </div>
      </form>
    </Form>
  );
}
