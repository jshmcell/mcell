import "server-only";

import { getContentRows } from "@/lib/content";
import {
  resolveFooterFromRows,
  type ResolvedFooter,
} from "@/lib/footer-content-resolve";
import { FOOTER_CONTENT_KEYS } from "@/lib/content-registry";
import type { Locale } from "@/i18n/config";

export type { ResolvedFooter };

/** DB 오버라이드가 적용된 푸터 데이터 — data/footer.ts 와 동일한 shape. */
export async function getFooterContent(locale: Locale): Promise<ResolvedFooter> {
  const rows = await getContentRows(FOOTER_CONTENT_KEYS);
  return resolveFooterFromRows(rows, locale);
}
