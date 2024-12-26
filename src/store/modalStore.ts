import { create } from "zustand";

interface ModalStateType {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
}

interface ModalStoreType {
  modalState: Record<string, ModalStateType>;
  openModal: (title: string, content: React.ReactNode) => void;
  closeModal: (title: string) => void;
}

export const useModalStore = create<ModalStoreType>((set) => ({
  modalState: {},
  openModal: (title, content) => {
    set((state) => ({
      modalState: {
        ...state.modalState,
        [title]: { isOpen: true, title, content },
      },
    }));
  },
  closeModal: (title) =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        [title]: { ...state.modalState[title], isOpen: false },
      },
    })),
}));
