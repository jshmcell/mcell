/**
 * SHOP 배너 — 원본 /37과 동일: 배경 이미지 + 검정 60% 오버레이,
 * 좌측 정렬 타이틀(SHOP 28px/48px 흰색) + 설명(15px/18px 흰색).
 * 높이 200px (모바일) / 347px (PC).
 * 횡방향: 중앙 1250px 컨테이너 (15px 패딩) — 1280 초과 뷰포트에서도 원본과 동일.
 * 종방향: 타이틀 상단 71px (모바일) / 127px (PC), 설명 간격 15px.
 * (원본 텍스트는 등장 애니메이션 후 정착 위치 기준 계측)
 */
export default function ShopHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        role="img"
        aria-label="SHOP"
        className="h-[200px] bg-cover bg-center md-header:h-[347px]"
        style={{ backgroundImage: "url(/assets/img/c2151c9116511.jpg)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="absolute inset-0">
        <div className="container-site pt-[68px] md-header:pt-[127px]">
          <h1 className="text-[28px] leading-[33.6px] text-white md-header:text-[48px] md-header:leading-[57.6px]">
            SHOP
          </h1>
          <p className="mt-[15px] text-[15px] leading-[18px] text-white md-header:text-[18px] md-header:leading-[21.6px]">
            엠셀의 기술력으로 완성된 다양한 제품을 만나보세요.
          </p>
        </div>
      </div>
    </section>
  );
}
