"use client";

import Link from "next/link";
import { boards } from "@/data/boards";

/** 게시판 URL prefix — boardKey → 실제 라우트 (/news/*, /library/*) */
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
 * 섹션 여백: 상 15px / 하 15px. 카달로그 게시물은 첨부 박스가 본문 아래에 붙고
 * 댓글 안내 폼이 이 보드 뷰와 달리 카달로그 전용(로그인 안내) — 카달로그는
 * CatalogDetailView를 그대로 사용한다.
 * 공유: navigator.share(미지원 시 클립보드), 인쇄: window.print().
 */
export default function BoardDetailView({
  boardKey,
  postId,
}: {
  boardKey: keyof typeof boards;
  postId: number;
}) {
  const board = boards[boardKey];
  const post = board.posts.find((p) => p.id === postId);
  if (!post) return null;

  const idx = board.posts.findIndex((p) => p.id === postId);
  const prev = board.posts[idx - 1];
  const next = board.posts[idx + 1];

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

        {/* 작성자 행 — 원본: 아바타 없이 이름 14px + 메타 13px */}
        <div className="pt-[15px] pb-[14px]">
          <p className="text-[14px] leading-[21px] text-[#363636]">
            {post.author}
          </p>
          <p className="mt-[2px] flex items-center gap-[10px] text-[13px] leading-[16px]">
            <span className="text-[#757575]">{post.category}</span>
            <span className="text-[#363636]/70">{post.date}</span>
            <span className="text-[#363636]/70">조회수 {post.views ?? 0}</span>
          </p>
        </div>

        {/* 본문 */}
        <div
          className="pt-[14px] pb-[10px] text-[15px] leading-[24px] text-[#363636] [&_li]:ml-[40px] [&_li]:list-disc [&_p]:min-h-[24px] [&_ul]:my-[24px]"
          dangerouslySetInnerHTML={{ __html: post.body ?? "" }}
        />

        {/* 첨부 박스 */}
        {post.attachment && (
          <div className="mt-[20px] flex items-center justify-between bg-[#f7f7f7] px-[15px] py-[15px]">
            <div>
              <p className="text-[15px] leading-[21px] text-[#363636]">
                {post.attachment.name}
              </p>
              <p className="text-[12px] italic text-[#999]">
                {post.attachment.size}
              </p>
            </div>
            <a
              href={post.attachment.href}
              download
              aria-label="첨부파일 다운로드"
              className="-mr-[4px] p-[5px] text-[#999] transition-colors hover:text-[#363636]"
            >
              <svg
                width="14"
                height="24"
                viewBox="0 0 14 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M7 3v13m0 0 4.5-4.5M7 16 2.5 11.5" />
                <path d="M2 19.5h10" />
              </svg>
            </a>
          </div>
        )}

        {/* 좋아요/댓글 카운트 + 공유/인쇄 */}
        <div className="mt-[24px] flex h-[46px] items-center justify-between text-[17px] text-[#363636]">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="좋아요"
              className="flex h-[46px] w-[35px] items-center gap-[5px]"
            >
              <svg width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 20s-7-4.35-9.33-8.11C.9 9.02 2.24 5.5 5.5 5.5c2 0 3.4 1.1 4.13 2.24L12 10l2.37-2.26C15.1 6.6 16.5 5.5 18.5 5.5c3.26 0 4.6 3.52 2.83 6.39C19 15.65 12 20 12 20Z" />
              </svg>
              0
            </button>
            <span className="flex h-[46px] items-center gap-[5px] pl-[17px]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5c-1.53 0-2.98-.36-4.25-1L3 20l1.33-4.09A8.5 8.5 0 1 1 21 11.5Z" />
              </svg>
              0
            </span>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              aria-label="공유"
              onClick={onShare}
              className="flex h-[46px] w-[41px] items-center justify-center text-[#363636] transition-colors hover:text-navy-900"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="18" cy="5" r="2.6" />
                <circle cx="6" cy="12" r="2.6" />
                <circle cx="18" cy="19" r="2.6" />
                <path d="m8.3 10.7 7.4-4.3m0 11.2-7.4-4.3" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="인쇄"
              onClick={() => window.print()}
              className="hidden h-[46px] w-[29px] items-center justify-center text-[#363636] transition-colors hover:text-navy-900 md-header:flex"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M6 9V3h12v6" />
                <rect x="3" y="9" width="18" height="8" rx="1.5" />
                <path d="M6 14h12v7H6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 이전글/다음글 */}
        <div className="mt-[16px] border-t border-black/10">
          {prev && (
            <Link
              href={`${BOARD_BASE[boardKey]}/${prev.id}`}
              className="flex h-[44px] items-center gap-[14px] border-b border-black/10 px-[16px] text-[14px] text-[#363636]"
            >
              <svg aria-hidden viewBox="0 0 12 12" className="h-[12px] w-[12px] shrink-0 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m7 2-4 4 4 4" />
              </svg>
              <span className="line-clamp-1">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`${BOARD_BASE[boardKey]}/${next.id}`}
              className="flex h-[43px] items-center gap-[14px] border-b border-black/10 px-[16px] text-[14px] text-[#363636]"
            >
              <svg aria-hidden viewBox="0 0 12 12" className="h-[12px] w-[12px] shrink-0 rotate-90 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m2 4 4 4 4-4" />
              </svg>
              <span className="line-clamp-1">{next.title}</span>
            </Link>
          )}
        </div>

        {/* 목록 */}
        <div className="mt-[14px]">
          <Link
            href={BOARD_BASE[boardKey]}
            className="inline-flex h-[30px] w-[63px] items-center justify-center rounded-[2px] bg-[#363636] text-[12px] text-white"
          >
            목록
          </Link>
        </div>
      </div>
    </section>
  );
}