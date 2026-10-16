import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, id, className, required, ...props }, ref) {
    const inputId = id ?? props.name;
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-[13px] font-semibold text-navy">
          {label}
          {required ? <span className="text-kabuki"> *</span> : null}
        </label>
        <textarea
          id={inputId}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={cn(
            "min-h-[120px] w-full rounded-button border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/60",
            "focus:outline-none focus:ring-4 focus:ring-kabuki/20 focus:border-kabuki",
            error && "border-kabuki",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} className="text-[13px] text-kabuki">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
