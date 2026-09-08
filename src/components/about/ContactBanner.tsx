import Appear from "@/components/ui/Appear";
import { ButtonLink } from "@/components/ui/Button";
import { contact as defaultContent } from "@/data/contact";
import { localizeHref, type Locale } from "@/i18n/config";
import type { ResolvedAboutContact } from "@/lib/about-content-resolve";

/** About — 하단 문의 배너 (원본 /about 인라인 섹션): 배경 + 문구 + 파트너십 링크 버튼 */
export default function ContactBanner({
  content = defaultContent,
  // Default exists for client-component use (admin preview); server callers must pass the real locale.
  locale = "ko",
}: {
  content?: ResolvedAboutContact["contact"];
  locale?: Locale;
}) {
  const contact = content;
  return (
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
              href={localizeHref("/partnership", locale)}
              variant="outline"
              className="shrink-0 rounded-full border-white px-[50px] py-[12px] text-[17px] hover:bg-white/10"
            >
              문의하기 바로가기 →
            </ButtonLink>
          </Appear>
        </div>
      </div>
    </section>
  );
}
