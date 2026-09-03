"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * 라우트 세그먼트 에러 바운더리 — 렌더 중 예외 시 사이트 크롬과 함께 표시.
 * (error 객체는 로깅 시 사용; 현재는 화면에 표시하지 않음)
 */
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-black/5 bg-white">
          <div className="container-site pt-[65px] pb-[40px] md-header:pt-[85px] md-header:pb-[75px]">
            <h1 className="text-[30px] leading-[1.2] text-ink md-header:text-[48px]">
              오류
            </h1>
          </div>
        </section>
        <section className="bg-white">
          <div className="container-site flex flex-col items-center pt-[80px] pb-[160px] text-center md-header:pt-[120px] md-header:pb-[220px]">
            <p className="text-[20px] font-bold text-navy-900">
              오류가 발생했습니다
            </p>
            <p className="mt-[10px] text-[15px] leading-[2] text-ink/70">
              페이지를 표시하는 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
            <div className="mt-[30px] flex items-center gap-[10px]">
              <button
                type="button"
                onClick={reset}
                className="flex h-[42px] w-[130px] items-center justify-center rounded-[2px] bg-[#363636] text-[13px] text-white transition-colors hover:bg-navy-900"
              >
                다시 시도
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="h-[42px] w-[130px] rounded-[2px] border border-black/20 bg-white text-[13px] text-ink transition-colors hover:border-navy-900 hover:text-navy-900"
              >
                이전 페이지
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
