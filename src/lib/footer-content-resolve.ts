import type { Locale } from "@/i18n/config";
import { FOOTER_DEFAULTS } from "@/data/footer";
import { pickText, type ContentRows } from "@/lib/content-resolve";
import { EN_FOOTER } from "@/data/content-en";

/** DB/드래프트 오버라이드가 적용된 푸터 데이터 — data/footer.ts 와 동일한 shape. */
export interface ResolvedFooter {
  companyName: string;
  address: string;
  lab: string;
  telPrefix: string;
  faxPrefix: string;
  emailPrefix: string;
  terms: string;
  privacy: string;
}

/** 순수 함수 — 서버(footer-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용.
 *  collect 를 넘기면 키 → 적용된 기본/오버라이드 값 맵이 채워진다 (관리자 placeholder 용). */
export function resolveFooterFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedFooter {
  // EN 사전(data/content-en.ts) → 한국어 기본값 → DB 오버라이드 순으로 결정
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_FOOTER[key] ?? fallback) : fallback;
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback));
    collect?.set(key, v);
    return v;
  };

  return {
    companyName: t("footer.companyName", FOOTER_DEFAULTS.companyName),
    address: t("footer.address", FOOTER_DEFAULTS.address),
    lab: t("footer.lab", FOOTER_DEFAULTS.lab),
    telPrefix: t("footer.telPrefix", FOOTER_DEFAULTS.telPrefix),
    faxPrefix: t("footer.faxPrefix", FOOTER_DEFAULTS.faxPrefix),
    emailPrefix: t("footer.emailPrefix", FOOTER_DEFAULTS.emailPrefix),
    terms: t("footer.terms", FOOTER_DEFAULTS.terms),
    privacy: t("footer.privacy", FOOTER_DEFAULTS.privacy),
  };
}
