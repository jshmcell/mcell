import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { layerSection as defaultContent } from "@/data/home";
import { localizeHref, type Locale } from "@/i18n/config";
import type { ResolvedHome } from "@/lib/home-content";

export default function LayerCta({
  content = defaultContent,
  // Default exists for client-component use (admin preview); server callers must pass the real locale.
  locale = "ko",
}: {
  content?: ResolvedHome["layer"];
  locale?: Locale;
}) {
  const layerSection = content;
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${layerSection.bg})` }}
      />
      <div className="absolute inset-0 bg-white/75" />
      <div className="container-site relative pb-[52px] pt-[53px] md-header:pb-[125px] md-header:pt-[125px]">
        <Reveal direction="fade" duration={0.7}>
          {/* PC: left-aligned */}
          <div className="hidden pt-[10px] md-header:block">
            <h2 className="text-[30px] font-bold leading-[36px] text-navy-900">
              {layerSection.title}
            </h2>
            <div className="mt-[10px] text-[18px] leading-[30px] text-ink">
              {layerSection.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          {/* mobile: centered, explicit title break, merged paragraph */}
          <div className="pt-[8px] text-center md-header:hidden">
            <h2 className="whitespace-pre-line text-[20px] font-bold leading-[35px] text-navy-900">
              {layerSection.titleMobile}
            </h2>
            <div className="mt-[8px] text-[14px] leading-[28px] text-ink">
              {layerSection.linesMobile.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </Reveal>
        {/* original: button is static on PC, fadeInUp 1.2s/0.3s on mobile */}
        <div className="mt-[30px] hidden md-header:block">
          <ButtonLink
            href={localizeHref(layerSection.cta.href, locale)}
            className="h-[43px] rounded-[4px] px-[30px] py-[10px] text-[15px]"
          >
            {layerSection.cta.label}
          </ButtonLink>
        </div>
        <div className="mt-[15px] text-center md-header:hidden">
            <Reveal direction="up" duration={1.2} delay={0.3}>
              <ButtonLink
                href={localizeHref(layerSection.cta.href, locale)}
              className="h-[38px] rounded-[2px] px-[30px] py-[8px] text-[14px]"
            >
              {layerSection.cta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
