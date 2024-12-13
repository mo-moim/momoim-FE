// import { render, screen, fireEvent } from '@testing-library/react';
// import MoimCard from './MoimCard';
// import { GatheringContent } from '@/types/common/gatheringContent';
// import { Members } from '@/types/common/members';

// const mockData: GatheringContent = {
//   image: '/path/to/image.jpg',
//   category: 'Tech Meetup',
//   name: 'React Dev Meetup',
//   subCategory: 'Web Development',
//   location: 'Seoul',
//   nextGatheringAt: '2024-12-31T12:00:00Z',
//   status: 'OPEN',
//   gatheringType: 'Physical',
//   isPeriodic: false,
//   managerProfileImage: '',
//   managerName: 'John Doe',
//   participantCount: 5,
//   capacity: 20,
// };

// const mockMembers: Members[] = [
//     {
//         gatheringMemberId: 0,
//         userId: 0,
//         email: "string0",
//         name: "string",
//         profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
//         joinedAt: "2024-12-11T04:11:02.076Z",
//       },
//       {
//         gatheringMemberId: 1,
//         userId: 1,
//         email: "string1",
//         name: "string",
//         profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
//         joinedAt: "2024-12-11T04:11:02.076Z",
//       },
//       {
//         gatheringMemberId: 2,
//         userId: 2,
//         email: "string2",
//         name: "string",
//         profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
//         joinedAt: "2024-12-11T04:11:02.076Z",
//       },
//       {
//         gatheringMemberId: 3,
//         userId: 3,
//         email: "string3",
//         name: "string",
//         profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
//         joinedAt: "2024-12-11T04:11:02.076Z",
//       },
//       {
//         gatheringMemberId: 4,
//         userId: 4,
//         email: "string4",
//         name: "string",
//         profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
//         joinedAt: "2024-12-11T04:11:02.076Z",
//       },
// ];

// const mockProps = {
//   type: 'home',
//   data: mockData,
//   isWishList: false,
//   likeTask: jest.fn(),
//   members: mockMembers,
//   customOnClick: jest.fn(),
//   customButton: <button>Custom Button</button>,
// };

// describe('MoimCard', () => {
//   it('should render correctly in "home" type', () => {
//     render(<MoimCard {...mockProps} />);
//     expect(screen.getByAltText('thumbnail')).toBeInTheDocument();
//     expect(screen.getByText(mockData.name)).toBeInTheDocument();
//     expect(screen.getByText(mockData.location)).toBeInTheDocument();
//     expect(screen.getByText(mockData.managerName)).toBeInTheDocument();
//     expect(screen.getByText('Custom Button')).toBeInTheDocument();
//   });

//   it('should trigger customOnClick when clicked', () => {
//     render(<MoimCard {...mockProps} />);
//     const button = screen.getByRole('button');
//     fireEvent.click(button);
//     expect(mockProps.customOnClick).toHaveBeenCalled();
//   });

//   it('should display status messages when applicable', () => {
//     render(<MoimCard {...mockProps} data={{ ...mockData, status: 'CANCELED' }} />);
//     expect(screen.getByText('취소된 모임')).toBeInTheDocument();
//   });

//   it('should render members correctly in "home" type', () => {
//     render(<MoimCard {...mockProps} />);
//     expect(screen.getByAltText('profile image')).toBeInTheDocument();
//     expect(screen.getAllByRole('img')).toHaveLength(3);  // 3명의 프로필 이미지가 보여야 합니다
//   });

//   it('should show correct gathering time for "detail" type', () => {
//     const detailProps = { ...mockProps, type: 'detail' };
//     render(<MoimCard {...detailProps} />);
//     expect(screen.getByText('남은 시간')).toBeInTheDocument();
//   });

//   it('should call likeTask function when Heart component is clicked', () => {
//     render(<MoimCard {...mockProps} />);
//     const heartButton = screen.getByRole('button');
//     fireEvent.click(heartButton);
//     expect(mockProps.likeTask).toHaveBeenCalled();
//   });

//   it('should render different components based on type', () => {
//     // 'detail' 타입 테스트
//     const detailProps = { ...mockProps, type: 'detail' };
//     render(<MoimCard {...detailProps} />);
//     expect(screen.getByText(mockData.category)).toBeInTheDocument();
//   });
// });

import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import MoimCard from "@/components/common/cards/MoimCard";
import { Members } from "@/types/common/members";

describe("MoimCard Component", () => {
  const mockData = {
    name: "코엑스에서 만나요",
    category: "취미",
    subCategory: "국내여행",
    location: "서래래래래래래래래포구",
    nextGatheringAt: "2024-12-24T07:05:21.522Z",
    gatheringType: "OFFLINE",
    status: "OPEN",
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
  };
  const mockMembers: Members[] = [
    {
      gatheringMemberId: 0,
      userId: 0,
      email: "string0",
      name: "string",
      profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      joinedAt: "2024-12-11T04:11:02.076Z",
    },
    {
      gatheringMemberId: 1,
      userId: 1,
      email: "string1",
      name: "string",
      profileImage: "https://i.ibb.co/GncTP4Z/mascot-removebg-preview.png",
      joinedAt: "2024-12-11T04:11:02.076Z",
    },
  ];

  it("카드가 정상적으로 렌더링 되어야 한다", () => {
    render(<MoimCard type="detail" data={mockData} members={mockMembers} isWishList={false} />);
    expect(screen.getByText("코엑스에서 만나요")).toBeInTheDocument();
  });

  it("type에 따라 각 type의 스타일로 정상적으로 렌더링 되어야 한다", () => {
    render(<MoimCard type="detail" data={mockData} isWishList />);
    expect(screen.getByText("취미")).toBeInTheDocument();

    render(<MoimCard type="home" data={mockData} isWishList likeTask={jest.fn()} />);
    expect(screen.getByLabelText("dividing-point")).not.toHaveClass("flex-grow");

    cleanup();

    render(<MoimCard type="mypage" data={mockData} isWishList likeTask={jest.fn()} />);
    expect(screen.getByLabelText("dividing-point")).toHaveClass("flex-grow");
  });

  it("카드 클릭 시 customOnClick이 호출되어야 한다", () => {
    const mockCustomClick = jest.fn();
    render(<MoimCard type="home" data={mockData} isWishList={false} customOnClick={mockCustomClick} />);
    const cardButton = screen.getAllByRole("button")[0];
    fireEvent.click(cardButton);
    expect(mockCustomClick).toHaveBeenCalledTimes(1);
  });
});
