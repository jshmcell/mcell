import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CatalogDetailView from "@/components/library/CatalogDetailView";
import { catalogBand } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "카달로그",
};

/** 카달로그 게시물 뷰 (원본 /40 뷰 페이지) — 서브 히어로 + 밴드 + 게시물 본문 */
export default function CatalogViewPage() {
  return (
    <>
      <SubHero
        groupLabel="자료실"
        title="카달로그"
        currentHref="/library/catalog"
      />
      <SubPageBanner image={catalogBand} heightClassName="h-[250px]" />
      <CatalogDetailView />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}