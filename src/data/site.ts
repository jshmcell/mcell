export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "연혁", href: "/about/history" },
      { label: "인증서", href: "/about/certifications" },
      { label: "Contact Us", href: "/about/contact" },
    ],
  },
  {
    label: "Mcell",
    href: "/mcell",
  },
  {
    label: "SHOP",
    href: "/shop",
  },
  {
    label: "자료실",
    href: "/library/portfolio",
    children: [
      { label: "포트폴리오", href: "/library/portfolio" },
      { label: "카달로그", href: "/library/catalog" },
    ],
  },
  {
    label: "뉴스",
    href: "/news/notices",
    children: [
      { label: "공지사항", href: "/news/notices" },
      { label: "소식", href: "/news/updates" },
    ],
  },
  {
    label: "제휴 및 문의",
    href: "/partnership",
  },
];

export const company = {
  name: "엠셀",
  logoWhite: "/assets/img/f4c9af1f6d804.png",
  logoColor: "/assets/img/8b360156429d2.png",
  address: "본점 ) 경기도 성남시 수정구 달래내로 46 성남글로벌융합센터 A401호 Mcell",
  lab: "연구실 ) 경기도 안성시 삼죽면 덕계실2길 64",
  tel: "+8270-4333-5233",
  fax: "+82-50-4180-9916",
  email: "contact@mcell.co.kr",
};

export const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
] as const;