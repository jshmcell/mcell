import SubPageBanner from "@/components/subpage/SubPageBanner";
import Appear from "@/components/ui/Appear";

interface PartnershipSectionProps {
  heading: string;
  title: string;
  lines: string[];
  banner: string;
}

/**
 * 제휴 및 문의 — 편집 가능한 콘텐츠 섹션 (원본 /44):
 * 상단 배너(SubPageBanner) + 헤딩 블록(헤딩/타이틀/본문).
 * SubHero 크롬, 문의 폼, 배지, 슬라이더는 비편집 크롬이라 여기 포함하지 않는다.
 * 서버 페이지와 관리자 미리보기 양쪽에서 동일하게 사용한다.
 */
export default function PartnershipSection({
  heading,
  title,
  lines,
  banner,
}: PartnershipSectionProps) {
  return (
    <>
      <SubPageBanner image={banner} overlay />
      <section className="bg-[#f7f7f7]">
        <div className="container-site pt-[30px] text-center">
          <Appear animation="fadeIn" duration={0.7} className="my-[15px]">
            {/* 헤딩 블록 — 원본 h6: PC 20px/27px(#17375e) · 30px/36px(#363636) · 18px 줄간격 2,
                모바일 16px/22.4px, h6 마진 10px */}
            <h2 className="my-[10px] text-[16px] leading-[22.4px] font-bold text-navy-900 md-header:mt-[54px] md-header:text-[20px] md-header:leading-[27px]">
              {heading}
            </h2>
            <h2 className="my-[10px] text-[16px] leading-[22.4px] font-bold text-ink md-header:text-[30px] md-header:leading-[36px]">
              {title}
            </h2>
            <div className="text-[15px] leading-[30px] text-ink md-header:text-[18px] md-header:leading-[30px]">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Appear>
        </div>
      </section>
    </>
  );
}
