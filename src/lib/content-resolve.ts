import type { Locale } from "@/i18n/config";

/** key → per-locale values (client-safe type used by admin previews too). */
export type ContentRows = Record<string, { ko?: string; en?: string }>;

function raw(
  rows: ContentRows,
  key: string,
  locale: Locale,
): string | undefined {
  const entry = rows[key];
  if (!entry) return undefined;
  const v =
    locale === "en"
      ? entry.en?.trim() || entry.ko?.trim()
      : entry.ko?.trim();
  return v || undefined;
}

/** 단일 문구/미디어 URL — en은 ko로 폴백, 없으면 fallback(데이터 파일 기본값). */
export function pickText(
  rows: ContentRows,
  key: string,
  locale: Locale,
  fallback: string,
): string {
  return raw(rows, key, locale) ?? fallback;
}

/** 여러 줄 문구 — 오버라이드가 있으면 줄 단위로 분리, 없으면 fallback 배열 그대로. */
export function pickLines(
  rows: ContentRows,
  key: string,
  locale: Locale,
  fallback: string[],
): string[] {
  const v = raw(rows, key, locale);
  return v === undefined ? fallback : v.split(/\r?\n/);
}
