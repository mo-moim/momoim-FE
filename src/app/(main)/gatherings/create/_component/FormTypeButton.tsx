import clsx from "clsx";

interface FormTypeButtonProps {
  name: string;
  value: string;
  buttonText: string;
  onChange: (value: string | boolean) => void;
}

export default function FormTypeButton({ name, value, buttonText, onChange }: FormTypeButtonProps) {
  let nameCheck;

  if (name === "SHORT") {
    nameCheck = false;
  } else if (name === "LONG") {
    nameCheck = true;
  } else {
    nameCheck = name;
  }

  return (
    <button
      type="button"
      className={clsx(
        "rounded-lg border border-gray-500 px-4 py-3 text-sm font-medium text-gray-700 transition-all",
        value === nameCheck && "border-main bg-main text-white",
      )}
      onClick={() => onChange(nameCheck)}
    >
      {buttonText}
    </button>
  );
}
