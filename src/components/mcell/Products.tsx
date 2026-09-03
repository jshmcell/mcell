"use client";

import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import { useImageViewer } from "@/components/ui/ImageViewer";
import { products, type Product } from "@/data/mcell";

/**
 * 제품 정보 — 원본: 3열 갤러리(컨테이너 1037), 이미지 324x183 +
 * 텍스트 블록(타이틀 14px #212121, 설명 12px #999),
 * 호버 시 카드 전체가 20px 상승 + 그림자(0.5s), 클릭 시 뷰어(캡션 표시)
 */
export default function Products() {
  const openViewer = useImageViewer();
  const viewerImages = products.map((p: Product) => ({
    src: p.image,
    alt: p.name,
    caption: { title: p.name, description: p.description },
  }));

  return (
    <section className="bg-white">
      <div className="container-site pt-[109px] pb-[105px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">제품 정보</p>
          <h2 className="text-[30px] font-bold text-ink">
            히트플렉스로 완성된 차세대 발열 제품
          </h2>
          <p className="mt-[6px] text-[18px] leading-[2] text-ink">
            에너지 효율과 유연성, 안정성을 모두 갖춘 HEAT-FLEX는 다양한 분야에
            활용되고 있습니다.
          </p>
        </Appear>

        <Appear className="mx-auto mt-[30px] max-w-[1067px]">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {products.map((product, i) => (
              <button
                key={product.name}
                type="button"
                aria-label={`${product.name} 크게 보기`}
                onClick={() => openViewer(viewerImages, i)}
                className="group cursor-pointer p-[15px]"
              >
                <div className="relative bottom-0 transition-all duration-500 group-hover:bottom-[20px] group-hover:shadow-[0_0_20px_#00000026]">
                  <div className="h-[183px] w-full overflow-hidden">
                    <SmartImage
                      src={product.thumb}
                      alt={product.name}
                      width={324}
                      height={183}
                      className="h-[183px] w-full object-cover"
                      sizes="(min-width: 640px) 340px, 100vw"
                    />
                  </div>
                  <div className="w-full p-[20px] text-left">
                    <p className="text-[16px] font-normal leading-[1.6] text-[#212121]">
                      {product.name}
                    </p>
                    <p className="mt-[10px] text-[14px] leading-[1.6] text-[#999999]">
                      {product.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Appear>
      </div>
    </section>
  );
}
