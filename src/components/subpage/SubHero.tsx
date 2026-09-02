import Link from "next/link";
import type { NavChild } from "@/data/site";
import { navItems } from "@/data/site";
import Appear from "@/components/ui/Appear";
import { cn } from "@/lib/cn";

interface SubHeroProps {
  groupLabel: string;
  title: string;
  children?: NavChild[];
  currentHref: string;
}

export default function SubHero({
  groupLabel,
  title,
  children,
  currentHref,
}: SubHeroProps) {
  const items =
    children ?? navItems.find((n) => n.label === groupLabel)?.children ?? [];
  const currentItem = items.find((item) => item.href === currentHref);
  const groupHref = navItems.find((n) => n.label === groupLabel)?.href ?? "/";

  return (
    <section className="border-b border-black/5 bg-white">
      <div className="container-site pt-[50px] pb-[52px] md-header:pt-[85px] md-header:pb-[75px]">
        <Appear animation="fadeIn" duration={2} delay={0.3} disableOnMobile>
          <h1 className="text-[30px] font-bold leading-[1.2] text-ink md-header:text-[48px]">
            {title}
          </h1>
        </Appear>

        <div className="mt-[20px] flex items-start justify-between md-header:mt-[40px]">
          {items.length > 0 && (
            <nav aria-label="하위 메뉴">
              <ul className="flex flex-wrap items-center gap-y-1">
                {items.map((item) => {
                  const active = item.href === currentHref;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "mr-0 flex items-center rounded-full border px-[15px] py-[4px] text-[15px] leading-[24px] transition-colors duration-300 md-header:mr-[5px]",
                          active
                            ? "border-navy-900 bg-navy-900 font-medium text-white"
                            : "border-transparent text-ink/70 hover:text-ink",
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

          <nav aria-label="브레드크럼" className="hidden md-header:block">
            <ol className="flex items-start text-[13px] leading-[21px]">
              <li>
                <Link
                  href={groupHref}
                  className="text-[13px] leading-[21px] text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  {groupLabel}
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
                    href={currentItem.href}
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
