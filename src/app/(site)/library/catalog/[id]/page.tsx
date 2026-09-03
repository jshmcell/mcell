import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CatalogDetailView from "@/components/library/CatalogDetailView";
import { boards } from "@/data/boards";
import { catalogBand } from "@/data/portfolio";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = boards.catalog.posts.find((p) => p.id === Number(id));
  return { title: post?.title ?? "카달로그" };
}

/** 카달로그 게시물 뷰 (원본 /40 뷰 페이지) — 서브 히어로 + 밴드 + 게시물 본문 */
export default async function CatalogViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!boards.catalog.posts.some((p) => p.id === Number(id))) notFound();
  return (
    <>
      <SubHero
        groupLabel="자료실"
        title="카달로그"
        currentHref="/library/catalog"
      />
      <SubPageBanner image={catalogBand} heightClassName="h-[250px]" />
      <CatalogDetailView />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}