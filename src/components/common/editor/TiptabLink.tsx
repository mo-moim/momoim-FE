"use client";

import { Editor } from "@tiptap/react";
import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { MODAL_TITLE } from "@/constants/modalTitle";
import { useModalStore } from "@/store/modalStore";
import { Modal } from "../modal/Modal";

export default function TiptabLink({ editor }: { editor: Editor | null }) {
  const [url, setUrl] = useState("");
  const { closeModal } = useModalStore();

  if (!editor) return null;

  const handleAddLink = () => {
    if (!url.trim()) {
      toast({
        variant: "destructive",
        title: "링크 등록 실패",
        description: "유효한 URL을 입력해주세요.",
        duration: 2000,
      });
      return;
    }

    if (editor && editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer" class"tiptap-link">${url}</a>`)
        .run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
    setUrl("");
    closeModal(MODAL_TITLE.EDITOR_LINK);
  };

  return (
    <div className="toolbarBtn">
      <Modal
        title={MODAL_TITLE.EDITOR_LINK}
        size="h-36 max-xs:w-80 gap-0"
        triggerButton={<LinkIcon className="h-5 w-5 cursor-pointer" />}
        content={
          <div className="flex w-full items-center justify-center gap-4">
            <input
              type="text"
              className="w-full border-b-2 border-gray-500 p-2 focus:outline-none"
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL을 입력해주세요."
            />
            <Button onClick={handleAddLink}>등록</Button>
          </div>
        }
        showFooter={false}
      />
    </div>
  );
}