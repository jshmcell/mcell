import type { NavItem } from "@/data/site";

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

/** Persisted locale cookie (1yr) — URL prefix stays the source of truth. */
export const LOCALE_COOKIE = "locale";
/** Internal header set by proxy.ts so server components know the locale. */
export const LOCALE_HEADER = "x-mcell-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}

/** "/about" → "/en/about" when locale is en. External URLs untouched. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "ko") return href;
  if (!href.startsWith("/")) return href;
  if (href === "/en" || href.startsWith("/en/")) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

/** "/en/about" → "/about" (also "/en" → "/"). */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function getPathLocale(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";
}

/** Keep the current page, just flip the locale prefix. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizeHref(stripLocalePrefix(pathname), locale);
}

/** Localized copy of the static nav skeleton (hrefs stay canonical KO paths). */
export const localizedNavItems: Record<Locale, NavItem[]> = {
  ko: [
    {
      label: "About",
      href: "/about",
      children: [
        { label: "About Us", href: "/about" },
        { label: "연혁", href: "/about/history" },
        { label: "인증서", href: "/about/certifications" },
        { label: "Contact Us", href: "/about/contact" },
      ],
    },
    {
      label: "Mcell",
      href: "/mcell",
      children: [
        { label: "기술력 소개", href: "/mcell" },
        { label: "OEM/ODM", href: "/mcell/oem-odm" },
      ],
    },
    { label: "SHOP", href: "/shop" },
    {
      label: "자료실",
      href: "/library/portfolio",
      children: [
        { label: "포트폴리오", href: "/library/portfolio" },
        { label: "카달로그", href: "/library/catalog" },
      ],
    },
    {
      label: "뉴스",
      href: "/news/notices",
      children: [
        { label: "공지사항", href: "/news/notices" },
        { label: "소식", href: "/news/updates" },
      ],
    },
    { label: "제휴 및 문의", href: "/partnership" },
  ],
  en: [
    {
      label: "About",
      href: "/about",
      children: [
        { label: "About Us", href: "/about" },
        { label: "History", href: "/about/history" },
        { label: "Certifications", href: "/about/certifications" },
        { label: "Contact Us", href: "/about/contact" },
      ],
    },
    {
      label: "Mcell",
      href: "/mcell",
      children: [
        { label: "Technology", href: "/mcell" },
        { label: "OEM/ODM", href: "/mcell/oem-odm" },
      ],
    },
    { label: "SHOP", href: "/shop" },
    {
      label: "Library",
      href: "/library/portfolio",
      children: [
        { label: "Portfolio", href: "/library/portfolio" },
        { label: "Catalog", href: "/library/catalog" },
      ],
    },
    {
      label: "News",
      href: "/news/notices",
      children: [
        { label: "Notices", href: "/news/notices" },
        { label: "Updates", href: "/news/updates" },
      ],
    },
    { label: "Partnership", href: "/partnership" },
  ],
};
