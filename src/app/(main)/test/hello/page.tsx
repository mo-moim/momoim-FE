"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import Card from "../_components/Card";

export default function Test() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // URL의 쿼리 파라미터를 다룸
  const query = searchParams.toString();
  const datas = [
    {
      name: "코엑스에서 만나요",
      category: "취미",
      subCategory: "축구",
      location: "SEOUL",
      nextGatheringAt: "2024-12-04T07:05:21.522Z",
      gatheringType: "OFFLINE",
      status: "OPEN",
      isPeriodic: true,
      capacity: 30,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      image: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      description: "ㅇㅇ",
      address: "",
      tags: [],
      members: [
        {
          gatheringMemberId: 0,
          userId: 0,
          email: "string",
          name: "string",
          profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
          joinedAt: "2024-12-11T04:11:02.076Z",
        },
      ],
    },
    {
      name: "코엑스에서 만나요",
      category: "취미",
      subCategory: "축구",
      location: "SEOUL",
      nextGatheringAt: "2024-12-04T07:05:21.522Z",
      gatheringType: "OFFLINE",
      status: "CANCELED",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      image: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      description: "ㅇㅇ",
      address: "",
      tags: [],
      members: [
        {
          gatheringMemberId: 0,
          userId: 0,
          email: "string",
          name: "string",
          profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
          joinedAt: "2024-12-11T04:11:02.076Z",
        },
        {
          gatheringMemberId: 0,
          userId: 0,
          email: "string",
          name: "string",
          profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
          joinedAt: "2024-12-11T04:11:02.076Z",
        },
        {
          gatheringMemberId: 0,
          userId: 0,
          email: "string",
          name: "string",
          profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
          joinedAt: "2024-12-11T04:11:02.076Z",
        },
        {
          gatheringMemberId: 0,
          userId: 0,
          email: "string",
          name: "string",
          profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
          joinedAt: "2024-12-11T04:11:02.076Z",
        },
        {
          gatheringMemberId: 0,
          userId: 0,
          email: "string",
          name: "string",
          profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
          joinedAt: "2024-12-11T04:11:02.076Z",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      {/* {datas.map((data) => {
        return <Card type="home" data={data} />;
      })}
      {datas.map((data) => {
        return <Card type="mypage" data={data} />;
      })}
      {datas.map((data) => {
        return <Card type="detail" data={data} />;
      })} */}
      {/* 
      {datas.map((data) => {
        return <Card type="review" data={data} />;
      })}
      {datas.map((data) => {
        return <Card type="profile" data={data} />;
      })} */}
    </div>
  );
}
