"use clinet";

import { ImageUploadApi } from "@/api/imageFile";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

interface EditorFieldProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

const toolbarOptions = [
  ["heading", "bold", "italic", "strike"],
  ["hr", "quote"],
  ["image", "link"],
  ["code", "codeblock"],
];

function EditorWrapper({ field }: EditorFieldProps) {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown("");

      setTimeout(() => {
        window.scrollTo(0, 0);
        editorInstance.blur();
      }, 0);
    }
  }, []);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const contentData = editorRef.current.getInstance().getMarkdown();
      field.onChange(contentData);
    }
  };

  const handleEditorImageUpload = async (file: File, callback: (url: string, altText: string) => void) => {
    const uploadImage = await ImageUploadApi("toastContent", file);

    if (uploadImage) {
      callback(uploadImage, "image");
    }
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={field.value}
      height="600px"
      initialEditType="markdown"
      previewStyle="tab"
      hideModeSwitch
      useCommandShortcut
      autofocus
      placeholder="생성할 모임에 대해 설명을 입력해주세요."
      toolbarItems={toolbarOptions}
      onChange={handleEditorChange}
      hooks={{
        addImageBlobHook: handleEditorImageUpload,
      }}
    />
  );
}

export default EditorWrapper;
