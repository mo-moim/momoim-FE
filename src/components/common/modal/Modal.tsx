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
import clsx from "clsx";
import { useState } from "react";

interface ModalProps {
  size?: string;
  title?: string;
  trigger_btn: React.ReactNode;
  submit_btn?: React.ReactNode;
  content: string | React.ReactNode;
  onClick: () => void;
}

export function Modal({ size, title, trigger_btn, content, submit_btn, onClick }: ModalProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger_btn}</DialogTrigger>
      <DialogContent
        className={clsx("flex h-52 max-w-[25rem] flex-col items-center justify-center gap-10 rounded-lg", size)}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="absolute left-4 top-4 text-sm">
            {title || <VisuallyHidden>제목 없음</VisuallyHidden>}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild className="overflow-y-auto text-base text-black scrollbar-hide">
          <div>{content}</div>
        </DialogDescription>
        {title !== "맴버 리스트" && (
          <DialogFooter className="flex flex-row items-center justify-center gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button type="submit" onClick={onClick}>
              {submit_btn || "확인"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
