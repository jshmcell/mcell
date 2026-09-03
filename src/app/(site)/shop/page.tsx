import type { Metadata } from "next";
import ShopHero from "@/components/shop/ShopHero";
import ShopGrid from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "SHOP",
};

/** SHOP (원본 /37) — 이미지 배너 + 스마트스토어 상품 3종 그리드 */
export default function ShopPage() {
  return (
    <>
      <ShopHero />
      <ShopGrid />
    </>
  );
}
