"use client";

import Link from "next/link";
import type { PublicPost } from "@/lib/boards";

const BOARD_BASE: Record<string, string> = {
  notices: "/news/notices",
  updates: "/news/updates",
  catalog: "/library/catalog",
  portfolio: "/library/portfolio",
};

/**
 * 게시물 뷰 — 원본 /40·/45·/46 뷰 페이지 공통 레이아웃.
 * 제목(20px/32px) → 작성자(14px)+카테고리·날짜·조회수(13px, 70%회색·카테고리 #757575)
 * 66px 행(아바타 없음, 원본 뉴스·카달로그 보드 공통) → 본문(15px/24px, y226) →
 * (첨부 박스 #f7f7f7, 있을 때) → 좋아요/댓글 46px 행 + 공유·인쇄 →
 * 이전글/다음글 리스트(43~44px 행, 1px 구분선) → 목록(63x30) 버튼.
 * 섹션 여백: 상 15px / 하 15px. 데이터: DB.
 * 공유: navigator.share(미지원 시 클립보드), 인쇄: window.print().
 */
export default function BoardDetailView({
  boardKey,
  post,
  prev,
  next,
}: {
  boardKey: string;
  post: PublicPost;
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}) {
  const base = BOARD_BASE[boardKey];

  const onShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        /* 사용자 취소 */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* 권한 없음 */
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="container-site pt-[15px] pb-[15px]">
        {/* 제목 */}
        <h1 className="text-[20px] leading-[32px] text-[#363636]">
          {post.title}
        </h1>

        {/* 작성자 행 */}
        <div className="pt-[15px] pb-[14px]">
          <p className="text-[14px] leading-[21px] text-[#363636]">
            {post.author}
          </p>
          <p className="mt-[2px] flex items-center gap-[10px] text-[13px] leading-[16px]">
            <span className="text-[#757575]">{post.category}</span>
            <span className="text-[#363636]/70">{post.date}</span>
            <span className="text-[#363636]/70">조회수{post.views}</span>
          </p>
        </div>

        {/* 본문 */}
        {post.body ? (
          <div
            className="fr-view-content text-[15px] leading-[24px] text-[#363636] [&_li]:ml-[16px] [&_p]:mb-[8px] [&_ul]:list-disc"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        ) : (
          <div className="min-h-[80px]" />
        )}

        {/* 첨부 박스 */}
        {post.attachment && (
          <div className="mt-[20px] flex items-center gap-3 rounded-[3px] bg-[#f7f7f7] px-[14px] py-[12px]">
            <span aria-hidden className="text-[15px]">📎</span>
            <a
              href={post.attachment.href}
              className="text-[13px] text-[#363636] underline-offset-4 hover:underline"
              download
            >
              {post.attachment.name}
            </a>
            <span className="text-[12px] text-ink/50">{post.attachment.size}</span>
          </div>
        )}

        {/* 좋아요/댓글 행 */}
        <div className="mt-[20px] flex items-center justify-between border-y border-black/10 py-[10px]">
          <div className="flex gap-3 text-[13px] text-ink/60">
            <span>좋아요 0</span>
            <span>댓글 0</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onShare}
              className="h-[30px] rounded-[2px] border border-black/15 px-3 text-[12px] text-ink hover:border-navy-700"
            >
              공유
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="h-[30px] rounded-[2px] border border-black/15 px-3 text-[12px] text-ink hover:border-navy-700"
            >
              인쇄
            </button>
          </div>
        </div>

        {/* 이전/다음 글 */}
        <div className="mt-[10px]">
          {prev && (
            <Link
              href={`${base}/${prev.id}`}
              className="flex h-[44px] items-center gap-2 border-b border-black/10 text-[13px] text-ink/70 hover:text-navy-900"
            >
              <span className="shrink-0 rounded-[2px] bg-black/5 px-2 py-0.5 text-[11px]">
                이전글
              </span>
              <span className="line-clamp-1">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`${base}/${next.id}`}
              className="flex h-[43px] items-center gap-2 border-b border-black/10 text-[13px] text-ink/70 hover:text-navy-900"
            >
              <span className="shrink-0 rounded-[2px] bg-black/5 px-2 py-0.5 text-[11px]">
                다음글
              </span>
              <span className="line-clamp-1">{next.title}</span>
            </Link>
          )}
        </div>

        {/* 목록 버튼 */}
        <div className="mt-[15px] flex justify-end">
          <Link
            href={base}
            className="flex h-[30px] w-[63px] items-center justify-center rounded-[2px] bg-[#363636] text-[12px] text-white"
          >
            목록
          </Link>
        </div>
      </div>
    </section>
  );
}