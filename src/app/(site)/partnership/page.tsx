import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import InquiryForm from "@/components/forms/InquiryForm";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { partnership } from "@/data/partnership";
import { partnerStrip, partnerStripFull, partnershipBadge } from "@/data/mcell";

export const metadata: Metadata = {
  title: "제휴 및 문의",
};

/**
 * 제휴 및 문의 (원본 /44) — 서브 히어로 + 300px 배너(0.45 오버레이) +
 * #f7f7f7 문의 섹션(헤딩 블록 + 입력폼 + 배지 + 슬라이드 갤러리).
 * 갤러리는 /mcell/oem-odm과 동일한 InfiniteSlider(뷰포트 비례 아이템,
 * 4:3, 6px 거터, 무한 마퀴, 클릭 시 라이트박스)를 사용.
 */
export default function PartnershipPage() {
  return (
    <>
      <SubHero
        groupLabel="제휴 및 문의"
        title="제휴 및 문의"
        currentHref="/partnership"
        compact
      />
      <SubPageBanner image={partnership.banner} overlay />

      <section className="bg-[#f7f7f7]">
        <div className="container-site pt-[30px] text-center">
          <Appear animation="fadeIn" duration={0.7} className="my-[15px]">
            {/* 헤딩 블록 — 원본 h6: PC 20px/27px(#17375e) · 30px/36px(#363636) · 18px 줄간격 2,
                모바일 16px/22.4px, h6 마진 10px */}
            <h2 className="my-[10px] text-[16px] leading-[22.4px] font-bold text-navy-900 md-header:mt-[54px] md-header:text-[20px] md-header:leading-[27px]">
              {partnership.heading}
            </h2>
            <h2 className="my-[10px] text-[16px] leading-[22.4px] font-bold text-ink md-header:text-[30px] md-header:leading-[36px]">
              {partnership.title}
            </h2>
            <div className="text-[15px] leading-[30px] text-ink md-header:text-[18px] md-header:leading-[30px]">
              {partnership.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Appear>

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
