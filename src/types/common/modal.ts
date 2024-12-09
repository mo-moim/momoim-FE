export type ModalType = "apply" | "cancle" | "delete" | "member" | "review" | "profile";
type ModalOption = "trigger_btn" | "title" | "description" | "submit_btn";

export const MODAL_INFO: Record<ModalType, Partial<Record<ModalOption, string>>> = {
  apply: {
    trigger_btn: "모임 신청 하기",
    description: "해당 모임을 신청하시겠습니까?",
    submit_btn: "확인",
  },
  cancle: {
    trigger_btn: "모임 취소 하기",
    description: "참여한 모임을 취소하시겠습니까?",
    submit_btn: "확인",
  },
  delete: {
    trigger_btn: "모임 삭제 하기",
    description: "정말 모임을 삭제하시겠습니까?",
    submit_btn: "확인",
  },
  member: {
    trigger_btn: "맴버 더보기",
    title: "맴버 리스트",
  },
  review: {
    title: "리뷰 작성",
    trigger_btn: "리뷰 작성 하기",
    submit_btn: "리뷰 등록",
  },
  profile: {
    title: "프로필 수정",
    trigger_btn: "프로필 수정",
    submit_btn: "변경 내용 저장",
  },
};
