import { useId } from "react";

export type TypeInputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  //onChange?: (value?: string | undefined) => {};
};

export default function Input({
  label,
  error,
  readOnly,
  ref,
  className,
  ...props
}: TypeInputProps) {
  const inputId = useId();
  return (
    <div className="form-control w-full flex flex-col gap-1.5">
      {/* Label using base-content for better theme support */}
      {label && (
        <label
          htmlFor={inputId}
          className="label-text font-semibold text-base-content/80 first-letter:capitalize ml-1"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        readOnly={readOnly}
        {...props}
        aria-invalid={!!error}
        className={`
            border-2 outline-blue-500 border-gray-300 h-10 rounded p-2
            bg-base-100 text-base-content
            ${error ? "outline-red-500" : ""}
            ${readOnly ? "bg-base-200 cursor-not-allowed" : ""}
            ${className}
          `}
      />

      {/* Error message using the semantic error color from your palette */}
      {error && (
        <p className="text-red-500 text-xs font-medium mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
