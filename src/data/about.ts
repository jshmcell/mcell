export interface HistoryItem {
  year: string;
  events: string[];
}

export const ceo = {
  banner: {
    bg: "/assets/img/78457a7744407.png",
    title: "CEO 인사말",
    quote: '"스마트 섬유 기술을 선도하는 MCELL"',
  },
};

export const history: HistoryItem[] = [
  { year: "2015", events: ["현엠셀 창림"] },
  { year: "2016", events: ["퓨처플레이 투자유치"] },
  { year: "2017", events: ["TIPS"] },
  { year: "2018", events: ["국방벤처사업"] },
  { year: "2019", events: ["HEAT - FLEX 출시"] },
  { year: "2020", events: ["국토부 스마트건설기술개발사업", "국현대차 제로원 프로그램"] },
  { year: "2021", events: ["휴비스 투자 유치", "창업성장기술개발사업 선정"] },
  { year: "2022", events: ["경기도 안성 공장 설치"] },
  { year: "2023", events: ["구매조건부 R&D 사업"] },
  { year: "2023.00", events: ["경기도유망중소기업 선정"] },
  { year: "2024", events: ["지역특화 레전드 50+ 선정"] },
  { year: "2024.00", events: ["경동나비엔 차세대 매트개발 MOU 체결"] },
];