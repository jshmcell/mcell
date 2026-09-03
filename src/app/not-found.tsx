import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotFoundActions from "@/app/not-found-actions";

/**
 * 전역 404 — 존재하지 않는 URL·잘못된 게시물 id.
 * 사이트 크롬(헤더/푸터) + 서브페이지 타이포 그래피 토큰으로 구성.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-black/5 bg-white">
          <div className="container-site pt-[65px] pb-[40px] md-header:pt-[85px] md-header:pb-[75px]">
            <h1 className="text-[30px] leading-[1.2] text-ink md-header:text-[48px]">
              404
            </h1>
          </div>
        </section>
        <section className="bg-white">
          <div className="container-site flex flex-col items-center pt-[80px] pb-[160px] text-center md-header:pt-[120px] md-header:pb-[220px]">
            <p className="text-[20px] font-bold text-navy-900">
              페이지를 찾을 수 없습니다
            </p>
            <p className="mt-[10px] text-[15px] leading-[2] text-ink/70">
              요청하신 페이지가 삭제되었거나 주소가 잘못 입력되었습니다.
              <br />
              입력하신 주소를 다시 확인해 주세요.
            </p>
            <NotFoundActions />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}