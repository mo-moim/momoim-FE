"use client";

import { ImageUploadApi } from "@/api/imageFile";
import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import DefaultThumbnail from "@/assets/image/thumbnail.jpg";

import { FormFieldProps } from "@/types/common/formFieldprops";

export default function GatheringUploadImage({ form, field }: FormFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageValue = form.watch("image");

  const handleGetImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectFile = files ? files[0] : null;

    if (selectFile) {
      const uploadImage = await ImageUploadApi("gathering", selectFile);
      field.onChange(uploadImage);
    }
  };

  const handleImageReset = () => {
    field.onChange("");
  };

  return (
    <div className="flex items-end gap-4 transition-all max-sm:flex-col max-sm:items-baseline">
      <div className="flex h-56 w-3/4 items-end rounded-xl border transition-all max-sm:h-64 max-sm:w-full">
        <Image
          src={imageValue || DefaultThumbnail}
          className="h-full w-full rounded-xl object-cover"
          width={500}
          height={500}
          alt="모임 생성 이미지"
        />
      </div>
      <div className="flex w-full gap-4">
        <div className="relative flex-1">
          <input type="file" ref={inputRef} onChange={handleGetImage} hidden />
          <button
            type="button"
            className="absolute left-0 top-0 h-10 w-full rounded-md border border-gray-500 text-sm font-medium text-gray-700"
            onClick={() => inputRef.current?.click()}
          >
            이미지 변경
          </button>
        </div>
        <button
          type="button"
          className="h-10 flex-1 rounded-md border border-gray-500 text-sm font-medium text-gray-700"
          onClick={handleImageReset}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
