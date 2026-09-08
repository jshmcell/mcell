import "server-only";

import { getContentRows } from "@/lib/content";
import {
  resolveMcellFromRows,
  resolveMcellOemFromRows,
  type ResolvedMcell,
  type ResolvedMcellOem,
} from "@/lib/mcell-content-resolve";
import { MCELL_CONTENT_KEYS } from "@/lib/content-registry";
import type { Locale } from "@/i18n/config";

export type { ResolvedMcell, ResolvedMcellOem };

/** DB 오버라이드가 적용된 mcell 데이터 — data/mcell.ts 와 동일한 shape. */
export async function getMcellContent(locale: Locale): Promise<ResolvedMcell> {
  const rows = await getContentRows(MCELL_CONTENT_KEYS);
  return resolveMcellFromRows(rows, locale);
}

/** DB 오버라이드가 적용된 mcell OEM/ODM 데이터 — data/mcell.ts 와 동일한 shape. */
export async function getMcellOemContent(locale: Locale): Promise<ResolvedMcellOem> {
  const rows = await getContentRows(MCELL_CONTENT_KEYS);
  return resolveMcellOemFromRows(rows, locale);
}
