import "server-only";

import { getContentRows } from "@/lib/content";
import {
  resolveAboutFromRows,
  resolveAboutHistoryFromRows,
  resolveAboutCertificationsFromRows,
  resolveAboutContactFromRows,
  type ResolvedAbout,
  type ResolvedAboutHistory,
  type ResolvedAboutCertifications,
  type ResolvedAboutContact,
} from "@/lib/about-content-resolve";
import { ABOUT_CONTENT_KEYS } from "@/lib/content-registry";
import type { Locale } from "@/i18n/config";

export type {
  ResolvedAbout,
  ResolvedAboutHistory,
  ResolvedAboutCertifications,
  ResolvedAboutContact,
};

/** DB 오버라이드가 적용된 about 데이터 — data/about.ts 와 동일한 shape. */
export async function getAboutContent(locale: Locale): Promise<ResolvedAbout> {
  const rows = await getContentRows(ABOUT_CONTENT_KEYS);
  return resolveAboutFromRows(rows, locale);
}

/** DB 오버라이드가 적용된 연혁 데이터 — data/about.ts 와 동일한 shape. */
export async function getAboutHistoryContent(
  locale: Locale,
): Promise<ResolvedAboutHistory> {
  const rows = await getContentRows(ABOUT_CONTENT_KEYS);
  return resolveAboutHistoryFromRows(rows, locale);
}

/** DB 오버라이드가 적용된 인증서 데이터 — data/certifications.ts 와 동일한 shape. */
export async function getAboutCertificationsContent(
  locale: Locale,
): Promise<ResolvedAboutCertifications> {
  const rows = await getContentRows(ABOUT_CONTENT_KEYS);
  return resolveAboutCertificationsFromRows(rows, locale);
}

/** DB 오버라이드가 적용된 문의 데이터 — data/contact.ts 와 동일한 shape. */
export async function getAboutContactContent(
  locale: Locale,
): Promise<ResolvedAboutContact> {
  const rows = await getContentRows(ABOUT_CONTENT_KEYS);
  return resolveAboutContactFromRows(rows, locale);
}

/** /about 페이지용 — rows 한 번만 읽고 CEO + 문의 배너를 함께 resolve. */
export async function getAboutPageContent(
  locale: Locale,
): Promise<{ ceo: ResolvedAbout["ceo"]; contact: ResolvedAboutContact["contact"] }> {
  const rows = await getContentRows(ABOUT_CONTENT_KEYS);
  const about = resolveAboutFromRows(rows, locale);
  const contact = resolveAboutContactFromRows(rows, locale);
  return { ceo: about.ceo, contact: contact.contact };
}
