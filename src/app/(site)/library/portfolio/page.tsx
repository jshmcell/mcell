import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import PortfolioGrid from "@/components/library/PortfolioGrid";
import { portfolioBand } from "@/data/portfolio";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "포트폴리오" : "Portfolio" };
}

/** 포트폴리오 (원본 /39) — 서브 히어로 + 와이드 밴드 + 갤러리 */
export default async function PortfolioPage() {
  const locale = await getLocale();
  const pageTitle = locale === "ko" ? "포트폴리오" : "Portfolio";
  return (
    <>
      <SubHero
        groupLabel={locale === "ko" ? "자료실" : "Library"}
        title={pageTitle}
        currentHref="/library/portfolio"
        locale={locale}
      />
      <SubPageBanner image={portfolioBand} heightClassName="h-[300px]" locale={locale} />
      <PortfolioGrid />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}
