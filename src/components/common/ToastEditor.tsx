import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Skeleton } from "../ui/skeleton";

interface EditorFieldProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

const DynamicEditor = dynamic(() => import("./EditorWrapper"), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

export default function ToastEditor({ field }: EditorFieldProps) {
  return <DynamicEditor field={field} />;
}
