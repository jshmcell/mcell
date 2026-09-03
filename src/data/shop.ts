export interface ShopProduct {
  name: string;
  image: string;
  href: string;
}

const SMARTSTORE = "https://smartstore.naver.com/heatflex";

/** SHOP (원본 /37) — 네이버 스마트스토어 외부 링크 3종 */
export const shopProducts: ShopProduct[] = [
  {
    name: "온열조끼",
    image: "/assets/img/5e488a9ca5389.jpg",
    href: SMARTSTORE,
  },
  {
    name: "온열안대",
    image: "/assets/img/3f077c4157c0f.jpg",
    href: SMARTSTORE,
  },
  {
    name: "온열담요",
    image: "/assets/img/45b2eb49cb956.jpg",
    href: SMARTSTORE,
  },
];
