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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MODAL_INFO, ModalType } from "@/types/common/modal";
import clsx from "clsx";
import { useState } from "react";

interface ModalProps {
  type: ModalType;
  size: "sm" | "md" | "lg";
  content?: React.ReactNode;
  onSubmit?: () => void;
}

const MODAL_SIZE = {
  sm: "max-w-[25rem] h-52",
  md: "max-w-[30rem] h-[40rem]",
  lg: "max-w-[60rem] max-lg:max-w-[40rem] max-sm:max-w-[30rem] max-2xl:h-[40rem] h-[45rem]",
};

export function Modal({ type, size, content, onSubmit }: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const modalData = MODAL_INFO[type];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{modalData.trigger_btn}</Button>
      </DialogTrigger>
      <DialogContent
        className={clsx("flex flex-col items-center justify-center gap-8 rounded-lg", MODAL_SIZE[size])}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="absolute left-4 top-4 text-sm">
            {modalData.title ? modalData.title : <VisuallyHidden>제목 없음</VisuallyHidden>}
          </DialogTitle>
          <DialogDescription className="text-base text-black">
            {modalData.description ? modalData.description : <VisuallyHidden>설명 없음</VisuallyHidden>}
          </DialogDescription>
        </DialogHeader>
        {content && <div className="flex-grow overflow-y-auto scrollbar-hide">{content}</div>}
        {modalData.title !== "맴버 리스트" && (
          <DialogFooter className="flex flex-row items-center justify-center gap-4">
            <Button type="submit" variant="outline" onClick={handleClose}>
              취소
            </Button>
            {modalData.submit_btn && (
              <Button type="submit" onClick={onSubmit}>
                {modalData.submit_btn}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
