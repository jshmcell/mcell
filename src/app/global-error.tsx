"use client";

/**
 * 루트 세그먼트 에러 바운더리 — html/body 자체가 실패할 때.
 * (크롬 없이 렌더: 루트 레이아웃이 실패한 상황이므로 최소 마크업만)
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen items-center justify-center bg-white">
        <div className="px-6 text-center">
          <p className="text-[20px] font-bold text-[#17375e]">
            오류가 발생했습니다
          </p>
          <p className="mt-[10px] text-[15px] leading-[2] text-[#363636]/70">
            페이지를 표시하는 중 문제가 발생했습니다.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-[24px] h-[42px] w-[130px] rounded-[2px] bg-[#363636] text-[13px] text-white"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
