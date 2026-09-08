import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { oemProof as defaultContent, proof as defaultProof } from "@/data/mcell";
import type { ResolvedMcellOem } from "@/lib/mcell-content-resolve";

/**
 * PARTNERSHIP & PROOF — 원본: 헤딩 + 타이틀 + 3열 x 2행 실적 카드
 */
export default function OemProof({
  content = defaultContent,
  proof = defaultProof,
}: {
  content?: ResolvedMcellOem["oemProof"];
  proof?: ResolvedMcellOem["proof"];
}) {
  return (
    <section className="bg-white">
      <div className="container-site pt-[117px] pb-[77px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">
            {content.heading}
          </p>
          <h2 className="text-[30px] font-bold text-ink">{content.title}</h2>
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
  );
}
