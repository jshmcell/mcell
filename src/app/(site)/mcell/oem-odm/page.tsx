import type { Metadata } from "next";
import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import ViewableImage from "@/components/ui/ViewableImage";
import PartnershipInquiry from "@/components/mcell/PartnershipInquiry";
import { oemBanner, oemBlocks, rnd, oemProof, proof } from "@/data/mcell";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "OEM/ODM | 엠셀",
};

/**
 * OEM/ODM (원본 /32) — 흰 오버레이 배너 → 3개 적용 분야(좌우 교차) →
 * R&D 이미지 → 6열 파트너십 실적 → 문의 폼
 */
export default function OemOdmPage() {
  return (
    <>
      {/* 배너: bg + 흰색 85% 오버레이, 로고 185px + 18px 문구 */}
      <section className="relative overflow-hidden">
        <div
          role="img"
          aria-label=""
          className="h-[332px] bg-cover bg-center md-header:h-[465px]"
          style={{ backgroundImage: `url(${oemBanner.bg})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-white/85" />
        <Appear
          animation="fadeInUp"
          duration={1.2}
          className="container-site absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <SmartImage
            src={oemBanner.logo}
            alt="엠셀 OEM/ODM"
            width={185}
            height={69}
            className="h-auto w-[185px]"
            sizes="185px"
          />
          <div className="mt-[10px] text-[15px] leading-[2] text-ink md-header:text-[18px]">
            {oemBanner.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Appear>
      </section>

      {/* 적용 분야 3블록 — 텍스트/이미지 좌우 교차, 이미지 610x421 fadeInUp 2s */}
      {oemBlocks.map((block) => (
        <section key={block.title} className="bg-white">
          <div className="container-site pt-[93px] pb-[30px]">
            <div className="grid grid-cols-1 items-center gap-y-[30px] md-header:grid-cols-2">
              <div
                className={cn(
                  "text-left md-header:px-[36px]",
                  block.imageSide === "right"
                    ? "md-header:order-1"
                    : "md-header:order-2",
                )}
              >
                <Appear className="md-header:pt-[36px]">
                  <h2 className="text-[24px] font-bold text-black md-header:text-[30px]">
                    {block.title}
                  </h2>
                  <p className="mt-[10px] text-[17px] font-bold text-black md-header:text-[20px]">
                    {block.subtitle}
                  </p>
                  <div className="mt-[16px] text-[15px] leading-[2] text-[#505050] md-header:text-[16px]">
                    {block.lines.map((line) => (
                      <p key={line.slice(0, 24)}>{line}</p>
                    ))}
                  </div>
                </Appear>
              </div>
              <div
                className={cn(
                  block.imageSide === "right"
                    ? "md-header:order-2"
                    : "md-header:order-1",
                )}
              >
                <Appear
                  animation={
                    block.imageSide === "right" ? "fadeInRight" : "fadeInLeft"
                  }
                  duration={2}
                >
                  <SmartImage
                    src={block.image}
                    alt={block.title}
                    width={610}
                    height={421}
                    className="mx-auto h-auto w-full max-w-[610px]"
                    sizes="(min-width: 992px) 610px, 100vw"
                  />
                </Appear>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* R&D & MANUFACTURING */}
      <section className="bg-white">
        <div className="container-site pt-[110px] pb-[50px] text-center">
          <Appear animation="fadeIn" duration={0.7}>
            <p className="text-[20px] font-bold text-navy-900">{rnd.heading}</p>
            <h2 className="text-[30px] font-bold text-ink">{rnd.title}</h2>
          </Appear>
          <Appear className="mt-[30px] block">
            <ViewableImage
              src={rnd.image}
              alt={rnd.title}
              width={1150}
              height={249}
              className="mx-auto h-auto w-full max-w-[1150px]"
              sizes="(min-width: 992px) 1150px, 100vw"
              wrapperClassName="mx-auto"
            />
          </Appear>
        </div>
      </section>

      {/* PARTNERSHIP & PROOF — 3열 x 2행 */}
      <section className="bg-white">
        <div className="container-site pt-[117px] pb-[77px] text-center">
          <Appear animation="fadeIn" duration={0.7}>
            <p className="text-[20px] font-bold text-navy-900">
              {oemProof.heading}
            </p>
            <h2 className="text-[30px] font-bold text-ink">{oemProof.title}</h2>
          </Appear>
          <div className="mx-auto mt-[30px] grid max-w-[1290px] grid-cols-1 gap-y-[50px] text-left sm:grid-cols-3 sm:gap-x-[10px] md-header:max-w-none">
            {proof.map((item) => (
              <div key={item.title} className="px-[20px]">
                <SmartImage
                  src={item.icon}
                  alt=""
                  width={79}
                  height={79}
                  className="h-auto w-[79px]"
                  sizes="79px"
                />
                <h3 className="mt-[8px] text-[19px] font-bold leading-[2] text-[#294e77] md-header:text-[22px]">
                  {item.title}
                </h3>
                <div className="text-[15px] leading-[1.8] text-ink md-header:text-[16px]">
                  {item.lines.map((line) => (
                    <p key={line.slice(0, 24)}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP INQUIRY (+ 하단 무한 슬라이드) */}
      <PartnershipInquiry />
    </>
  );
}
