import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { newsBand } from "@/data/boards";
import { getPublicPosts } from "@/lib/boards";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "공지사항" : "Notices" };
}

export const dynamic = "force-dynamic";

/** 공지사항 (원본 /45) — 서브 히어로 + 와이드 밴드 + 게시판 (DB) */
export default async function NoticesPage() {
  const locale = await getLocale();
  const posts = await getPublicPosts("notices");
  const pageTitle = locale === "ko" ? "공지사항" : "Notices";
  return (
    <>
      <SubHero
        groupLabel={locale === "ko" ? "뉴스" : "News"}
        title={pageTitle}
        currentHref="/news/notices"
        locale={locale}
      />
      <SubPageBanner image={newsBand} heightClassName="h-[300px]" locale={locale} />
      <BoardTable label={pageTitle} posts={posts} boardKey="notices" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}