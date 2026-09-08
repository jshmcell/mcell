import Link from "next/link";
import type { NavChild } from "@/data/site";
import { localizeHref, localizedNavItems, type Locale } from "@/i18n/config";
import Appear from "@/components/ui/Appear";
import { cn } from "@/lib/cn";

interface SubHeroProps {
  groupLabel: string;
  title: string;
  children?: NavChild[];
  currentHref: string;
  /** 원본 /44처럼 칩 메뉴 없이 브레드크럼만 있는 컴팩트 히어로 (높이 228px) */
  compact?: boolean;
}

export default function SubHero({
  groupLabel,
  title,
  children,
  currentHref,
  compact = false,
  // Default exists for client-component use (admin preview); server callers must pass the real locale.
  locale = "ko",
}: SubHeroProps & { locale?: Locale }) {
  const nav = localizedNavItems[locale];
  // groupLabel은 페이지에서 한국어 라벨로 전달될 수 있으므로, 로케일 nav에서 못 찾으면
  // KO nav로 폴백해 그룹을 찾는다 (칩/브레드크럼은 로케일 라벨로 표시).
  const group =
    nav.find((n) => n.label === groupLabel) ??
    localizedNavItems.ko.find((n) => n.label === groupLabel);
  // KO 라벨로 매칭됐고 locale=en 인 경우 같은 href 의 EN nav 항목 라벨/자식으로 표시.
  const groupEn = group ? nav.find((n) => n.href === group.href) : undefined;
  const groupShown = locale === "en" && groupEn ? groupEn : group;
  const groupLabelShown = groupShown?.label ?? groupLabel;
  const items = children ?? groupShown?.children ?? group?.children ?? [];
  const currentItem = items.find((item) => item.href === currentHref);
  const groupHref = group?.href ?? "/";

  return (
    <section className="border-b border-black/5 bg-white">
      <div
        className={cn(
          "container-site",
          compact
            ? "pt-[30px] pb-[49px] md:pb-[78px] md-header:pt-[60px] md-header:pb-[74px]"
            : "pt-[65px] pb-[40px] md-header:pt-[85px] md-header:pb-[75px]",
        )}
      >
        <Appear animation="fadeIn" duration={2} delay={0.3} disableOnMobile>
          <h1 className="text-[30px] font-bold leading-[1.2] text-ink md-header:text-[48px]">
            {title}
          </h1>
        </Appear>

        <div
          className={cn(
            "flex items-start justify-between",
            compact
              ? "mt-[10px] md-header:mt-[15px]"
              : "mt-[18px] md-header:mt-[40px]",
          )}
        >
          {items.length > 0 && (
            <nav aria-label="하위 메뉴">
              <ul className="flex flex-wrap items-center gap-y-1">
                {items.map((item) => {
                  const active = item.href === currentHref;
                  return (
                    <li key={item.href}>
                      <Link
                        href={localizeHref(item.href, locale)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "mr-0 flex items-center rounded-full px-[16px] py-[4px] text-[13px] leading-[21px] transition-colors duration-300 md-header:mr-[5px] md-header:text-[15px] md-header:leading-[24px]",
                          active
                            ? "border border-navy-900 bg-navy-900 text-white"
                            : "text-ink/70 hover:text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <nav
            aria-label="브레드크럼"
            className={cn(
              "hidden md-header:block",
              items.length === 0 && "ml-auto",
            )}
          >
            <ol className="flex items-start text-[13px] leading-[21px]">
              <li>
                <Link
                  href={localizeHref(groupHref, locale)}
                  className="text-[13px] leading-[21px] text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  {groupLabelShown}
                </Link>
              </li>
              {currentItem && (
                <li className="flex items-center">
                  <svg
                    aria-hidden
                    viewBox="0 0 6 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="ml-[9px] mr-[4px] h-[12px] w-[6px] shrink-0 text-ink/70"
                  >
                    <path d="m1 1 4 5-4 5" />
                  </svg>
                  <Link
                    href={localizeHref(currentItem.href, locale)}
                    aria-current="page"
                    className="pl-[5px] text-[13px] leading-[21px] text-navy-900"
                  >
                    {currentItem.label}
                  </Link>
                </li>
              )}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
