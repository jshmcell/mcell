import Appear from "@/components/ui/Appear";
import { ceo as defaultContent } from "@/data/about";
import type { ResolvedAbout } from "@/lib/about-content-resolve";

/** About — CEO 인사말 (원본 /42: 배너 타이틀 + 인용구 + 문단 + 서명) */
export default function CeoIntro({
  content = defaultContent,
}: {
  content?: ResolvedAbout["ceo"];
}) {
  const ceo = content;
  return (
    <section className="bg-white">
      <div className="container-site pt-[60px] pb-[60px] text-center md-header:pb-[162px]">
        <h2 className="text-[24px] font-bold leading-[1.35] text-ink md-header:text-[36px] md-header:leading-[1.42]">
          {ceo.banner.title}
        </h2>
        <Appear duration={1.2} className="mt-[30px]">
          <p className="text-[16px] font-bold leading-[1.35] text-ink md-header:text-[24px]">
            {ceo.banner.quote}
          </p>
          <div className="mt-[9px] text-[15px] leading-[24px] text-ink md-header:mt-0 md-header:text-[18px] md-header:leading-[30px]">
            {ceo.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph || "\u00A0"}</p>
            ))}
          </div>
        </Appear>
        <Appear duration={1.2}>
          <p className="mt-[30px] text-[15px] font-bold leading-[26px] text-ink md-header:text-[20px]">
            {ceo.signature}
          </p>
        </Appear>
      </div>
    </section>
  );
}
