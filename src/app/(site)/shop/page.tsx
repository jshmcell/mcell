import type { Metadata } from "next";
import ShopHero from "@/components/shop/ShopHero";
import ShopGrid from "@/components/shop/ShopGrid";
import { getLocale } from "@/i18n/server";
import { getShopHero, getShopProducts } from "@/lib/shop-content";

export const metadata: Metadata = {
  title: "SHOP",
};

export const dynamic = "force-dynamic";

/** SHOP (원본 /37) — 이미지 배너 + 스마트스토어 상품 3종 그리드 (관리자 편집 가능) */
export default async function ShopPage() {
  const locale = await getLocale();
  const [hero, products] = await Promise.all([
    getShopHero(locale),
    getShopProducts(locale),
  ]);
  return (
    <>
      <ShopHero content={hero} />
      <ShopGrid products={products} />
    </>
  );
}
