export interface PortfolioItem {
  name: string;
  thumb: string;
  full: string;
}

/**
 * 포트폴리오 갤러리 (원본 /39) — 썸네일/라이트박스 원본 1:1 대응.
 * 썸네일 위 타이틀(흰색 14px) 항상 표시, 클릭 시 라이트박스.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    name: "온열담요",
    thumb: "/assets/img/d916a025a02a5.jpg",
    full: "/assets/img/4d10351445aa2.jpg",
  },
  {
    name: "온열밴드",
    thumb: "/assets/img/bdfb9ea669ce5.jpg",
    full: "/assets/img/5e21313d2411e.jpg",
  },
  {
    name: "온열조끼",
    thumb: "/assets/img/7bf0d9a856986.jpg",
    full: "/assets/img/980bd960daf9e.jpg",
  },
  {
    name: "온열방석",
    thumb: "/assets/img/f92cebb427544.jpg",
    full: "/assets/img/bd928768fe458.jpg",
  },
  {
    name: "온열안대",
    thumb: "/assets/img/7ea2ebf92ebc7.jpg",
    full: "/assets/img/48ed326a35e9d.jpg",
  },
  {
    name: "온열패",
    thumb: "/assets/img/9b3de8182aae8.jpg",
    full: "/assets/img/a14526358a4b2.jpg",
  },
];

export const portfolioBand = "/assets/img/bdea2b6324e59.jpg";
export const catalogBand = "/assets/img/1aa4028539157.jpg";
