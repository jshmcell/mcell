import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { catalogBand } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "카달로그",
};

/** 카달로그 (원본 /40) — 서브 히어로 + 와이드 밴드 + 게시판 */
export default function CatalogPage() {
  return (
    <>
      <SubHero
        groupLabel="자료실"
        title="카달로그"
        currentHref="/library/catalog"
      />
      <SubPageBanner image={catalogBand} heightClassName="h-[300px]" />
      <BoardTable boardKey="catalog" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}
