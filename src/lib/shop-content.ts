import "server-only";

import { getContentRows } from "@/lib/content";
import {
  resolveShopHeroFromRows,
  resolveShopProductsFromRows,
  type ResolvedShopHero,
} from "@/lib/shop-content-resolve";
import { SHOP_CONTENT_KEYS } from "@/lib/content-registry";
import type { Locale } from "@/i18n/config";

export type { ResolvedShopHero };

export async function getShopHero(locale: Locale): Promise<ResolvedShopHero> {
  const rows = await getContentRows(SHOP_CONTENT_KEYS);
  return resolveShopHeroFromRows(rows, locale);
}

export async function getShopProducts(locale: Locale) {
  const rows = await getContentRows(SHOP_CONTENT_KEYS);
  return resolveShopProductsFromRows(rows, locale);
}
