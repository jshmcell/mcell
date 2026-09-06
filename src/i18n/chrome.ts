import type { Locale } from "./config";

export interface HeaderChrome {
  login: string;
  signup: string;
  mypage: string;
  logout: string;
  admin: string;
  /** Greeting suffix appended after the user name (KO "님", EN ""). */
  greetingSuffix: string;
  helloSuffix: string;
  needLogin: string;
  closeMenu: string;
  openSubmenu: string;
}

export interface SearchChrome {
  label: string;
  placeholder: string;
  close: string;
  submit: string;
}

export interface FooterChrome {
  terms: string;
  privacy: string;
}

export interface ChromeDict {
  header: HeaderChrome;
  search: SearchChrome;
  footer: FooterChrome;
  mobileNavLabel: string;
  close: string;
  language: { label: string; korean: string; english: string };
}

const ko: ChromeDict = {
  header: {
    login: "로그인",
    signup: "회원가입",
    mypage: "마이페이지",
    logout: "로그아웃",
    admin: "관리자",
    greetingSuffix: "님",
    helloSuffix: "님, 안녕하세요.",
    needLogin: "로그인이 필요합니다.",
    closeMenu: "메뉴 닫기",
    openSubmenu: "하위메뉴 열기",
  },
  search: {
    label: "site search",
    placeholder: "Search",
    close: "검색 닫기",
    submit: "검색",
  },
  footer: { terms: "이용약관", privacy: "개인정보처리방침" },
  mobileNavLabel: "모바일 메뉴",
  close: "닫기",
  language: { label: "언어 선택", korean: "한국어", english: "English" },
};

const en: ChromeDict = {
  header: {
    login: "Login",
    signup: "Sign up",
    mypage: "My Page",
    logout: "Logout",
    admin: "Admin",
    greetingSuffix: "",
    helloSuffix: ", hello.",
    needLogin: "Please sign in.",
    closeMenu: "Close menu",
    openSubmenu: "Open submenu",
  },
  search: {
    label: "site search",
    placeholder: "Search",
    close: "Close search",
    submit: "Search",
  },
  footer: { terms: "Terms of Service", privacy: "Privacy Policy" },
  mobileNavLabel: "Mobile menu",
  close: "Close",
  language: { label: "Select language", korean: "한국어", english: "English" },
};

export const chromeDict: Record<Locale, ChromeDict> = { ko, en };
