"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "@/api/profile";
import { imageValidChecker } from "@/lib/imageValidChecker";
import Image from "next/image";
import Logo from "@/assets/svg/default-image.svg";
import { Modal } from "@/components/common/modal/Modal";
import { Button } from "@/components/ui/button";

export default function ProfileBox() {
  const { data, isLoading, error } = useQuery({ queryKey: ["profile"], queryFn: getProfileApi });

  const renderProfile = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>다시 로그인 해주세요</div>;
    }
    return (
      <>
        <div className="font-bold">{data.name}</div>
        <div>{data.email}</div>
      </>
    );
  };

  return (
    <div className="my-6 w-full max-w-[1100px] rounded-[20px] border-2 border-solid border-[#F0F1F6] p-8">
      <div>
        <div className="text-lg font-black">내 프로필</div>
        <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
          <div className="my-6 flex">
            <div className="flex h-32 w-32 items-center justify-center rounded-[20px] border-2 border-solid border-gray-200 bg-gray-100">
              {imageValidChecker(data?.profileImage) ? (
                <Image layout="fill" objectFit="contain" src={data?.profileImage} alt="type-cha" />
              ) : (
                <Logo />
              )}
            </div>
            <div className="flex flex-col justify-center p-[24px]">{renderProfile()}</div>
          </div>
          <Modal
            title="프로필 수정"
            content=""
            size="w-full h-[55%]"
            showFooter
            submitButtonText="등록하기"
            // onSubmit={() =>
            //   postReviewApi(
            //     data?.gatheringId as number,
            //     rating,
            //     data.name,
            //     contentRef.current ? contentRef.current.value : "",
            //   )
            // }
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
