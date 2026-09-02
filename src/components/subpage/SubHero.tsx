import Link from "next/link";
import { navItems, type NavItem } from "@/data/site";
import { cn } from "@/lib/cn";

interface SubHeroProps {
  groupLabel: string;
  title: string;
  children?: NavChild[];
  currentHref: string;
  parent?: { label: string; href: string };
}

type NavChild = NonNullable<NavItem["children"]>[number];

export default function SubHero({ groupLabel, title, children, currentHref }: SubHeroProps) {
  const items = children ?? [];

  return (
    <section className="border-b border-black/5 bg-white">
      <div className="container-site pb-10 pt-[140px]">
        <h1 className="text-[42px] font-extrabold leading-[1.2] text-ink">{title}</h1>

        <div className="mt-9 flex items-end justify-between">
          <nav aria-label="하위 메뉴">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-[15px] py-1 text-[15px] transition-colors",
                      item.href === currentHref
                        ? "bg-navy-900 font-medium text-white"
                        : "text-ink/70 hover:text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="브레드크럼" className="hidden text-[14px] lg:block">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="text-ink/60 hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-ink/40">
                &gt;
              </li>
              <li className="text-ink/80">{groupLabel}</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}