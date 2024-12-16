"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/modalStore";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";

interface ModalProps {
  size?: string;
  title?: string;
  triggerButton: React.ReactNode;
  content: React.ReactNode;
  showFooter?: boolean;
  onSubmit?: () => void;
}

export function Modal({ size, title, triggerButton, content, showFooter = true, onSubmit }: ModalProps) {
  const { isOpen, openModal, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? openModal() : closeModal())}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent
        className={clsx("h-1/5 min-h-36 w-[25rem] gap-6 rounded-lg p-4", size)}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-start text-sm">
            {title || <VisuallyHidden>제목 없음</VisuallyHidden>}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className="text-base text-black scrollbar-hide">
          <div className="flex justify-center overflow-y-auto">{content}</div>
        </DialogDescription>
        {showFooter && (
          <DialogFooter className="flex w-full flex-row items-center justify-center gap-2 sm:gap-0">
            <Button type="button" variant="outline" className="w-full" onClick={closeModal}>
              취소
            </Button>
            <Button type="submit" onClick={onSubmit} className="w-full">
              확인
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
