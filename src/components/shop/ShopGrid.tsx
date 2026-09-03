import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { shopProducts } from "@/data/shop";

/**
 * SHOP 상품 그리드 — 원본 /37 goods 위젯과 동일:
 * 카드 링크 410x349 (PC) / 170x169 (모바일), 이미지 410x307 / 170x127 +
 * 중앙 14px 타이틀 (상단 10px), 2열(모바일) / 3열(PC), 셀 패딩 5px.
 * 섹션 여백: 상 46px / 하 63px (모바일), 상 91px / 하 125px (PC).
 * 카드는 네이버 스마트스토어 외부 링크 (새 탭). 더보기 버튼은 원본에서 숨김.
 * 원본 그리드: 1260px 행中央 / 3열 (PC), 350px 행中央 / 2열 (모바일),
 * 셀 패딩 5px (PC) / 2.5px (모바일).
 */
export default function ShopGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[350px] px-0 pt-[46px] pb-[63px] md-header:max-w-[1260px] md-header:pt-[91px] md-header:pb-[125px]">
        <div className="grid grid-cols-2 md-header:grid-cols-3">
          {shopProducts.map((product, i) => (
            <div key={product.name} className="p-[2.5px] md-header:p-[5px]">
              <Appear
                animation="fadeIn"
                duration={0.7}
                delay={i * 0.1}
                className="h-full"
              >
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${product.name} 구매하기 (네이버 스마트스토어)`}
                  className="block"
                >
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    width={410}
                    height={307}
                    className="block h-[127px] w-full object-cover md-header:h-[307px]"
                    sizes="(min-width: 992px) 410px, 50vw"
                  />
                  <div className="pt-[10px] pb-[10px] text-center">
                    <p className="text-[14px] leading-[22px] text-[#212121]">
                      {product.name}
                    </p>
                  </div>
                </a>
              </Appear>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
