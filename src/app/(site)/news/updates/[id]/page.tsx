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
  const post = await getPublicPost("updates", id);
  return { title: post?.title ?? "소식" };
}

/** 소식 게시물 뷰 (원본 /46 뷰 페이지) — DB 기반 + 조회수 증가 */
export default async function UpdateViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPublicPost("updates", id);
  if (!post) notFound();

  await incrementViews(id);
  const { prev, next } = await getAdjacentPosts("updates", id);

  return (
    <>
      <SubHero groupLabel="뉴스" title="소식" currentHref="/news/updates" />
      <SubPageBanner image={newsBand} heightClassName="h-[250px]" />
      <BoardDetailView boardKey="updates" post={post} prev={prev} next={next} />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}