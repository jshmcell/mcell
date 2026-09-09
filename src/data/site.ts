export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const company = {
  name: "엠셀",
  logoWhite: "/assets/img/ee5680f827a98.png",
  logoColor: "/assets/img/8b360156429d2.png",
  address:
    "본점 ) 경기도 성남시 수정구 달래내로 46 성남글로벌융합센터 A401호 Mcell",
  lab: "연구실 ) 경기도 안성시 삼죽면 덕계실2길 64",
  tel: "+8270-4333-5233",
  fax: "+82-50-4180-9916",
  email: "contact@mcell.co.kr",
};
