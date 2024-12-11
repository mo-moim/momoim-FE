"use client";

import { useState } from "react";
import axios from "axios";
import { Modal } from "@/components/common/Modal";

interface Profile {
  companyName: string;
  createdAt: string;
  email: string;
  id: number;
  image: string | null;
  name: string;
  teamId: string;
  updatedAt: string;
}

// const getProfile = async (): Promise<Profile> => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: "https://fe-adv-project-together-dallaem.vercel.app/momoim/auths/user",
//       headers: {
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiJtb21vaW0iLCJ1c2VySWQiOjk0MywiaWF0IjoxNzMzMTI5MDMxLCJleHAiOjE3MzMxMzI2MzF9.GWvS0ELKKi_wqLlxWf7CmN7TTHiRIdnBdZf1DDARQoY`,
//       },
//     });
//     return res.data;
//   } catch (e) {
//     throw new Error("프로필 데이터를 가져오는 데 실패했습니다.");
//   }
// };

export default function ProfileBox() {
  const [modal, setModal] = useState(false);
  const editProfile = () => {
    setModal(!modal);
  };
  return (
    <>
      {/* {modal && <Modal type="profile" />} */}
      <div className="my-[24px] w-[95%] max-w-[1100px] rounded-[20px] border-2 border-solid border-[#F0F1F6] p-[32px]">
        <div>
          <div className="text-[18px] font-black">내 프로필</div>
          <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
            <div className="my-[24px] flex">
              {/* <div>이미지</div> */}
              <img className="h-[120px] w-[120px]" src="https://i.ibb.co/z4KqFQk/type-cha.png" alt="type-cha" />
              <div className="flex flex-col justify-center p-[24px]">
                <div className="font-bold">이름 :{/* {profileData?.name} */}</div>
                <div>E-mail :{/* {profileData?.email} */}</div>
              </div>
            </div>
            {/* <button
              type="button"
              className="w-full rounded-lg border-2 border-solid border-black px-[16px] py-[12px] font-bold sm:w-auto"
              onClick={editProfile}
            >
              프로필 수정
            </button> */}
            {/* {modal && <Modal type="profile" />} */}
            <Modal type="profile" />
          </div>
        </div>
      </div>
    </>
  );
}
