"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useLocale } from "@/i18n/client";
import { adminDict, type AdminDict } from "@/i18n/admin";
import { localizeHref } from "@/i18n/config";
import { cn } from "@/lib/cn";

interface SidebarEntry {
  href: string;
  label: string;
  /** exact pathname match (ignore query) */
  exact?: boolean;
  /** also require these query params to match */
  query?: Record<string, string>;
}

interface SidebarGroup {
  key: string;
  label: string;
  entries: SidebarEntry[];
}

function buildGroups(t: AdminDict, locale: string): SidebarGroup[] {
  return [
    {
      key: "main",
      label: "",
      entries: [{ href: "/admin", label: t.layout.tabs[0].label, exact: true }],
    },
    {
      key: "content",
      label: locale === "ko" ? "콘텐츠" : "Content",
      entries: [
        {
          href: "/admin/pages",
          query: { group: "home" },
          label: locale === "ko" ? "홈" : "Home",
        },
        { href: "/admin/pages", query: { group: "shop" }, label: "SHOP" },
        {
          href: "/admin/pages",
          query: { group: "partnership" },
          label: locale === "ko" ? "제휴 및 문의" : "Partnership",
        },
        {
          href: "/admin/pages",
          query: { group: "mcell" },
          label: locale === "ko" ? "기술력 소개" : "Technology",
        },
        {
          href: "/admin/pages",
          query: { group: "about" },
          label: locale === "ko" ? "회사 소개" : "About",
        },
      ],
    },
    {
      key: "boards",
      label: locale === "ko" ? "게시판" : "Boards",
      entries: adminDict[locale === "en" ? "en" : "ko"].boards.meta.map((b) => ({
        href: "/admin/boards",
        query: { board: b.key },
        label: b.label,
      })),
    },
    {
      key: "manage",
      label: locale === "ko" ? "관리" : "Management",
      entries: [
        { href: "/admin/users", label: t.layout.tabs[1].label },
        { href: "/admin/inquiries", label: t.layout.tabs[2].label },
        { href: "/admin/settings", label: t.layout.tabs[5].label },
      ],
    },
  ];
}

export default function AdminSidebar() {
  const pathname = usePathname() ?? "/admin";
  const params = useSearchParams();
  const locale = useLocale();
  const t = adminDict[locale];
  const groups = buildGroups(t, locale);
  const barePath = localizeHref("/admin", locale).replace(/\/$/, "");

  const isActive = (entry: SidebarEntry) => {
    if (!pathname.startsWith(barePath)) return false;
    const sub = pathname.slice(barePath.length) || "/";
    if (entry.exact) return sub === "/";
    const base = entry.href.slice("/admin".length) || "/";
    if (sub !== base) return false;
    if (!entry.query) return true;
    return Object.entries(entry.query).every(
      ([k, v]) => params.get(k) === v,
    );
  };

  return (
    <nav
      aria-label={t.layout.title}
      className="flex shrink-0 gap-2 overflow-x-auto md-header:sticky md-header:top-[108px] md-header:max-h-[calc(100vh-108px)] md-header:w-[190px] md-header:flex-col md-header:self-start md-header:overflow-y-auto"
    >
      {groups.map((group) => (
        <div key={group.key} className="md-header:mb-1">
          {group.label && (
            <p className="mt-2 hidden px-3 pb-1 text-[11px] font-medium tracking-wide text-ink/40 uppercase md-header:block">
              {group.label}
            </p>
          )}
          <ul className="flex gap-2 md-header:flex-col md-header:gap-0.5">
            {group.entries.map((entry) => {
              const active = isActive(entry);
              return (
                <li key={entry.href + JSON.stringify(entry.query ?? {})}>
                  <Link
                    href={localizeHref(entry.href, locale) + (entry.query ? `?${new URLSearchParams(entry.query)}` : "")}
                    className={cn(
                      "flex items-center rounded-[3px] border px-3 py-2 text-[13px] whitespace-nowrap transition-colors",
                      active
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-transparent bg-white text-ink hover:border-black/15 hover:text-navy-900 md-header:border-transparent md-header:bg-transparent",
                    )}
                  >
                    {entry.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
