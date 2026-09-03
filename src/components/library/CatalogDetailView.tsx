"use client";

import Link from "next/link";
import type { PublicPost } from "@/lib/boards";

/**
 * 카달로그 게시물 뷰 — 원본 /40 뷰 페이지와 동일.
 * 제목(20px) → 프로필(40x40)+작성자(14px)+카테고리·날짜·조회수(13px, 카테고리 #757575 /
 * 나머지 70%회색) 행 → 본문(15px) → 첨부 박스(#f7f7f7, 파일명 15px + 크기 12px·회색,
 * 우측 다운로드 아이콘 zmdi 24px·#999) → 좋아요/댓글(17px 숫자, 하트 18x16·말풍선 17x17,
 * 46px 높이 행) + 우측 공유·인쇄 버튼(41x46/29x46, 아이콘 17x17) →
 * 로그인 안내 댓글 박스(1px 테두리, 우하단 작성 버튼 63x30) →
 * 목록/글쓰기 버튼 행(63x30 / 74x30, #363636, 12px).
 * 섹션 여백: 상 15px / 하 15px. 데이터: DB.
 * 목록 → /library/catalog, 글쓰기 → /login, 첨부 → PDF 다운로드.
 * 공유: navigator.share (미지원 브라우저는 클립보드 복사), 인쇄: window.print().
 */
export default function CatalogDetailView({ post }: { post: PublicPost }) {
  const onShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        /* 사용자가 취소함 */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* 클립보드 권한 없음 */
      }
    }
  };

  const onPrint = () => window.print();

  return (
    <section className="bg-white">
      <div className="container-site pt-[15px] pb-[15px]">
        {/* 제목 */}
        <h1 className="text-[20px] leading-[32px] text-[#363636]">
          {post.title}
        </h1>

        {/* 작성자 행 */}
        <div className="flex items-center py-[14px] md-header:py-[19px]">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f1f1f1] text-[16px] text-[#999]">
            ●
          </div>
          <div className="ml-[16px]">
            <p className="text-[14px] leading-[21px] text-[#363636]">
              {post.author}
            </p>
            <p className="flex items-center gap-[10px] text-[13px] leading-[16px]">
              <span className="text-[#757575]">{post.category}</span>
              <span className="text-[#363636]/70">{post.date}</span>
              <span className="text-[#363636]/70">조회수 {post.views}</span>
            </p>
          </div>
        </div>

        {/* 본문 */}
        <div className="pt-[17px] pb-[10px] text-[15px] leading-[24px] text-[#363636]">
          {post.body}
        </div>

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

        {/* 좋아요/댓글 카운트 + 공유/인쇄 (원본: counts 행 y296 h46, 40px 간격 후 댓글 폼) */}
        <div className="mt-[14px] flex h-[46px] items-center justify-between text-[17px] text-[#363636]">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="좋아요"
              className="flex h-[46px] w-[35px] items-center gap-[5px]"
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 20s-7-4.35-9.33-8.11C.9 9.02 2.24 5.5 5.5 5.5c2 0 3.4 1.1 4.13 2.24L12 10l2.37-2.26C15.1 6.6 16.5 5.5 18.5 5.5c3.26 0 4.6 3.52 2.83 6.39C19 15.65 12 20 12 20Z" />
              </svg>
              0
            </button>
            <span className="flex h-[46px] items-center gap-[5px] pl-[17px]">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
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
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="18" cy="5" r="2.6" />
                <circle cx="6" cy="12" r="2.6" />
                <circle cx="18" cy="19" r="2.6" />
                <path d="m8.3 10.7 7.4-4.3m0 11.2-7.4-4.3" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="인쇄"
              onClick={onPrint}
              className="hidden h-[46px] w-[29px] items-center justify-center text-[#363636] transition-colors hover:text-navy-900 md-header:flex"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M6 9V3h12v6" />
                <rect x="3" y="9" width="18" height="8" rx="1.5" />
                <path d="M6 14h12v7H6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 댓글 박스 (로그인 안내) — 원본: textarea 62px·15px + 우하단 작성 버튼, 1px 테두리 20%회색 */}
        <div className="mt-[40px] border border-black/20 px-[15px] py-[15px]">
          <textarea
            rows={2}
            placeholder="로그인이 필요합니다."
            aria-label="댓글 입력"
            className="mb-[10px] block w-full resize-none text-[15px] leading-[24px] text-[#363636] outline-none placeholder:text-[#363636]/70"
          />
          <div className="flex justify-end">
            <Link
              href="/login"
              className="flex h-[30px] w-[63px] items-center justify-center rounded-[2px] bg-[#363636] text-[12px] text-white"
            >
              작성
            </Link>
          </div>
        </div>

        {/* 목록/글쓰기 */}
        <div className="mt-[20px] flex items-center justify-between">
          <Link
            href="/library/catalog"
            className="flex h-[30px] w-[63px] items-center justify-center rounded-[2px] bg-[#363636] text-[12px] text-white"
          >
            목록
          </Link>
          <Link
            href="/login"
            className="flex h-[30px] w-[74px] items-center justify-center rounded-[2px] bg-[#363636] text-[12px] text-white"
          >
            글쓰기
          </Link>
        </div>
      </div>
    </section>
  );
}
