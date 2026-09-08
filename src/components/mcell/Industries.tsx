"use client";

import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import { useImageViewer } from "@/components/ui/ImageViewer";
import { industries as defaultContent } from "@/data/mcell";
import { useLocale } from "@/i18n/client";
import type { ResolvedMcell } from "@/lib/mcell-content-resolve";

/** 적용 산업 — 원본: 타이틀 블록 + 이미지 1173x413 (클릭 시 라이트박스) */
export default function Industries({
  content = defaultContent,
}: {
  content?: ResolvedMcell["industries"];
}) {
  const openViewer = useImageViewer();
  const locale = useLocale();

  return (
    <section className="bg-white">
      <div className="container-site pt-[60px] pb-[126px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">
            {content.heading}
          </p>
          <h2 className="text-[30px] font-bold text-ink">{content.title}</h2>
          <p className="mt-[6px] text-[18px] leading-[2] text-ink">
            {content.description}
          </p>
        </Appear>

        <Appear className="mt-[31px] block">
          <button
            type="button"
            aria-label={
              locale === "ko"
                ? "적용 산업 이미지 크게 보기"
                : "View industries image larger"
            }
            onClick={() =>
              openViewer([{ src: content.image, alt: content.title }])
            }
            className="mx-auto block cursor-pointer"
          >
            <SmartImage
              src={content.image}
              alt={content.title}
              width={1173}
              height={413}
              className="mx-auto h-auto w-full max-w-[1173px]"
              sizes="(min-width: 992px) 1173px, 100vw"
            />
          </button>
        </Appear>
      </div>
    </section>
  );
}
