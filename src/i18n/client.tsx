"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/cn";
import { chromeDict } from "./chrome";
import {
  LOCALE_COOKIE,
  getPathLocale,
  switchLocalePath,
  type Locale,
} from "./config";

export function useLocale(): Locale {
  const pathname = usePathname();
  return getPathLocale(pathname);
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.9 5.6 3.9 9S14.5 18.6 12 21c-2.5-2.4-3.9-5.6-3.9-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

const LANGUAGE_OPTIONS: Array<{ value: Locale; labelKey: "korean" | "english"; code: string }> = [
  { value: "ko", labelKey: "korean", code: "KR" },
  { value: "en", labelKey: "english", code: "EN" },
];

/**
 * Industry-standard language selector: globe button + dropdown menu
 * (한국어 / English with active checkmark). Closes on outside click / Escape.
 * `variant="dark"` for the navy header/drawer, `"light"` for the white mobile bar.
 */
export function LocaleMenu({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const locale = getPathLocale(pathname);
  const t = chromeDict[locale].language;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dark = variant === "dark";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    // eslint-disable-next-line react-hooks/immutability -- locale cookie, not React state
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000`;
    router.push(switchLocalePath(pathname, next));
    // 클라이언트 라우터 캐시가 이전 언어의 RSC 페이로드를 재사용하지 않도록 강제 재검증
    router.refresh();
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.label}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px] leading-[18px] transition-colors",
          dark
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-black/15 text-navy-900 hover:bg-black/5",
        )}
      >
        <GlobeIcon className="h-3.5 w-3.5" />
        <span className="font-medium">{locale === "ko" ? "KR" : "EN"}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          className={cn("transition-transform", open && "rotate-180")}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={t.label}
          className="absolute right-0 top-[calc(100%+8px)] z-[1002] min-w-[150px] overflow-hidden rounded-md bg-white py-1 shadow-dropdown"
        >
          {LANGUAGE_OPTIONS.map((opt) => {
            const active = opt.value === locale;
            return (
              <li key={opt.value} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => switchTo(opt.value)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[13px] transition-colors hover:bg-slate-100",
                    active
                      ? "font-bold text-navy-900"
                      : "text-ink-soft",
                  )}
                >
                  <span>
                    {t[opt.labelKey]}
                    <span className="ml-1.5 text-[11px] text-ink/40">
                      {opt.code}
                    </span>
                  </span>
                  {active && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden
                      className="shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
