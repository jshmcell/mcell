import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import PortfolioGrid from "@/components/library/PortfolioGrid";
import { portfolioBand } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "포트폴리오",
};

/** 포트폴리오 (원본 /39) — 서브 히어로 + 와이드 밴드 + 갤러리 */
export default function PortfolioPage() {
  return (
    <>
      <SubHero
        groupLabel="자료실"
        title="포트폴리오"
        currentHref="/library/portfolio"
      />
      <SubPageBanner image={portfolioBand} heightClassName="h-[300px]" />
      <PortfolioGrid />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}
