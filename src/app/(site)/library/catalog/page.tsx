import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { catalogBand } from "@/data/portfolio";
import { getPublicPosts } from "@/lib/boards";
import { getLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "카달로그",
};

export const dynamic = "force-dynamic";

/** 카달로그 (원본 /40) — 서브 히어로 + 와이드 밴드 + 게시판 (DB) */
export default async function CatalogPage() {
  const locale = await getLocale();
  const posts = await getPublicPosts("catalog");
  return (
    <>
      <SubHero
        groupLabel="자료실"
        title="카달로그"
        currentHref="/library/catalog"
        locale={locale}
      />
      <SubPageBanner image={catalogBand} heightClassName="h-[300px]" locale={locale} />
      <BoardTable label="카달로그" posts={posts} boardKey="catalog" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}
