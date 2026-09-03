"use client";

import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import { cn } from "@/lib/cn";
import { comparisons } from "@/data/mcell";

function StatCard({
  title,
  logo,
  lines,
  bg,
}: {
  title: string;
  logo: string;
  lines: string[];
  bg: string;
}) {
  return (
    <div
      className="flex h-full flex-col items-center bg-[#e6e6e6] px-[15px] py-[30px] text-center"
      style={{ backgroundColor: bg }}
    >
      <h3 className="text-[16px] font-bold text-ink">{title}</h3>
      <SmartImage
        src={logo}
        alt={title}
        width={250}
        height={188}
        className="mt-[16px] h-auto w-full max-w-[250px]"
        sizes="250px"
      />
      <div className="mt-[16px] text-[14px] leading-[2] tracking-[-0.3px] text-ink">
        {lines.map((line) => (
          <p key={line.slice(0, 26)}>{line}</p>
        ))}
      </div>
    </div>
  );
}

/**
 * 기술 성능 비교 — 원본: 열화상 이미지 좌측(509x548, fadeIn 1.2s/0.3s) +
 * 우측 카드 2장(타사 #e6e6e6 / 히트플렉스 #c3cbd4).
 * 첫 번째 섹션: pad 103/31 + 타이틀 블록 / 두 번째: pad 0/97, 타이틀 없음.
 */
export default function Comparisons() {
  return (
    <>
      {comparisons.map((cmp, idx) => (
        <section
          key={idx}
          className={cn(
            "bg-[#f7f7f7]",
            idx === 0 ? "pt-[103px] pb-[97px]" : "pt-0 pb-[127px]",
          )}
        >
          <div className="container-site">
            {cmp.heading && (
              <Appear animation="fadeIn" duration={0.7} className="text-center">
                <p className="text-[20px] font-bold text-navy-900">
                  {cmp.heading}
                </p>
                <h2 className="text-[30px] font-bold text-ink">
                  {cmp.subheading}
                </h2>
                <p className="mt-[6px] text-[18px] leading-[2] text-ink">
                  {cmp.description}
                </p>
              </Appear>
            )}

            <div
              className={cn(
                "grid grid-cols-1 gap-[30px] md-header:grid-cols-2",
                idx === 0 ? "mt-[31px]" : "",
              )}
            >
              <Appear animation="fadeIn" duration={1.2} delay={0.3}>
                <SmartImage
                  src={cmp.image}
                  alt="열화상 비교"
                  width={509}
                  height={548}
                  className="mx-auto h-auto max-h-[548px] w-auto max-w-full"
                  sizes="(min-width: 992px) 50vw, 100vw"
                />
              </Appear>

              <div className="grid grid-cols-1 gap-[15px] sm:grid-cols-2 md-header:pl-[30px]">
                <Appear delay={0.2} className="h-full">
                  <StatCard
                    title={cmp.competitorTitle}
                    logo={cmp.competitorLogo}
                    lines={cmp.competitorLines}
                    bg="#e6e6e6"
                  />
                </Appear>
                <Appear delay={0.3} className="h-full">
                  <StatCard
                    title={cmp.oursTitle}
                    logo={cmp.oursLogo}
                    lines={cmp.oursLines}
                    bg="#c3cbd4"
                  />
                </Appear>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
