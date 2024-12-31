"use client";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEditor, EditorContent } from "@tiptap/react";

export default function Viewer({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.extend({
        inclusive: false,
      }).configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
        openOnClick: false,
        autolink: true,
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
