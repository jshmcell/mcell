import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardDetailView from "@/components/library/BoardDetailView";
import { newsBand } from "@/data/boards";
import { getAdjacentPosts, getPublicPost, incrementViews } from "@/lib/boards";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublicPost("notices", id);
  return { title: post?.title ?? "공지사항" };
}

/** 공지사항 게시물 뷰 (원본 /45 뷰 페이지) — DB 기반 + 조회수 증가 */
export default async function NoticeViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPublicPost("notices", id);
  if (!post) notFound();

  await incrementViews(id);
  const { prev, next } = await getAdjacentPosts("notices", id);

  return (
    <>
      <SubHero groupLabel="뉴스" title="공지사항" currentHref="/news/notices" />
      <SubPageBanner image={newsBand} heightClassName="h-[250px]" />
      <BoardDetailView boardKey="notices" post={post} prev={prev} next={next} />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}