export interface Stat {
  label: string;
  value: string;
  note: string;
}

export const hero = {
  bg: "/assets/img/f08601db7318c.jpg",
  title: "스마트 발열 기술의 혁신, 엠셀",
  description: "더 나은 미래를 위해 효율성과 친환경성을 모두 갖춘 기술",
};

export const stats: Stat[] = [
  { label: "총 투자유치", value: "12.5억원", note: "주요 투자기관 참여" },
  { label: "정부 지원", value: "12억원", note: "정부 R&D 프로젝트 총 10건" },
  { label: "개발비 투자", value: "52.6억원", note: "주지속적인 기술 혁신 투자" },
  { label: "신규 협력사", value: "총 13개 업체", note: "주요 투자기관 참여" },
];

export const tech = {
  bg: "/assets/img/1e8198481fd72.jpg",
  heading: "핵심 기술 소개",
  title: "스마트 발열 섬유 기술 히트플렉스",
  description: "탄소나노튜브 전도성 잉크 코팅으로 고효율·고내구성 발열 시스템을 구현합니다.",
  image: "/assets/img/41b0ff9b04c69.png",
  layers: [
    {
      title: "TPU 보호막",
      lines: ["발열층 위에 TPU 보호막을 코팅하여", "발열 섬유 표면의 전기 절연 및 발열층의 박리 예방"],
    },
    {
      title: "전도성사 전극",
      lines: ["고장력 전도사로 제작하여 내구성이 우수하며", "컴퓨터 설계에 의한 고집적 전극 설계"],
    },
    {
      title: "탄소 나노 코팅",
      lines: ["섬유 사이사이에 흡착하여 내구성이 우수하며", "섬유 변형시에도 탄성력, 복원력과 발열 효율을 유지"],
    },
    {
      title: "자가조립단층",
      lines: ["섬유와 발열층의 결합력 및 발열 섬유의 내구성을 향상"],
    },
  ],
};

export interface Product {
  name: string;
  thumb: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    name: "온열안대",
    thumb: "/assets/img/16848def76284.png",
    image: "/assets/img/f2ae3eefc890d.png",
    description:
      "HEAT-FLEX의 면상 발열 기술이 적용된 온열 안대는, 원적외선 기반의 열을 통해 민감한 눈가 피부에도 자극 없이 작용하며, 휴식과 수면 중 편안한 눈가 온열 케어를 제공합니다.",
  },
  {
    name: "온열밴드",
    thumb: "/assets/img/98a1d1245403f.png",
    image: "/assets/img/2c6a87047d3a2.png",
    description:
      "유연한 섬유 형태에 고효율 발열 소재가 통합된 온열 밴드는, 복부나 요추 등 움직임이 많은 부위에도 밀착되어 국소 통증 완화와 체온 유지에 특화된 열 전달 효과를 구현합니다.",
  },
  {
    name: "온열담요",
    thumb: "/assets/img/8b75d347acdbb.png",
    image: "/assets/img/875d943ea3409.png",
    description:
      "넓은 면적에 균일한 발열을 구현하는 HEAT-FLEX 담요는, 저전력 고효율 구조로 실내 난방을 대체할 수 있을 만큼 강력한 보온 성능을 제공하며, 안심하고 사용할 수 있는 안전 회로와 부드러운 착용감까지 갖추고 있습니다.",
  },
  {
    name: "온열조끼",
    thumb: "/assets/img/3bdb2e82e4cd9.png",
    image: "/assets/img/8fd0a1a572ebe.png",
    description:
      "HEAT-FLEX 섬유를 패션 웨어에 통합한 온열 조끼는 외부 활동 중에도 일정한 온도를 유지하며, 유연성과 통기성까지 확보해 활동성과 스타일을 동시에 만족시킵니다.",
  },
  {
    name: "온열방석",
    thumb: "/assets/img/4e42ab656b000.png",
    image: "/assets/img/7157c3307685a.png",
    description:
      "표면 전체에 HEAT-FLEX 발열층을 적용한 온열 방석은 빠른 예열과 열 보존력을 기반으로 하체 보온에 최적화되어 있으며, 차량용·사무용 등 다양한 환경에 안정적으로 대응합니다.",
  },
  {
    name: "온열패드",
    thumb: "/assets/img/842ae28d6b632.png",
    image: "/assets/img/669b40c3024aa.png",
    description:
      "신체 굴곡에 맞게 밀착되는 HEAT-FLEX 패드는 복부, 어깨, 다리 등 다양한 부위에 적용 가능하며, 정밀 제어되는 발열 기술로 찜질 효과를 과학적으로 실현합니다.",
  },
];

export interface Comparison {
  image: string;
  heading: string;
  subheading: string;
  description: string;
  competitorTitle: string;
  competitorLines: string[];
  oursTitle: string;
  oursLines: string[];
}

export const comparisons: Comparison[] = [
  {
    image: "/assets/img/6ebf5b28a4e92.png",
    heading: "기술 성능 비교",
    subheading: "모든 기준에서 앞서는 기술력",
    description: "동일 조건에서도 확연한 성능 차이를 입증합니다.",
    competitorTitle: "타사 발열 방석",
    competitorLines: [
      "일반적인 타사 제품은 와이어 또는 선형 패턴 방식을 사용해 발열부와 비발열부 간의 온도 편차가 크게 발생합니다. 이로 인해 일정하지 않은 열 분포, 과열 집중, 에너지 손실 등의 문제가 나타나며 사용 환경에 따라 불균일한 체온 유지 및 안정성 저하로 이어질 수 있습니다.",
    ],
    oursTitle: "히트플렉스 발열 방석",
    oursLines: [
      "전면에 균일하게 열이 분포되는 구조적",
      "설계를 통해 단일 지점이 아닌",
      "섬유 전체에 안정적인 발열|bold",
      "을 제공합니다.",
      "고정밀 전극 분산 기술과 탄소나노 전도잉크의",
      "조합으로|plain",
      "온도 편차 없이 일정한 열 균형을|bold",
      "유지|bold",
      "하며, 장시간 사용 시에도 과열 및",
      "국부 집중 현상이 발생하지 않습니다.",
    ],
  },
  {
    image: "/assets/img/0260987d8aa0d.png",
    heading: "",
    subheading: "",
    description: "",
    competitorTitle: "타사 발열 방석",
    competitorLines: [
      "일반 발열소재는 낮은 전도 효율과 불균일한",
      "발열 구조로 인해 동일한 에너지를 사용해도",
      "열이 고르게 퍼지지 않고, 응답 속도와",
      "온도 유지 능력에서도 큰 차이를 보입니다. 특히 저전력 환경에서는 발열 자체가",
      "불완전하게 발생하거나 초기 성능을",
      "일정하게 유지하지 못하는 경우가 많습니다.",
    ],
    oursTitle: "히트플렉스 발열 방석",
    oursLines: [
      "히트플렉스는 구동 후 10초 이내에",
      "목표 온도에 도달하며, 저전력 조건에서도",
      "99% 이상의 발열 효율|bold",
      "을 구현합니다.",
      "섬유 전반에 균일하게 분산된 탄소 전도층과",
      "고정밀 전극 구조를 기반으로",
      "발열 속도, 열 보존력, 전력 소모 대비",
      "효율성|bold",
      "에서 매우 우수한 성능을 나타냅니다.",
    ],
  },
];

export const platform = {
  heading: "기술의 확장 가능성",
  title: "발열 기술을 넘어, 스마트 소재 플랫폼으로",
  description: "친환경 고기능 소재를 기반으로 글로벌 시장까지 확장을 준비하고 있습니다.",
  image: "/assets/img/db4e09932365a.png",
  banner: "엠셀은 친환경, 고기능, 글로벌 확장을 위한 스마트 소재 플랫폼을 완성해가고 있습니다.",
};

export const industries = {
  heading: "적용 산업",
  title: "지금도, 미래에도 확장되는 엠셀 기술",
  description: "다양한 산업에서 이미 적용되고 있으며, 미래 산업으로의 확장성 또한 큽니다.",
  image: "/assets/img/a18007d9417d9.jpg",
};

export const cooperation = {
  heading: "기술 협력 현황",
  title: "다양한 기업·기관과 함께하는 기술 협력",
  description: "공동개발 및 공급 협약을 통해 상용화 기반을 강화하고 있습니다.",
  logos: [
    "/assets/img/44eafda919471.jpg",
    "/assets/img/61858dbe2b093.jpg",
    "/assets/img/8be39b7a1e9ce.jpg",
    "/assets/img/f5dada5781847.jpg",
  ],
};