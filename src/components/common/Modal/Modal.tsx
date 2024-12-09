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
import { MODAL_PAGE, MODAL_BUTTON, MODAL_TEXT, ModalPage, ModalButton, ModalText } from "@/types/common/modal";
import clsx from "clsx";
import { useState } from "react";

interface ModalProps {
  size: "sm" | "md" | "lg";
  title?: ModalPage;
  description?: ModalText;
  content?: React.ReactNode;
  checkBtn?: ModalButton;
  activeButton: React.ReactNode;
  onSubmit?: () => void;
}

const MODAL_SIZE = {
  sm: "max-w-[25rem] h-52",
  md: "max-w-[30rem] h-[40rem]",
  lg: "max-w-[60rem] max-lg:max-w-[40rem] max-sm:max-w-[30rem] max-2xl:h-[40rem] h-[45rem]",
};

export function Modal(props: ModalProps) {
  const { size, title, description, content, checkBtn, activeButton, onSubmit } = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{activeButton}</DialogTrigger>
      <DialogContent
        className={clsx("flex flex-col items-center justify-center gap-8 rounded-lg", MODAL_SIZE[size])}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="absolute left-4 top-4 text-sm">
            {title ? MODAL_PAGE[title] : <VisuallyHidden>제목 없음</VisuallyHidden>}
          </DialogTitle>
          <DialogDescription className="text-base text-black">
            {description ? MODAL_TEXT[description] : <VisuallyHidden>설명 없음</VisuallyHidden>}
          </DialogDescription>
        </DialogHeader>
        {content && <div className="flex-grow overflow-y-auto scrollbar-hide">{content}</div>}
        {title !== "MEMBER_LIST" && (
          <DialogFooter className="flex flex-row items-center justify-center gap-4">
            {(checkBtn === "CHECK" || checkBtn === "REVIEW_SAVE") && (
              <Button type="submit" variant="outline" onClick={handleClose}>
                취소
              </Button>
            )}
            <Button type="submit" onClick={onSubmit}>
              {checkBtn && MODAL_BUTTON[checkBtn]}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
