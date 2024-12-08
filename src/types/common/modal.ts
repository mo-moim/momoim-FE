export const MODAL_PAGE = {
  MEMBER_LIST: "맴버 리스트",
  PROFILE_EDIT: "프로필 수정",
  REVIEW: "리뷰 쓰기",
} as const;

export const MODAL_BUTTON = {
  CHECK: "확인",
  REVIEW_SAVE: "리뷰 등록",
  PROFILE_SAVE: "변경 내용 저장",
} as const;

export const MODAL_TEXT = {
  GATHERING_CANCLE: "참여한 모임을 취소하시겠습니까?",
  GATHERING_DELETE: "정말 모임을 삭제하시겠습니까?",
  MEMBER_REMOVE: "해당 맴버를 모임에서 제외하시겠습니까?",
} as const;

export type ModalPage = keyof typeof MODAL_PAGE;
export type ModalButton = keyof typeof MODAL_BUTTON;
export type ModalText = keyof typeof MODAL_TEXT;
