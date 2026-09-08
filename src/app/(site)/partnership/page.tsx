import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import PartnershipSection from "@/components/partnership/PartnershipSection";
import InquiryForm from "@/components/forms/InquiryForm";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import SmartImage from "@/components/ui/SmartImage";
import { partnership } from "@/data/partnership";
import { EN_PARTNERSHIP } from "@/data/content-en";
import { partnerStrip, partnerStripFull, partnershipBadge } from "@/data/mcell";
import { getLocale } from "@/i18n/server";
import { getContentRows, pickLines, pickText } from "@/lib/content";
import { PARTNERSHIP_CONTENT_KEYS } from "@/lib/content-registry";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "제휴 및 문의" : "Partnership" };
}

export const dynamic = "force-dynamic";

/**
 * 제휴 및 문의 (원본 /44) — 서브 히어로 + 300px 배너(0.45 오버레이) +
 * #f7f7f7 문의 섹션(헤딩 블록 + 입력폼 + 배지 + 슬라이드 갤러리).
 * 갤러리는 /mcell/oem-odm과 동일한 InfiniteSlider(뷰포트 비례 아이템,
 * 4:3, 6px 거터, 무한 마퀴, 클릭 시 라이트박스)를 사용.
 * 헤딩/타이틀은 관리자 페이지 콘텐츠 오버라이드 가능 (page_content).
 */
export default async function PartnershipPage() {
  const locale = await getLocale();
  const rows = await getContentRows(PARTNERSHIP_CONTENT_KEYS);
  const heading = pickText(rows, "partnership.heading", locale, EN_PARTNERSHIP.heading ?? partnership.heading);
  const title = pickText(
    rows,
    "partnership.title",
    locale,
    locale === "en" ? (EN_PARTNERSHIP.title ?? partnership.title) : partnership.title,
  );
  const lines = pickLines(
    rows,
    "partnership.lines",
    locale,
    locale === "en" && EN_PARTNERSHIP.lines
      ? EN_PARTNERSHIP.lines.split(/\r?\n/)
      : partnership.lines,
  );
  const banner = pickText(rows, "partnership.banner", locale, partnership.banner);
  const pageTitle = locale === "ko" ? "제휴 및 문의" : "Partnership";

  return (
    <>
      <SubHero
        groupLabel={locale === "ko" ? "제휴 및 문의" : "Partnership"}
        title={pageTitle}
        currentHref="/partnership"
        compact
        locale={locale}
      />
      <PartnershipSection heading={heading} title={title} lines={lines} banner={banner} />

      <section className="bg-[#f7f7f7]">
        <div className="container-site text-center">
          <div className="my-[15px] md-header:mt-[30px]">
            <InquiryForm />
          </div>

          {/* 배지 — 원본 181x67, 위젯 마진 15px(모바일 7.5px) */}
          <div className="flex justify-center py-[7.5px] md-header:py-[15px]">
            <SmartImage
              src={partnershipBadge}
              alt=""
              width={181}
              height={67}
              className="h-auto w-[181px]"
              sizes="181px"
            />
          </div>
        </div>

        {/* 60px 스페이서 후 풀 블리드 무한 슬라이드 — /mcell/oem-odm과 동일 컴포넌트 */}
        <div aria-hidden className="h-[60px]" />
        <InfiniteSlider
          images={partnerStrip}
          fullImages={partnerStripFull}
          duration={36}
        />

        {/* 하단 여백 — 원본 146px (모바일 73px) */}
        <div aria-hidden className="h-[73px] md-header:h-[146px]" />
      </section>
    </>
  );
}
