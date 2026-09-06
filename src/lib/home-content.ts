import "server-only";

import { getContentRows } from "@/lib/content";
import {
  resolveHomeFromRows,
  type ResolvedHome,
} from "@/lib/home-content-resolve";
import { HOME_CONTENT_KEYS } from "@/lib/content-registry";
import type { Locale } from "@/i18n/config";

export type { ResolvedHome };

/** DB 오버라이드가 적용된 홈 데이터 — data/home.ts 와 동일한 shape. */
export async function getHomeContent(locale: Locale): Promise<ResolvedHome> {
  const rows = await getContentRows(HOME_CONTENT_KEYS);
  return resolveHomeFromRows(rows, locale);
}
