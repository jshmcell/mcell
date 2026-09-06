import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getLocale } from "@/i18n/server";
import { adminDict } from "@/i18n/admin";
import { localizeHref } from "@/i18n/config";
import { getActor } from "@/lib/roles";

export const metadata: Metadata = {
  title: "관리자 대시보드",
  robots: { index: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actor = await getActor();
  const locale = await getLocale();
  const t = adminDict[locale];
  if (!actor) redirect(localizeHref("/login", locale));
  if (!actor.isAdmin) redirect(localizeHref("/account", locale));

  const label = actor.isSuperuser ? t.layout.superLabel : t.layout.adminLabel;

  return (
    <div className="min-h-[calc(100vh-108px)] bg-[#f7f7f7]">
      <div className="px-4 py-6 md-header:px-8 md-header:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-ink">{t.layout.title}</h1>
            <p className="mt-1 text-[13px] text-ink/60">
              {actor.name} ({label}) · {actor.email}
            </p>
          </div>
          <Link
            href={localizeHref("/account", locale)}
            className="text-[13px] text-ink/60 underline-offset-4 hover:underline"
          >
            {t.layout.backToAccount}
          </Link>
        </div>

        <div className="mt-6 hidden md-header:mt-8 md-header:flex md-header:flex-row md-header:items-start md-header:gap-8">
          <AdminSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>

        {/* 관리자는 데스크톱 전용 — 작은 화면에서는 안내만 표시 */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-[6px] border border-black/10 bg-white px-6 py-16 text-center md-header:hidden">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-ink/40"
            aria-hidden
          >
            <rect x="2" y="4" width="20" height="13" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <p className="text-[16px] font-bold text-ink">
            {t.layout.desktopOnly}
          </p>
          <p className="max-w-[320px] text-[13px] leading-6 text-ink/60">
            {t.layout.desktopOnlyHint}
          </p>
        </div>
      </div>
    </div>
  );
}
