import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldWrapperProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  customStyle?: string;
  isReadonly?: boolean;
  renderContent?: (field: any) => JSX.Element; // 커스텀 렌더링 지원
}

export function FormFileFieldWrapper({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  customStyle,
  isReadonly,
  renderContent,
}: FormFieldWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-testid={`${name}-section`}>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            {renderContent ? (
              renderContent(field)
            ) : (
              <Input
                readOnly={isReadonly || true}
                className={customStyle}
                placeholder={placeholder}
                type={type}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
