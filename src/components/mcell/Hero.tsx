import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { hero as defaultContent } from "@/data/mcell";
import type { Locale } from "@/i18n/config";
import type { ResolvedMcell } from "@/lib/mcell-content-resolve";

const STRIP_COPIES = 12;

/**
 * 기술력 소개 배너 — 원본: 473px(PC)/387px(모바일), bg + 0.35 오버레이,
 * 36px 타이틀 + 18px 설명 + 140px 로고, 하단 이미지 스트립(원본: 같은 이미지 반복 슬라이드,
 * 높이 142px@1280 = 11vw, 뷰포트 비례)
 */
export default function McellHero({
  content = defaultContent,
  // Default exists for client-component use (admin preview); server callers must pass the real locale.
  locale = "ko",
}: {
  content?: ResolvedMcell["hero"];
  locale?: Locale;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        role="img"
        aria-label=""
        className="h-[387px] bg-cover bg-center md-header:h-[473px]"
        style={{ backgroundImage: `url(${content.bg})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/35" />

      <Appear
        animation="fadeInUp"
        duration={1.2}
        className="container-site absolute inset-x-0 top-0 flex h-[calc(100%-11vw)] flex-col items-center justify-center text-center"
      >
        <h1 className="text-[24px] font-bold leading-[2] text-white md-header:text-[36px]">
          {content.title}
        </h1>
        <p className="text-[15px] leading-[2] text-white md-header:text-[18px]">
          {content.description}
        </p>
        <div className="mt-[18px] md-header:mt-0">
          <SmartImage
            src={content.logo}
            alt={locale === "ko" ? "엠셀" : "MCell"}
            width={140}
            height={52}
            className="h-auto w-[140px]"
            sizes="140px"
          />
        </div>
      </Appear>

      {/* 하단 이미지 스트립 — 원본과 같이 같은 이미지가 천천히 흐른다 (뷰포트 비례) */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        aria-hidden
      >
        <div className="flex w-max animate-[strip-slide_40s_linear_infinite]">
          {Array.from({ length: STRIP_COPIES }).map((_, i) => (
            <SmartImage
              key={i}
              src={content.strip}
              alt=""
              width={360}
              height={142}
              className="h-[11vw] w-[28.125vw] shrink-0 object-cover"
              sizes="100vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
