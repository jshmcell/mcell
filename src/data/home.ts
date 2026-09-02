export interface HeroSlide {
  bg: string;
  logo: string;
  tagline: string;
  title: string;
  description: string;
}

export const heroSlides: HeroSlide[] = [
  {
    bg: "/assets/img/7e3811393ea6c.jpg",
    logo: "/assets/img/f4c9af1f6d804.png",
    tagline: "Empower Heat, Shape Innovation",
    title: "스마트 발열 기술로 산업의 혁신을 이끌어갑니다.",
    description: "더 얇고, 더 가볍고, 더 안전한 열전달 구조로 고효율 에너지 솔루션을 제시합니다.",
  },
];

export const techIntro = {
  bg: "/assets/img/48cc9c9a6966f.jpg",
  title: "기술은 에너지 혁신을 만든다",
  lines: ["탄소나노튜브 잉크 기술을 섬유에 직접 적용함으로써,", "기존 필름 방식의 한계를 뛰어넘습니다."],
  image: "/assets/img/05c86916e303f.png",
};

export interface FeatureCard {
  no: string;
  title: string;
  lines: string[];
}

export const featureCards: FeatureCard[] = [
  { no: "❶", title: "고분산 CNT 복합잉크", lines: ["균일한 입자 분산을 통한", "안정적 전도성 확보"] },
  { no: "❷", title: "정밀 인쇄 공정", lines: ["스크린, 디스펜싱, 스프레이등", "다양한 인쇄 방식에 대응"] },
  { no: "❸", title: "초박형 발열체 설계", lines: ["두께1mm 이하의 유연한 구조로", "다양한 곡면 적용 가능"] },
  { no: "❹", title: "스마트 온도 제어", lines: ["빠른 발열, 정밀한 온도 유지로", "에너지 효율 향상"] },
  { no: "❺", title: "TPU 보호막", lines: ["발열충 보호 및", "절연 방지"] },
  { no: "❻", title: "전도성사 전극", lines: ["정밀 설계된", "고장력 도전사 기반 전극"] },
  { no: "❼", title: "CNT 코팅층", lines: ["나노 복합잉크를", "균일하게 분산 코팅"] },
  { no: "❽", title: "자기조립 단층 섬유 구조", lines: ["발열 효율과", "내구성을 동시에 확보"] },
];

export const layerSection = {
  bg: "/assets/img/b61d2d12a0e68.jpg",
  cta: { label: "기술력 소개 바로가기 →", href: "/mcell" },
};

export const industries = {
  title: "산업 전반에 적용 가능한",
  subtitle: "유연한 구조를 갖추다",
  items: [
    { label: "Mobility", thumb: "/assets/img/7761b3d217937.jpg", image: "/assets/img/c73db9bc626f8.jpg" },
    { label: "Wearable & Fashion", thumb: "/assets/img/8817e850b5a8f.jpg", image: "/assets/img/b8537baf04e2b.jpg" },
    { label: "Home Living", thumb: "/assets/img/5b3c5c658407c.jpg", image: "/assets/img/51846a3cba4c4.jpg" },
  ],
  moreLabel: "더보기",
  moreHref: "/shop",
};

export const certifications = {
  title: "논문과 특허로 기술 입증",
  description: ["엠셀은 국내외 특허 출원 및 등록, SCI 등재 논문 발표 등으로 기술력을 검증받았습니다."],
  images: [
    { thumb: "/assets/img/ac3e895434536.jpg", full: "/assets/img/450682816f85b.jpg" },
    { thumb: "/assets/img/f8cf8ea55ed4b.jpg", full: "/assets/img/55b8b8b1235bd.jpg" },
    { thumb: "/assets/img/f37900c7a8412.jpg", full: "/assets/img/10255f1d4ded7.jpg" },
    { thumb: "/assets/img/aee6e7f7fa1ab.jpg", full: "/assets/img/8fe418990811a.jpg" },
    { thumb: "/assets/img/041bfee6c3b0e.jpg", full: "/assets/img/55ef97d5dcf88.jpg" },
    { thumb: "/assets/img/1aaaecec0a74c.jpg", full: "/assets/img/2196b9531ec1e.jpg" },
    { thumb: "/assets/img/0181647b384e2.jpg", full: "/assets/img/0bad7eb460d27.jpg" },
    { thumb: "/assets/img/8803c1f1f3ba9.jpg", full: "/assets/img/b9c55c53a56e5.jpg" },
  ],
};

export const aboutBanner = {
  bg: "/assets/img/6f8f3254af762.jpg",
  title: "기술과 시장을 연결하는 엠셀의 경쟁력",
  description: "엠셀은 발열·단열 기술로 고품질 소재 솔루션을 제공하는 기업입니다.",
  cta: { label: "About company →", href: "/about" },
};

export const production = {
  title: "자체 생산 설비",
  description: "안정적인 품질과 양산 대응력을 갖춘 생산 체계를 확보하고 있습니다.",
  cards: [
    {
      icon: "/assets/img/2f0b1664c3b07.png",
      title: "롤투롤 CNT 코팅 설비 구축 완료",
      lines: [
        "롤투롤(Roll-to-Roll)공정 시스템을",
        "독자적으로 구축하여, 대량 생산이 가능하고",
        "균일한 품질을 유지할 수 있는",
        "스마트 검유 양산 체계를 완성했습니다.",
      ],
    },
    {
      icon: "/assets/img/9911693e1da0c.png",
      title: "경기도 안성 공장 등록 완료",
      lines: [
        "경기도 안성에",
        "전용 생산라인을 설립하고",
        "소재 공급의 안정성과",
        "품질 관리를 강화하고 있습니다.",
      ],
    },
    {
      icon: "/assets/img/8bce04881e0d4.png",
      title: "ISO 9001 품질 인증 확보",
      lines: [
        "제품 생산 전 과정에 대해",
        "국제 품질경영시스템(ISO 9001)인증을 획득하여,",
        "지속 가능한 품질관리 체계와 고객 신뢰 확보를",
        "동시에 만족시키는 시스템을 갖추고 있습니다.",
      ],
    },
  ],
};

export const heatFlex = {
  bg: "/assets/img/60dec9f52a162.jpg",
  logo: "/assets/img/775a94f6bcc4a.png",
  title: "엠셀 HEAT FLEX 기술을 만나보세요",
  lines: [
    "HEAT FLEX 는 엠셀의 원천기술을 기반으로 개발된 스마트 발열 섬유입니다.",
    "고효율, 저전력, 고신뢰성의 발열 기술은 다양한 산업에 새로운 가치를 제시합니다.",
  ],
  cta: { label: "제휴 및 문의 바로가기 →", href: "/partnership" },
};