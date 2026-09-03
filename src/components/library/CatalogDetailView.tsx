import Link from "next/link";
import { boards } from "@/data/boards";

/**
 * 카달로그 게시물 뷰 — 원본 /40 뷰 페이지와 동일.
 * 제목(20px) → 프로필(40x40)+작성자(14px)+카테고리·날짜·조회수(13px·70%회색) 행 →
 * 본문(15px) → 첨부 박스(#f7f7f7, 파일명 15px + 크기 12px·회색, 우측 다운로드 아이콘) →
 * 좋아요/댓글 카운트 행 → 로그인 안내 댓글 박스(1px 테두리, 우하단 작성 버튼 63x30) →
 * 목록/글쓰기 버튼 행(63x30 / 74x30, #363636, 12px).
 * 섹션 여백: 상 15px / 하 15px.
 * 목록 → /library/catalog, 글쓰기 → /login, 첨부 → PDF 다운로드.
 */
export default function CatalogDetailView() {
  const board = boards.catalog;
  const post = board.posts[0];

  if (!post) return null;

  return (
    <section className="bg-white">
      <div className="container-site pt-[15px] pb-[15px]">
        {/* 제목 */}
        <h1 className="text-[20px] leading-[32px] text-[#363636]">
          {post.title}
        </h1>

        {/* 작성자 행 */}
        <div className="flex items-center py-[14px]">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f1f1f1] text-[16px] text-[#999]">
            ●
          </div>
          <div className="ml-[16px]">
            <p className="text-[14px] leading-[21px] text-[#363636]">
              {post.author}
            </p>
            <p className="flex items-center gap-[10px] text-[13px] leading-[16px] text-[#363636]/70">
              <span>{post.category}</span>
              <span>{post.date}</span>
              <span>조회수 237</span>
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
              className="text-[#363636]/70 transition-colors hover:text-[#363636]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
            </a>
          </div>
        )}

        {/* 좋아요/댓글 카운트 */}
        <div className="flex items-center gap-[18px] py-[22px] text-[15px] text-[#363636]">
          <span className="flex items-center gap-[6px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 20s-7-4.35-9.33-8.11C.9 9.02 2.24 5.5 5.5 5.5c2 0 3.4 1.1 4.13 2.24L12 10l2.37-2.26C15.1 6.6 16.5 5.5 18.5 5.5c3.26 0 4.6 3.52 2.83 6.39C19 15.65 12 20 12 20Z" />
            </svg>
            0
          </span>
          <span className="flex items-center gap-[6px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5c-1.53 0-2.98-.36-4.25-1L3 20l1.33-4.09A8.5 8.5 0 1 1 21 11.5Z" />
            </svg>
            0
          </span>
        </div>

        {/* 댓글 박스 (로그인 안내) */}
        <div className="border border-black/10 px-[20px] py-[16px]">
          <p className="pb-[40px] text-[13px] text-[#363636]/70">
            로그인이 필요합니다.
          </p>
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