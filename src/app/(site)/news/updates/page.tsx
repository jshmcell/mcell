import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { newsBand } from "@/data/boards";
import { getPublicPosts } from "@/lib/boards";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "소식" : "Updates" };
}

export const dynamic = "force-dynamic";

/** 소식 (원본 /46) — 서브 히어로 + 와이드 밴드 + 게시판 (DB) */
export default async function UpdatesPage() {
  const locale = await getLocale();
  const posts = await getPublicPosts("updates");
  const pageTitle = locale === "ko" ? "소식" : "Updates";
  return (
    <>
      <SubHero
        groupLabel={locale === "ko" ? "뉴스" : "News"}
        title={pageTitle}
        currentHref="/news/updates"
        locale={locale}
      />
      <SubPageBanner image={newsBand} heightClassName="h-[300px]" locale={locale} />
      <BoardTable label={pageTitle} posts={posts} boardKey="updates" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}