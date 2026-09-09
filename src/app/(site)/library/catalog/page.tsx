import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { catalogBand } from "@/data/portfolio";
import { getPublicPosts } from "@/lib/boards";
import { getLocale } from "@/i18n/server";
import { getActor } from "@/lib/roles";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "카달로그" : "Catalog" };
}

export const dynamic = "force-dynamic";

/** 카달로그 (원본 /40) — 서브 히어로 + 와이드 밴드 + 게시판 (DB) */
export default async function CatalogPage() {
  const locale = await getLocale();
  const posts = await getPublicPosts("catalog");
  const actor = await getActor();
  const pageTitle = locale === "ko" ? "카달로그" : "Catalog";
  return (
    <>
      <SubHero
        groupLabel={locale === "ko" ? "자료실" : "Library"}
        title={pageTitle}
        currentHref="/library/catalog"
        locale={locale}
      />
      <SubPageBanner image={catalogBand} heightClassName="h-[300px]" />
      <BoardTable label={pageTitle} posts={posts} boardKey="catalog" isAdmin={actor?.isAdmin} />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}
