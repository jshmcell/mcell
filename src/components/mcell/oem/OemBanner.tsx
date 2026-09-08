import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { oemBanner as defaultContent } from "@/data/mcell";
import type { ResolvedMcellOem } from "@/lib/mcell-content-resolve";

/**
 * OEM/ODM 배너 — 원본: bg + 흰색 85% 오버레이, 로고 185px + 18px 문구
 */
export default function OemBanner({
  content = defaultContent,
}: {
  content?: ResolvedMcellOem["oemBanner"];
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        role="img"
        aria-label=""
        className="h-[332px] bg-cover bg-center md-header:h-[465px]"
        style={{ backgroundImage: `url(${content.bg})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-white/85" />
      <Appear
        animation="fadeInUp"
        duration={1.2}
        className="container-site absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <SmartImage
          src={content.logo}
          alt="엠셀 OEM/ODM"
          width={185}
          height={69}
          className="h-auto w-[185px]"
          sizes="185px"
        />
        <div className="mt-[10px] text-[15px] leading-[2] text-ink md-header:text-[18px]">
          {content.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Appear>
    </section>
  );
}
