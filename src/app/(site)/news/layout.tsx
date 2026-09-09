import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getLocale } from "@/i18n/server";
import { localizeHref } from "@/i18n/config";
import { getActor } from "@/lib/roles";

export const metadata: Metadata = {
  robots: { index: false },
};

/** /news 섹션 (공지사항 + 소식) — 관리자 전용. */
export default async function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actor = await getActor();
  const locale = await getLocale();
  if (!actor) redirect(localizeHref("/login", locale));
  if (!actor.isAdmin) redirect(localizeHref("/account", locale));
  return <>{children}</>;
}
