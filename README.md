# **모모임**

**모모임**은 관심사가 비슷한 사람들과 함께하는 모임 플랫폼입니다.

취미 모임부터 전문 동호회까지 다양한 형태의 모임을 쉽게 찾거나 직접 만들며 참여할 수 있는 서비스를 제공합니다.

## 🖇️ 배포 링크
https://www.momoim.co.kr/

## 📅 프로젝트 기간
2024년 11월 25일 ~ 현재 진행 중
(주요 기능 개발 완료 후 지속적으로 개선 및 유지 보수 중)

## 👥 팀원 구성

- **Frontend**: 3명
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/thbrthbr">
          <img src="https://avatars.githubusercontent.com/u/76714440?v=4" alt="이태희" width="100px"/><br/>
          <b>이태희</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/oweaj">
          <img src="https://avatars.githubusercontent.com/u/101049520?v=4" alt="장재우" width="100px"/><br/>
          <b>장재우</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/juseungyeon">
          <img src="https://avatars.githubusercontent.com/u/50696162?v=4" alt="주승연" width="100px"/><br/>
          <b>주승연</b>
        </a>
      </td>
    </tr>
  </table>


- **Backend**: 2명  
- **Designer**: 1명

## **⚒ Skills**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-785ef0?style=for-the-badge&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-ec5990?style=for-the-badge&logo=react-hook-form&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn.ui-000000?style=for-the-badge&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React_Testing_Library-E33332?style=for-the-badge&logo=testing-library&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-00C853?style=for-the-badge&logo=git&logoColor=white)
![Codecov](https://img.shields.io/badge/Codecov-F01F7A?style=for-the-badge&logo=codecov&logoColor=white)
![SVGR](https://img.shields.io/badge/SVGR-FFB13B?style=for-the-badge&logo=svg&logoColor=white)

## **🚀 설치 및 실행 방법**
### 기본 실행
```bash
npm install
npm run dev
```
### 로컬 HTTPS 설정 (선택 사항)
HTTPS 환경에서 특정 기능(예: Set-Cookie 테스트)을 개발하거나 디버깅하려면 [HTTPS 개발 환경 설정 가이드](https://github.com/mo-moim/momoim-FE/wiki/Local-HTTPS-Setup)를 따라 진행하세요.


## **📂 폴더 구조**

```plaintext
src/
├── api/                   # API 요청 함수들
├── app/                   # Next.js App Router 디렉토리
│   ├── layout.tsx         # 전체 앱 레이아웃
│   ├── (auth)/            # 인증 관련 라우트 그룹
│   │   ├── login/         # 로그인 페이지
│   │   └── signup/        # 회원가입 페이지
│   └── (main)/            # 메인 라우트 그룹
│       ├── gatherings/    # 모임 상세페이지
│       └── mypage/        # 마이페이지
├── assets/                # 정적 자산 파일
├── components/            # 재사용 가능한 컴포넌트
├── constants/             # 상수 값 정의
├── hooks/                 # 재사용 가능한 커스텀 훅
├── lib/                   # 유틸리티 함수
├── queries/               # React Query 관련 로직
├── schemas/               # 데이터 검증 로직 (Zod)
├── store/                 # Zustand 상태 관리
├── styles/                # 전역 스타일
└── types/                 # TypeScript 타입 정의
```
