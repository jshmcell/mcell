"use client";

import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** Checkbox styled like the original imweb forms (square, navy check). */
export default function Checkbox({
  label,
  requiredLabel,
  className,
  ...rest
}: {
  label: string;
  /** Renders the red (필수) marker like the original. */
  requiredLabel?: boolean;
} & Omit<ComponentProps<"input">, "type">) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-2", className)}>
      <input type="checkbox" className="peer sr-only" {...rest} />
      <span
        aria-hidden
        className="mt-[2px] flex h-[16px] w-[16px] shrink-0 items-center justify-center border border-black/30 bg-white text-[11px] text-white transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900"
      >
        <svg
          viewBox="0 0 12 12"
          className={cn(
            "h-[10px] w-[10px] opacity-0 transition-opacity peer-checked:opacity-100",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M2 6.5 5 9.5 10 3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[13px] leading-[20px] text-ink">
        {label}
        {requiredLabel && (
          <>
            {" "}
            <em className="not-italic text-[#ff4d4d]">(필수)</em>
          </>
        )}
      </span>
    </label>
  );
}
