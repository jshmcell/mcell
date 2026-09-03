/** 페이지 콘텐츠 키 레지스트리 — 표시명 + 재검증 경로 (not a server-action module). */
export const CONTENT_KEYS: Array<{
  key: string;
  label: string;
  revalidate: string[];
}> = [
  { key: "home.tagline", label: "홈 — 태그라인", revalidate: ["/"] },
  { key: "home.sub", label: "홈 — 서브 문구", revalidate: ["/"] },
  { key: "partnership.heading", label: "제휴 — 헤딩", revalidate: ["/partnership"] },
  { key: "partnership.title", label: "제휴 — 타이틀", revalidate: ["/partnership"] },
];