import Appear from "@/components/ui/Appear";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import SmartImage from "@/components/ui/SmartImage";
import InquiryForm from "@/components/forms/InquiryForm";
import { partnership } from "@/data/partnership";
import { EN_PARTNERSHIP } from "@/data/content-en";
import { partnerStrip, partnerStripFull, partnershipBadge } from "@/data/mcell";
import { getLocale } from "@/i18n/server";

/**
 * PARTNERSHIP INQUIRY — 원본 /31·/32 하단 임베드 섹션 (#f7f7f7 배경,
 * 타이틀 블록 fadeIn 0.7s + 입력폼 + 배지(181x67, 107px 행) + 60px 스페이서 +
 * 풀 블리드 무한 슬라이드(166px) + 하단 여백 146px (모바일 73px))
 */
export default async function PartnershipInquiry() {
  const locale = await getLocale();
  const heading =
    locale === "en" ? (EN_PARTNERSHIP.heading ?? partnership.heading) : partnership.heading;
  const title =
    locale === "en" ? (EN_PARTNERSHIP.title ?? partnership.title) : partnership.title;
  const lines =
    locale === "en" && EN_PARTNERSHIP.lines
      ? EN_PARTNERSHIP.lines.split(/\r?\n/)
      : partnership.lines;

  return (
    <section className="bg-[#f7f7f7]">
      <div className="container-site pt-[60px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">
            {heading}
          </p>
          <h2 className="text-[30px] font-bold text-ink">
            {title}
          </h2>
          <div className="mt-[6px] text-[18px] leading-[2] text-ink">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Appear>

        <div className="mt-[20px]">
          <InquiryForm />
        </div>
      </div>

      {/* 배지 행 — 원본 107px 행 (상하 20px + 181x67 이미지) */}
      <div className="container-site flex justify-center py-[20px]">
        <SmartImage
          src={partnershipBadge}
          alt=""
          width={181}
          height={67}
          className="h-auto w-[181px]"
          sizes="181px"
        />
      </div>

      {/* 스페이서 60px */}
      <div aria-hidden className="h-[60px]" />

      {/* 하단 무한 슬라이드 — 원본 slide_05 갤러리 (풀 블리드 166px, 클릭 시 라이트박스) */}
      <InfiniteSlider
        images={partnerStrip}
        fullImages={partnerStripFull}
        duration={36}
      />

      {/* 하단 여백 — 원본 146px (모바일 73px) */}
      <div aria-hidden className="h-[73px] md-header:h-[146px]" />
    </section>
  );
}
