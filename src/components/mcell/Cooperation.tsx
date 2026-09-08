"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import { cooperation as defaultContent } from "@/data/mcell";
import { useLocale } from "@/i18n/client";
import type { ResolvedMcell } from "@/lib/mcell-content-resolve";

/**
 * 기술 협력 현황 — 원본: 타이틀 블록 + 전체 폭 슬라이드 갤러리 1250x447
 * (owl custom_nav, 사이드 화살표). 모바일에서는 갤러리 숨김(타이틀만).
 */
export default function Cooperation({
  content = defaultContent,
}: {
  content?: ResolvedMcell["cooperation"];
}) {
  const locale = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-white">
      <div className="container-site pt-[92px] pb-[42px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">
            {content.heading}
          </p>
          <h2 className="text-[30px] font-bold text-ink">
            {content.title}
          </h2>
          <p className="mt-[6px] text-[18px] leading-[2] text-ink">
            {content.description}
          </p>
        </Appear>

        <Appear className="relative mt-0 hidden md-header:block">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {content.slides.map((slide, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                  <SmartImage
                    src={slide}
                    alt={
                      locale === "ko"
                        ? `기술 협력 ${i + 1}`
                        : `Technology cooperation ${i + 1}`
                    }
                    width={1250}
                    height={447}
                    className="h-[447px] w-full object-cover"
                    sizes="(min-width: 992px) 1250px, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label={locale === "ko" ? "이전 슬라이드" : "Previous slide"}
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <svg
              width="22"
              height="22"
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
            aria-label={locale === "ko" ? "다음 슬라이드" : "Next slide"}
            onClick={scrollNext}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div className="mt-[14px] flex items-center justify-center gap-2">
            {content.slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={
                  locale === "ko" ? `슬라이드 ${i + 1}` : `Slide ${i + 1}`
                }
                onClick={() => emblaApi?.scrollTo(i)}
                className={
                  i === selected
                    ? "h-2.5 w-2.5 rounded-full bg-[#363636]"
                    : "h-2.5 w-2.5 rounded-full border border-[#bbb] bg-white"
                }
              />
            ))}
          </div>
        </Appear>
      </div>
    </section>
  );
}
