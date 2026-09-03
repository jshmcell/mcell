/**
 * 사이트 설정 키 레지스트리 — 표시명/그룹/입력 타입 (not a server-action module).
 * seed 와 admin UI, getSiteSettings 가 동일한 키를 공유한다.
 */
export type SiteSettingKind = "string" | "textarea" | "url" | "email" | "tel";

export interface SiteSettingDef {
  key: string;
  group: "company" | "social";
  label: string;
  kind: SiteSettingKind;
}

export const SITE_SETTING_KEYS: SiteSettingDef[] = [
  // 회사/연락처 정보
  { key: "company.name", group: "company", label: "회사명", kind: "string" },
  { key: "company.address", group: "company", label: "본점 주소", kind: "textarea" },
  { key: "company.lab", group: "company", label: "연구실 주소", kind: "textarea" },
  { key: "company.tel", group: "company", label: "전화번호", kind: "tel" },
  { key: "company.fax", group: "company", label: "팩스", kind: "tel" },
  { key: "company.email", group: "company", label: "이메일", kind: "email" },
  // 소셜 링크
  { key: "social.facebook", group: "social", label: "Facebook", kind: "url" },
  { key: "social.instagram", group: "social", label: "Instagram", kind: "url" },
  { key: "social.youtube", group: "social", label: "YouTube", kind: "url" },
];

/** SITE_SETTING_KEYS 를 key → def 로 빠르게 찾기 위한 맵 */
export const SITE_SETTING_DEF_MAP: Record<string, SiteSettingDef> =
  Object.fromEntries(SITE_SETTING_KEYS.map((d) => [d.key, d]));
