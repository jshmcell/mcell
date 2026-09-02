import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { products } from "@/data/mcell";

export default function Products() {
  return (
    <section className="bg-white">
      <div className="container-site py-20">
        <Reveal>
          <p className="text-[18px] font-bold text-navy-900">제품 정보</p>
          <h2 className="mt-2 text-[30px] font-bold text-navy-900">
            히트플렉스로 완성된 차세대 발열 제품
          </h2>
          <p className="mt-3 text-[16px] leading-8">
            HEAT-FLEX의 핵심 기술이 적용된 제품 라인업을 소개합니다. 다양한 산업군에 맞춘 솔루션으로
            더 나은 일상을 제공합니다.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={(i % 3) * 0.08}>
              <div className="group overflow-hidden border border-black/10">
                <SmartImage
                  src={product.thumb}
                  alt={product.name}
                  width={420}
                  height={420}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="p-6">
                  <h3 className="text-[20px] font-bold text-ink">{product.name}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-ink/80">{product.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}