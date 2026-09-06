/**
 * 콘텐츠 리소스 레지스트리 — 관리자 편집 가능 키의 단일 진실 소스.
 * kind: text(한 줄) | textarea(여러 줄, \n 구분) | image | video | url(언어 공통 링크)
 * (not a server-action module)
 */

export type ContentKind = "text" | "textarea" | "image" | "video" | "url";
export type ContentGroup = "home" | "shop" | "partnership";

export interface ContentDef {
  key: string;
  group: ContentGroup;
  /** Section heading shown in the admin editor (bilingual) */
  section: { ko: string; en: string };
  label: { ko: string; en: string };
  kind: ContentKind;
  revalidate: string[];
}

function d(
  key: string,
  group: ContentGroup,
  section: { ko: string; en: string },
  labelKo: string,
  labelEn: string,
  kind: ContentKind,
  revalidate: string[],
): ContentDef {
  return { key, group, section, label: { ko: labelKo, en: labelEn }, kind, revalidate };
}

const HOME = ["/", "/en"];
const SHOP = ["/shop", "/en/shop"];
const PARTNERSHIP = ["/partnership", "/en/partnership"];

const heroSec = { ko: "히어로", en: "Hero" };
const techSec = { ko: "기술 소개", en: "Tech intro" };
const featSec = { ko: "특징 카드", en: "Feature cards" };
const layerSec = { ko: "레이어 CTA", en: "Layer CTA" };
const indSec = { ko: "적용 산업", en: "Industries" };
const certSec = { ko: "인증서", en: "Certifications" };
const aboutSec = { ko: "About 배너", en: "About banner" };
const prodSec = { ko: "생산 설비", en: "Production" };
const heatSec = { ko: "HEAT FLEX", en: "HEAT FLEX" };

export const CONTENT_DEFS: ContentDef[] = [
  // ── Hero ──
  d("home.hero.bg", "home", heroSec, "배경 이미지 (PC)", "Background image (PC)", "image", HOME),
  d("home.hero.bgMobile", "home", heroSec, "배경 이미지 (모바일)", "Background image (mobile)", "image", HOME),
  d("home.hero.logo", "home", heroSec, "로고 이미지", "Logo image", "image", HOME),
  d("home.hero.tagline", "home", heroSec, "태그라인 (영문)", "Tagline", "text", HOME),
  d("home.hero.title", "home", heroSec, "제목", "Title", "text", HOME),
  d("home.hero.titleMobile", "home", heroSec, "제목 (모바일, 줄바꿈 가능)", "Title (mobile, multiline)", "textarea", HOME),
  d("home.hero.description", "home", heroSec, "설명", "Description", "text", HOME),
  d("home.hero.descriptionMobile", "home", heroSec, "설명 (모바일, 줄바꿈 가능)", "Description (mobile, multiline)", "textarea", HOME),

  // ── Tech intro ──
  d("home.techIntro.bg", "home", techSec, "배경 이미지", "Background image", "image", HOME),
  d("home.techIntro.photo", "home", techSec, "사진", "Photo", "image", HOME),
  d("home.techIntro.title", "home", techSec, "제목", "Title", "text", HOME),
  d("home.techIntro.lines", "home", techSec, "본문 (줄바꿈 구분)", "Body (one per line)", "textarea", HOME),
  d("home.techIntro.image", "home", techSec, "하단 이미지", "Bottom image", "image", HOME),

  // ── Feature cards (8) ──
  ...Array.from({ length: 8 }, (_, i) => [
    d(`home.features.${i}.title`, "home", featSec, `카드 ${i + 1} 제목`, `Card ${i + 1} title`, "text", HOME),
    d(`home.features.${i}.lines`, "home", featSec, `카드 ${i + 1} 본문`, `Card ${i + 1} body`, "textarea", HOME),
  ]).flat(),

  // ── Layer CTA ──
  d("home.layer.bg", "home", layerSec, "배경 이미지", "Background image", "image", HOME),
  d("home.layer.title", "home", layerSec, "제목", "Title", "text", HOME),
  d("home.layer.titleMobile", "home", layerSec, "제목 (모바일)", "Title (mobile)", "textarea", HOME),
  d("home.layer.lines", "home", layerSec, "본문 (줄바꿈 구분)", "Body (one per line)", "textarea", HOME),
  d("home.layer.linesMobile", "home", layerSec, "본문 (모바일)", "Body (mobile)", "textarea", HOME),
  d("home.layer.ctaLabel", "home", layerSec, "버튼 문구", "Button label", "text", HOME),
  d("home.layer.ctaHref", "home", layerSec, "버튼 링크", "Button link", "url", HOME),

  // ── Industries ──
  d("home.industries.title", "home", indSec, "제목", "Title", "text", HOME),
  d("home.industries.subtitle", "home", indSec, "부제", "Subtitle", "text", HOME),
  ...[0, 1, 2].map((i) => [
    d(`home.industries.${i}.label`, "home", indSec, `항목 ${i + 1} 이름`, `Item ${i + 1} label`, "text", HOME),
    d(`home.industries.${i}.thumb`, "home", indSec, `항목 ${i + 1} 썸네일`, `Item ${i + 1} thumbnail`, "image", HOME),
    d(`home.industries.${i}.image`, "home", indSec, `항목 ${i + 1} 이미지 (호버)`, `Item ${i + 1} image (hover)`, "image", HOME),
  ]).flat(),

  // ── Certifications ──
  d("home.certs.title", "home", certSec, "제목", "Title", "text", HOME),
  d("home.certs.description", "home", certSec, "설명", "Description", "textarea", HOME),
  ...Array.from({ length: 8 }, (_, i) => [
    d(`home.certs.${i}.thumb`, "home", certSec, `인증서 ${i + 1} 썸네일`, `Certificate ${i + 1} thumbnail`, "image", HOME),
    d(`home.certs.${i}.full`, "home", certSec, `인증서 ${i + 1} 원본`, `Certificate ${i + 1} full image`, "image", HOME),
  ]).flat(),

  // ── About banner ──
  d("home.aboutBanner.bg", "home", aboutSec, "배경 이미지", "Background image", "image", HOME),
  d("home.aboutBanner.title", "home", aboutSec, "제목", "Title", "text", HOME),
  d("home.aboutBanner.description", "home", aboutSec, "설명", "Description", "text", HOME),
  d("home.aboutBanner.ctaLabel", "home", aboutSec, "버튼 문구", "Button label", "text", HOME),
  d("home.aboutBanner.ctaHref", "home", aboutSec, "버튼 링크", "Button link", "url", HOME),

  // ── Production ──
  d("home.production.title", "home", prodSec, "제목", "Title", "text", HOME),
  d("home.production.description", "home", prodSec, "설명", "Description", "textarea", HOME),
  ...[0, 1, 2].map((i) => [
    d(`home.production.${i}.icon`, "home", prodSec, `카드 ${i + 1} 아이콘`, `Card ${i + 1} icon`, "image", HOME),
    d(`home.production.${i}.title`, "home", prodSec, `카드 ${i + 1} 제목`, `Card ${i + 1} title`, "text", HOME),
    d(`home.production.${i}.lines`, "home", prodSec, `카드 ${i + 1} 본문`, `Card ${i + 1} body`, "textarea", HOME),
  ]).flat(),

  // ── HEAT FLEX ──
  d("home.heatFlex.bg", "home", heatSec, "배경 이미지", "Background image", "image", HOME),
  d("home.heatFlex.logo", "home", heatSec, "로고 이미지", "Logo image", "image", HOME),
  d("home.heatFlex.title", "home", heatSec, "제목", "Title", "text", HOME),
  d("home.heatFlex.lines", "home", heatSec, "본문 (줄바꿈 구분)", "Body (one per line)", "textarea", HOME),
  d("home.heatFlex.ctaLabel", "home", heatSec, "버튼 문구", "Button label", "text", HOME),
  d("home.heatFlex.ctaHref", "home", heatSec, "버튼 링크", "Button link", "url", HOME),

  // ── SHOP ──
  d("shop.hero.banner", "shop", { ko: "상단 배너", en: "Hero banner" }, "배너 이미지", "Banner image", "image", SHOP),
  d("shop.hero.title", "shop", { ko: "상단 배너", en: "Hero banner" }, "제목", "Title", "text", SHOP),
  d("shop.hero.description", "shop", { ko: "상단 배너", en: "Hero banner" }, "설명", "Description", "text", SHOP),
  ...[0, 1, 2].map((i) => [
    d(`shop.product.${i}.name`, "shop", { ko: `상품 ${i + 1}`, en: `Product ${i + 1}` }, "상품명", "Product name", "text", SHOP),
    d(`shop.product.${i}.image`, "shop", { ko: `상품 ${i + 1}`, en: `Product ${i + 1}` }, "상품 이미지", "Product image", "image", SHOP),
    d(`shop.product.${i}.href`, "shop", { ko: `상품 ${i + 1}`, en: `Product ${i + 1}` }, "구매 링크", "Purchase link", "url", SHOP),
  ]).flat(),

  // ── Partnership ──
  d("partnership.heading", "partnership", { ko: "문의 헤딩", en: "Inquiry heading" }, "헤딩", "Heading", "text", PARTNERSHIP),
  d("partnership.title", "partnership", { ko: "문의 헤딩", en: "Inquiry heading" }, "타이틀", "Title", "text", PARTNERSHIP),
  d("partnership.lines", "partnership", { ko: "문의 헤딩", en: "Inquiry heading" }, "본문 (줄바꿈 구분)", "Body (one per line)", "textarea", PARTNERSHIP),
  d("partnership.banner", "partnership", { ko: "문의 헤딩", en: "Inquiry heading" }, "배너 이미지", "Banner image", "image", PARTNERSHIP),
];

export const CONTENT_DEF_MAP: Record<string, ContentDef> = Object.fromEntries(
  CONTENT_DEFS.map((def) => [def.key, def]),
);

export const CONTENT_KEYS = CONTENT_DEFS.map((def) => def.key);
export const HOME_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "home").map((def) => def.key);
export const SHOP_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "shop").map((def) => def.key);

export const MAX_LENGTH: Record<ContentKind, number> = {
  text: 500,
  textarea: 20000,
  image: 2000,
  video: 2000,
  url: 2000,
};

/** image/video/url 값 검증 — 상대 /assets 경로, blob URL, http(s) 외부 URL 허용 */
export function isAllowedMediaUrl(value: string): boolean {
  if (/[\s<>"]/.test(value)) return false;
  return (
    value.startsWith("/assets/") ||
    value.startsWith("https://") ||
    value.startsWith("http://")
  );
}

/** 흔한 입력 실수 자동 교정 — "assets/…" → "/assets/…" (앞 슬래시 누락) */
export function normalizeMediaUrl(value: string): string {
  const v = value.trim();
  if (/^assets\//i.test(v)) return `/${v}`;
  return v;
}

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)(\?|#|$)/i;
const VIDEO_EXT = /\.(mp4|webm)(\?|#|$)/i;

/**
 * 클라이언트 저장 전 검증. 빈 값 = 기본값 복귀이므로 유효.
 * image: /assets/, http(s) URL (확장자 없는 CDN 이미지도 수용), blob 업로드 URL.
 * video: 위 조건 + .mp4/.webm 확장자 필요.
 */
export function validateMediaValue(
  value: string,
  kind: "image" | "video" | "url",
): { ok: boolean; message?: string } {
  const v = value.trim();
  if (!v) return { ok: true };
  if (/[\s<>"]/.test(v)) return { ok: false, message: "bad" };
  const isUrlish =
    v.startsWith("/assets/") ||
    v.startsWith("https://") ||
    v.startsWith("http://");
  if (!isUrlish) return { ok: false, message: "bad" };
  if (kind === "video" && !VIDEO_EXT.test(v)) return { ok: false, message: "video" };
  // image: 확장자가 있으면 이미지 확장자인지 확인 (없으면 CDN URL로 수용)
  if (kind === "image" && IMAGE_EXT.test(v) === false && VIDEO_EXT.test(v)) {
    return { ok: false, message: "video" };
  }
  return { ok: true };
}

