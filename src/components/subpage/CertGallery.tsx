"use client";

import { useCallback, useEffect, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import type { Certification } from "@/data/certifications";

/**
 * 인증서 갤러리 — 원본: 4열(PC)/2열(모바일·태블릿), 이미지 클릭 시 라이트박스
 * (원본 크기 이미지, 좌우 화살표, ESC 닫기)
 */
export default function CertGallery({ items }: { items: Certification[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? null : (i + dir + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, move]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-[10px] gap-y-[16px] md-header:grid-cols-4 md-header:gap-x-5 md-header:gap-y-10">
        {items.map((cert, i) => (
          <button
            key={cert.thumb}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`인증서 ${i + 1} 크게 보기`}
            className="cursor-pointer"
          >
            <SmartImage
              src={cert.thumb}
              alt="엠셀 인증서"
              width={298}
              height={397}
              className="aspect-[3/4] w-full border border-[#eeeeee] object-cover"
              sizes="(min-width: 992px) 25vw, 50vw"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="인증서 크게 보기"
        >
          <div
            className="relative h-[85vh] w-[90vw] md-header:h-[86vh] md-header:w-[70vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              src={items[open].full}
              alt="엠셀 인증서"
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            aria-label="이전 인증서"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md-header:left-6"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            aria-label="다음 인증서"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md-header:right-6"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
