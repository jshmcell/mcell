import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import Appear from "@/components/ui/Appear";
import { ButtonLink } from "@/components/ui/Button";
import { ceo } from "@/data/about";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      <SubHero groupLabel="About" title="About Us" currentHref="/about" />
      <SubPageBanner image={ceo.banner.bg} />
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
      <section className="relative">
        <div
          role="img"
          aria-label=""
          className="h-[241px] bg-cover bg-center bg-no-repeat md:h-[256px] md-header:h-[284px] md-header:bg-fixed"
          style={{ backgroundImage: `url(${contact.banner.bg})` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/70" />
        <div className="absolute inset-0">
          <div className="container-site flex h-full flex-col items-center justify-center gap-[28px] py-[50px] md-header:flex-row md-header:justify-between md-header:gap-0 md-header:py-[95px]">
            <div className="text-center md-header:text-left">
              {contact.banner.lines.map((line) => (
                <p
                  key={line}
                  className="text-[22px] font-bold leading-[31px] text-white md-header:text-[36px] md-header:leading-[47px]"
                >
                  {line}
                </p>
              ))}
            </div>
            <Appear duration={2} className="md-header:self-center">
              <ButtonLink
                href="/partnership"
                variant="outline"
                className="shrink-0 rounded-full border-white px-[50px] py-[12px] text-[17px] hover:bg-white/10"
              >
                문의하기 바로가기 →
              </ButtonLink>
            </Appear>
          </div>
        </div>
      </section>
    </>
  );
}
