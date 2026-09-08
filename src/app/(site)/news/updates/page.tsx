import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { newsBand } from "@/data/boards";
import { getPublicPosts } from "@/lib/boards";
import { getLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "소식",
};

export const dynamic = "force-dynamic";

/** 소식 (원본 /46) — 서브 히어로 + 와이드 밴드 + 게시판 (DB) */
export default async function UpdatesPage() {
  const locale = await getLocale();
  const posts = await getPublicPosts("updates");
  return (
    <>
      <SubHero
        groupLabel="뉴스"
        title="소식"
        currentHref="/news/updates"
        locale={locale}
      />
      <SubPageBanner image={newsBand} heightClassName="h-[300px]" locale={locale} />
      <BoardTable label="소식" posts={posts} boardKey="updates" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}