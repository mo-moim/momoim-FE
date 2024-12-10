import { cn } from "@/lib/utils";
import CheckIcon from "@/assets/svg/check-icon.svg";

interface SelectButtonProps {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SelectButton({ selected, children, onClick, className = "" }: SelectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "box-border whitespace-nowrap px-4 py-2 font-medium leading-snug",
        "rounded-xl",
        "flex items-center justify-center",
        selected
          ? "border-2 border-main bg-white text-main"
          : "border border-gray-200 bg-white text-gray-900 hover:border-gray-300",
        className,
      )}
    >
      {selected && <CheckIcon className="mr-1" />}
      {children}
    </button>
  );
}
