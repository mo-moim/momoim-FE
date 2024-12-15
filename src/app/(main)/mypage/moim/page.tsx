"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MoimCard from "@/components/common/cards/MoimCard";
import { GatheringContent } from "@/types/common/gatheringContent";
import Card from "../_components/Card";
import Tags from "../../../../components/common/Tags";

interface Moim {
  // api 완성되면 get으로 가져와서 설정
  name: string;
  category: string;
  subCategory: string;
  location: string;
  nextGatheringAt: string;
  gatheringType: string;
  status: string;
  isPeriodic: boolean;
  capacity: number;
  participantCount: number;
}

export default function MyMoim() {
  const searchParams = useSearchParams();
  const [moims, setMoims] = useState<GatheringContent[]>([]);

  const tags = [
    {
      name: "나의 모임",
      value: "mymoim",
    },
    {
      name: "내가 만든 모임",
      value: "created",
    },
    {
      name: "찜한 모임",
      value: "liked",
    },
  ];

  const datas = [
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: true,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      image: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
    {
      name: "코엑스에서 만나요코엑스에서 만나요코엑스에서 만나요",
      category: "취미",
      subCategory: "국내여행",
      location: "서래래래래래래래래포구",
      nextGatheringAt: "2024-12-24T07:05:21.522Z",
      gatheringType: "ONLINE",
      status: "OPEN",
      isPeriodic: false,
      capacity: 20,
      participantCount: 10,
      id: 0,
      managerId: 1212,
      managerName: "김밤식",
      managerProfileImage:
        "https://i.ibb.co/b7c3Z30/q-K2p5z-Tl-QTg-Xd8equgxo-A9cbi-JYXwbqis-GLN0r-I7-QJzp-JFRvn-SB-UWe-Ytt-M6-Axx-Qvtgc-O1m-LF989-JJAMOm.webp",
      image: "",
      description: "ㅇㅇ",
      address: "",
      wishlistCount: 0,
      tags: [],
    },
  ];

  useEffect(() => {
    setMoims(datas); // api 완성되면 get으로 가져와서 설정
  }, []);

  useEffect(() => {
    console.log(searchParams.get("sub"));
    // 이걸 기반으로 get해온다
  }, [searchParams]);

  return (
    <div className="sm:px-8">
      <Tags tags={tags} />
      {moims.map((moim, idx) => {
        console.log(idx);
        console.log(moims.length);

        return (
          <>
            <MoimCard key={`card${Date.now()}`} isWishList={false} type="mypage" data={moim} />
            {moims.length - 1 !== idx ? <hr className="my-[16px]" /> : <br />}
          </>
        );
      })}
    </div>
  );
}
