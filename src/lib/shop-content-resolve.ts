import type { Locale } from "@/i18n/config";
import { shopProducts as dProducts, type ShopProduct } from "@/data/shop";
import { pickText, type ContentRows } from "@/lib/content-resolve";
import { EN_SHOP } from "@/data/content-en";

const HERO_DEFAULTS = {
  banner: "/assets/img/c2151c9116511.jpg",
  title: "SHOP",
  description: "엠셀의 기술력으로 완성된 다양한 제품을 만나보세요.",
};

/** EN 폴백 사전 조회 (data/content-en.ts) */
function fb(key: string, fallback: string, locale: Locale): string {
  return locale === "en" ? (EN_SHOP[key] ?? fallback) : fallback;
}

export interface ResolvedShopHero {
  banner: string;
  title: string;
  description: string;
}

/** 순수 함수 — 서버 페이지와 관리자 미리보기 양쪽에서 사용.
 *  collect 를 넘기면 키 → 값 맵이 채워진다 (관리자 placeholder 용). */
export function resolveShopHeroFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedShopHero {
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback, locale));
    collect?.set(key, v);
    return v;
  };
  return {
    banner: t("shop.hero.banner", HERO_DEFAULTS.banner),
    title: t("shop.hero.title", HERO_DEFAULTS.title),
    description: t("shop.hero.description", HERO_DEFAULTS.description),
  };
}

/** DB/드래프트 오버라이드가 적용된 상품 목록 — data/shop.ts 와 동일한 shape. */
export function resolveShopProductsFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ShopProduct[] {
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback, locale));
    collect?.set(key, v);
    return v;
  };
  return dProducts.map((p, i) => ({
    name: t(`shop.product.${i}.name`, p.name),
    image: t(`shop.product.${i}.image`, p.image),
    href: t(`shop.product.${i}.href`, p.href),
  }));
}
