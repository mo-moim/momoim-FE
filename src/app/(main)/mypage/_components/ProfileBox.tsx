"use client";

import Image from "next/image";
import { Modal } from "@/components/common/modal/Modal";
import { Button } from "@/components/ui/button";
// import { useProfile } from "@/queries/mypage/useProfile";
import thumbnail from "@/assets/images/thumbnail.png";
import { useRouter } from "next/navigation";
import { useEditUser, useUser } from "@/queries/auth/useUser";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PROFILE_EDIT_VALUES, profileEditSchema } from "@/schemas/profileEdit";
import { ProfileData } from "@/types/profile";
import { User } from "@/types/auth";
import ProfileEdit from "./ProfileEdit";

export default function ProfileBox() {
  const router = useRouter();
  const { data, isLoading, error } = useUser();
  const [isClient, setIsClient] = useState(false);
  const { mutate: editProfileData } = useEditUser();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) return <div>Loading...</div>;
  if (error) return <div>다시 로그인 해주세요</div>;

  return (
    <div className="my-6 w-full rounded-[20px] border-2 border-solid border-[#F0F1F6] p-8">
      <div>
        <div className="text-lg font-black">내 프로필</div>
        <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
          <div className="my-6 flex">
            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 bg-gray-100">
              <Image
                alt="thumbnail"
                src={
                  data?.profileImage && data?.profileImage !== "DEFAULT_PROFILE_IMAGE"
                    ? data?.profileImage
                    : thumbnail.src
                }
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-[24px]">
              <div className="font-bold">{data?.name}</div>
              <div>{data?.email}</div>
            </div>
          </div>
          <Modal
            title="프로필 수정"
            content={<ProfileEdit openSwitch={setModalOpen} />}
            size="h-[95%] md:max-w-5xl max-w-none w-full p-14"
            showFooter={false}
            // onSubmit={() => {
            //   onSubmit();
            // }}
            open={modalOpen}
            action={setModalOpen}
            triggerButton={
              <Button
                variant="outline"
                className="w-full rounded-lg border border-solid border-black px-[16px] py-[12px] font-bold sm:w-auto"
              >
                프로필 수정
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
