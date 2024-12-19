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
        "rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all sm:text-base",
        value === nameCheck && "bg-gray-250 text-main",
      )}
      onClick={() => onChange(nameCheck)}
    >
      {buttonText}
    </button>
  );
}
