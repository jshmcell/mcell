import Appear from "@/components/ui/Appear";
import { stats as defaultContent } from "@/data/mcell";
import type { ResolvedMcell } from "@/lib/mcell-content-resolve";

/**
 * 투자 유치 현황 — 원본: #eaeef2 배경, 네이비 #17375e 카드 290x155,
 * fadeInUp 1.2s (딜레이 0.2/0.3/0.4/0.5), PC 4열 / 모바일 2열
 */
export default function Stats({
  content = defaultContent,
}: {
  content?: ResolvedMcell["stats"];
}) {
  const cards = (mobile: boolean) =>
    content.map((stat, i) => (
      <Appear
        key={stat.label}
        duration={1.2}
        delay={0.2 + i * 0.1}
        disableOnMobile={mobile}
        className={mobile ? undefined : "w-1/4"}
      >
        <div className="flex h-[250px] flex-col items-center justify-center bg-navy-900 px-4 py-4 text-center text-white">
          <p className="text-[15px] leading-[2] md-header:text-[18px]">
            {stat.label}
          </p>
          <p className="text-[22px] font-bold leading-[2] md-header:text-[26px]">
            {stat.value}
          </p>
          <p className="text-[13px] leading-[2] text-[#b0bece] md-header:text-[18px]">
            {stat.note}
          </p>
        </div>
      </Appear>
    ));

  return (
    <>
      {/* PC: 카드 h-[250px], 섹션 min-h-[250px] */}
      <section className="hidden bg-[#eaeef2] md-header:block">
        <div className="container-site flex min-h-[250px] items-center justify-center gap-4 py-4">
          {cards(false)}
        </div>
      </section>
      {/* 모바일: 2열 카드 */}
      <section className="bg-[#eaeef2] md-header:hidden">
        <div className="grid grid-cols-2 gap-[15px] px-[15px] py-[36px]">
          {cards(true)}
        </div>
      </section>
    </>
  );
}
