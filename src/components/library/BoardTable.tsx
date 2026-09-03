"use client";

import Link from "next/link";
import { boards, type BoardPost } from "@/data/boards";

/**
 * 게시판 리스트 — 원본 /40·/45·/46 보드 위젯과 동일 (같은 위젯 재사용).
 * PC: 타이틀(15px)+검색(220x34) 행 → 1px #363636 상단 테두리 리스트
 * (No 63 / 제목 700 / 글쓴이 125 / 작성시간 150 / 조회수 125 / 좋아요 88,
 * 헤더 45px·15px, 행 45px, 셀 패딩 10px 7px, 행 구분선 rgba(54,54,54,.15),
 * 제목 14px·본문 메타 12px·60%회색) → 하단 글쓰기(74x30) 우측.
 * 모바일: 타이틀+글쓰기 행 → 전체검색(345x37·16px) → 테두리 없는
 * 타이틀(15px)+메타(12px) 행 → 하단 글쓰기.
 * 섹션 여백: 상 15px / 하 15px (PC), 상 8px / 하 7px (모바일).
 * 제목 클릭 → 게시물 뷰(카달로그만 상세 페이지, 그 외 원본과 같이 상단 진행),
 * 글쓰기 → 로그인.
 */
const COLS = [
  { key: "no", label: "No", width: "w-[63px]", align: "text-center" },
  { key: "title", label: "제목", width: "w-[700px]", align: "text-center" },
  { key: "author", label: "글쓴이", width: "w-[125px]", align: "text-left" },
  { key: "date", label: "작성시간", width: "w-[150px]", align: "text-center" },
  { key: "views", label: "조회수", width: "w-[125px]", align: "text-center" },
  { key: "likes", label: "좋아요", width: "w-[88px]", align: "text-center" },
] as const;

/** 게시판 URL prefix — boardKey → 실제 라우트 (/news/*, /library/*) */
const BOARD_BASE: Record<string, string> = {
  notices: "/news/notices",
  updates: "/news/updates",
  catalog: "/library/catalog",
  portfolio: "/library/portfolio",
};

function postHref(boardKey: keyof typeof boards, post: BoardPost) {
  return `${BOARD_BASE[boardKey]}/${post.id}`;
}

export default function BoardTable({
  boardKey,
}: {
  boardKey: keyof typeof boards;
}) {
  const board = boards[boardKey];

  return (
    <section className="bg-white">
      <div className="container-site pt-[8px] pb-[7px] md-header:pt-[59px] md-header:pb-[15px]">
        {/* 타이틀 행 — 원본: 타이틀 y75, 검색 y75 (같은 행) */}
        <div className="flex h-[30px] items-center justify-between md-header:h-[34px]">
          <p className="text-[15px] leading-[1.5] text-[#363636]">
            {board.label} <span>{board.posts.length}</span>
          </p>
          <Link
            href="/login"
            className="flex h-[30px] w-[74px] items-center justify-center rounded-[2px] bg-[#363636] text-[12px] text-white md-header:hidden"
          >
            글쓰기
          </Link>
          {/* PC 검색 */}
          <div className="hidden items-center md-header:flex">
            <input
              type="search"
              placeholder="Search"
              aria-label="게시물 검색"
              className="h-[34px] w-[220px] border border-black/10 bg-white px-3 text-[14px] text-[#212121] outline-none placeholder:text-ink/40"
            />
            <button
              type="button"
              className="w-[23px] shrink-0 whitespace-nowrap text-[15px] leading-[18px] text-[#212121]"
            >
              검색
            </button>
          </div>
        </div>

        {/* 모바일 검색 */}
        <div className="relative mt-[10px] md-header:hidden">
          <input
            type="search"
            placeholder="Search"
            aria-label="게시물 검색"
            className="h-[37px] w-full border border-black/10 bg-white px-3 pr-[36px] text-[16px] text-[#212121] outline-none placeholder:text-ink/40"
          />
          <button
            type="button"
            className="absolute top-1/2 right-[7px] w-[23px] -translate-y-1/2 whitespace-nowrap text-[15px] leading-[18px] text-[#212121]"
          >
            검색
          </button>
        </div>

        {/* PC 테이블 헤더 + 행 */}
        <div className="mt-[15px] hidden border-t border-[#363636] md-header:block">
          <div className="flex">
            {COLS.map((col) => (
              <div
                key={col.key}
                className={`${col.width} shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-[15px] leading-[24px] text-[#363636] ${col.align}`}
              >
                {col.label}
              </div>
            ))}
          </div>
          {board.posts.map((post, i) => (
            <div key={post.id} className="flex">
              <div className="w-[63px] shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-center text-[15px] leading-[24px] text-[#363636]">
                {board.posts.length - i}
              </div>
              <div className="w-[700px] shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-left text-[14px] leading-[24px]">
                <Link
                  href={postHref(boardKey, post)}
                  className="line-clamp-1 text-[#363636] transition-colors hover:text-navy-900"
                >
                  {post.title}
                </Link>
              </div>
              <div className="w-[125px] shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-left text-[12px] leading-[24px] text-[#363636]/65">
                {post.author}
              </div>
              <div className="w-[150px] shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-center text-[12px] leading-[24px] text-[#363636]/65">
                {post.date}
              </div>
              <div className="w-[125px] shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-center text-[12px] leading-[24px] text-[#363636]/65">
                조회수{post.views ?? 0}
              </div>
              <div className="w-[88px] shrink-0 border-b border-[#363636]/15 px-[7px] py-[10px] text-center text-[12px] leading-[24px] text-[#363636]/65">
                0
              </div>
            </div>
          ))}
        </div>

        {/* 모바일 행 */}
        <div className="mt-[9px] md-header:hidden">
          {board.posts.map((post) => (
            <div key={post.id} className="pt-[11px] pb-[13px]">
              <Link
                href={postHref(boardKey, post)}
                className="line-clamp-2 block text-[15px] leading-[25px] text-[#363636]"
              >
                {post.title}
              </Link>
              <div className="mt-[1px] flex items-center gap-2 text-[12px] leading-[24px] text-[#363636]/65">
                <span>{post.author}</span>
                <span>{post.date}</span>
                <span>조회수{post.views ?? 0}</span>
                <span>0</span>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 글쓰기 */}
        <div className="mt-[13px] flex justify-end md-header:mt-[15px]">
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
