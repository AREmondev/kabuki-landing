import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, error, id, className, required, options, placeholder = "নির্বাচন করুন", ...props },
    ref,
  ) {
    const inputId = id ?? props.name;
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-[13px] font-semibold text-navy">
          {label}
          {required ? <span className="text-kabuki"> *</span> : null}
        </label>
        <select
          id={inputId}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            "h-12 w-full rounded-button border border-line bg-white px-4 text-[15px] text-ink",
            "focus:outline-none focus:ring-4 focus:ring-kabuki/20 focus:border-kabuki",
            error && "border-kabuki",
            className,
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error ? (
          <p id={errorId} className="text-[13px] text-kabuki">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
