"use client";

import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import { useImageViewer } from "@/components/ui/ImageViewer";
import { products, type Product } from "@/data/mcell";

/**
 * 제품 정보 — 원본: 3열 이미지 갤러리(캡션은 라이트박스에 표시),
 * 컨테이너 1037px, 이미지 326x373
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
      <div className="container-site pt-[109px] pb-[132px] text-center">
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

        <Appear className="mx-auto mt-[30px] max-w-[1068px]">
          <div className="grid grid-cols-1 gap-y-[15px] sm:grid-cols-3 sm:gap-[10px]">
            {products.map((product, i) => (
              <button
                key={product.name}
                type="button"
                aria-label={`${product.name} 크게 보기`}
                onClick={() => openViewer(viewerImages, i)}
                className="cursor-pointer p-[15px]"
              >
                <SmartImage
                  src={product.thumb}
                  alt={product.name}
                  width={326}
                  height={361}
                  className="h-[263px] w-full object-cover md-header:h-[361px]"
                  sizes="(min-width: 992px) 340px, 100vw"
                />
              </button>
            ))}
          </div>
        </Appear>
      </div>
    </section>
  );
}
