import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CatalogDetailView from "@/components/library/CatalogDetailView";
import { catalogBand } from "@/data/portfolio";
import { getPublicPost, incrementViews } from "@/lib/boards";
import { getLocale } from "@/i18n/server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublicPost("catalog", id);
  return { title: post?.title ?? "카달로그" };
}

/** 카달로그 게시물 뷰 (원본 /40 뷰 페이지) — DB 기반 + 조회수 증가 */
export default async function CatalogViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const post = await getPublicPost("catalog", id);
  if (!post) notFound();

  await incrementViews(id);
  const pageTitle = locale === "ko" ? "카달로그" : "Catalog";

  return (
    <>
      <SubHero
        groupLabel={locale === "ko" ? "자료실" : "Library"}
        title={pageTitle}
        currentHref="/library/catalog"
        locale={locale}
      />
      <SubPageBanner image={catalogBand} heightClassName="h-[250px]" />
      <CatalogDetailView post={post} />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}