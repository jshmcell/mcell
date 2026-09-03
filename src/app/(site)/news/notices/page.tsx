import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { newsBand } from "@/data/boards";
import { getPublicPosts } from "@/lib/boards";

export const metadata: Metadata = {
  title: "공지사항",
};

export const dynamic = "force-dynamic";

/** 공지사항 (원본 /45) — 서브 히어로 + 와이드 밴드 + 게시판 (DB) */
export default async function NoticesPage() {
  const posts = await getPublicPosts("notices");
  return (
    <>
      <SubHero groupLabel="뉴스" title="공지사항" currentHref="/news/notices" />
      <SubPageBanner image={newsBand} heightClassName="h-[300px]" />
      <BoardTable label="공지사항" posts={posts} boardKey="notices" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}