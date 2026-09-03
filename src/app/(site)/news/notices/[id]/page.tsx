import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardDetailView from "@/components/library/BoardDetailView";
import { boards } from "@/data/boards";
import { newsBand } from "@/data/boards";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = boards.notices.posts.find((p) => p.id === Number(id));
  return { title: post?.title ?? "공지사항" };
}

/** 공지사항 게시물 뷰 (원본 /45 뷰 페이지) — 서브 히어로 + 밴드 + 게시물 본문 */
export default async function NoticeViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!boards.notices.posts.some((p) => p.id === Number(id))) notFound();
  return (
    <>
      <SubHero
        groupLabel="뉴스"
        title="공지사항"
        currentHref="/news/notices"
      />
      <SubPageBanner image={newsBand} heightClassName="h-[250px]" />
      <BoardDetailView boardKey="notices" postId={Number(id)} />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}