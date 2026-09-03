"use client";

import Link from "next/link";

/**
 * 404 콘텐츠 — not-found.tsx는 서버 컴포넌트이므로 뒤로가기 버튼만 클라이언트 분리.
 */
export default function NotFoundActions() {
  return (
    <div className="mt-[30px] flex items-center gap-[10px]">
      <Link
        href="/"
        className="flex h-[42px] w-[130px] items-center justify-center rounded-[2px] bg-[#363636] text-[13px] text-white transition-colors hover:bg-navy-900"
      >
        홈으로 가기
      </Link>
      <button
        type="button"
        onClick={() => window.history.back()}
        className="h-[42px] w-[130px] rounded-[2px] border border-black/20 bg-white text-[13px] text-ink transition-colors hover:border-navy-900 hover:text-navy-900"
      >
        이전 페이지
      </button>
    </div>
  );
}
