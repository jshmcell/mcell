/**
 * 콘텐츠 리소스 레지스트리 — 관리자 편집 가능 키의 단일 진실 소스.
 * kind: text(한 줄) | textarea(여러 줄, \n 구분) | image | video | url(언어 공통 링크)
 * (not a server-action module)
 */

export type ContentKind = "text" | "textarea" | "image" | "video" | "url" | "historyList" | "officeList" | "certList";
export type ContentGroup = "home" | "shop" | "partnership" | "mcell" | "about" | "footer";

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
const MCELL = ["/mcell", "/en/mcell", "/mcell/oem-odm", "/en/mcell/oem-odm"];
const ABOUT = [
  "/about",
  "/en/about",
  "/about/history",
  "/en/about/history",
  "/about/certifications",
  "/en/about/certifications",
  "/about/contact",
  "/en/about/contact",
];
const FOOTER = ["/", "/en"];

const heroSec = { ko: "히어로", en: "Hero" };
const techSec = { ko: "기술 소개", en: "Tech intro" };
const featSec = { ko: "특징 카드", en: "Feature cards" };
const layerSec = { ko: "레이어 CTA", en: "Layer CTA" };
const indSec = { ko: "적용 산업", en: "Industries" };
const certSec = { ko: "인증서", en: "Certifications" };
const aboutSec = { ko: "About 배너", en: "About banner" };
const prodSec = { ko: "생산 설비", en: "Production" };
const heatSec = { ko: "HEAT FLEX", en: "HEAT FLEX" };

// ── mcell group ──
const mcellHeroSec = { ko: "배너", en: "Hero banner" };
const mcellStatsSec = { ko: "투자 현황", en: "Investment stats" };
const mcellTechSec = { ko: "핵심 기술", en: "Core technology" };
const mcellTechLayerSec = { ko: "기술 레이어", en: "Tech layers" };
const mcellProductsSec = { ko: "제품 정보", en: "Products" };
const mcellComparisonsSec = { ko: "성능 비교", en: "Comparisons" };
const mcellPlatformSec = { ko: "기술 확장", en: "Platform" };
const mcellIndustriesSec = { ko: "적용 산업", en: "Industries" };
const mcellCooperationSec = { ko: "기술 협력", en: "Cooperation" };
const mcellOemBannerSec = { ko: "OEM 배너", en: "OEM banner" };
const mcellOemBlocksSec = { ko: "OEM 적용 분야", en: "OEM fields" };
const mcellRndSec = { ko: "R&D", en: "R&D" };
const mcellOemProofSec = { ko: "파트너십 실적", en: "Partnership proof" };
const mcellProofSec = { ko: "실적 항목", en: "Proof items" };

// ── about group ──
const aboutCeoSec = { ko: "CEO 인사말", en: "CEO message" };
const aboutHistorySec = { ko: "연혁", en: "History" };
const aboutCertsSec = { ko: "인증서", en: "Certifications" };
const aboutContactBannerSec = { ko: "문의 배너", en: "Contact banner" };
const aboutOfficesSec = { ko: "오피스 정보", en: "Offices" };

// ── footer group ──
const footerSec = { ko: "푸터", en: "Footer" };

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

  // ── MCELL (기술력 소개 /mcell) ──
  d("mcell.hero.bg", "mcell", mcellHeroSec, "배경 이미지", "Background image", "image", MCELL),
  d("mcell.hero.title", "mcell", mcellHeroSec, "제목", "Title", "text", MCELL),
  d("mcell.hero.description", "mcell", mcellHeroSec, "설명", "Description", "text", MCELL),
  d("mcell.hero.logo", "mcell", mcellHeroSec, "로고 이미지", "Logo image", "image", MCELL),
  d("mcell.hero.strip", "mcell", mcellHeroSec, "하단 스트립 이미지", "Bottom strip image", "image", MCELL),

  // ── MCELL 투자 현황 (4) ──
  ...[0, 1, 2, 3].map((i) => [
    d(`mcell.stats.${i}.label`, "mcell", mcellStatsSec, `카드 ${i + 1} 라벨`, `Card ${i + 1} label`, "text", MCELL),
    d(`mcell.stats.${i}.value`, "mcell", mcellStatsSec, `카드 ${i + 1} 값`, `Card ${i + 1} value`, "text", MCELL),
    d(`mcell.stats.${i}.note`, "mcell", mcellStatsSec, `카드 ${i + 1} 설명`, `Card ${i + 1} note`, "text", MCELL),
  ]).flat(),

  // ── MCELL 핵심 기술 ──
  d("mcell.tech.bg", "mcell", mcellTechSec, "배경 이미지", "Background image", "image", MCELL),
  d("mcell.tech.heading", "mcell", mcellTechSec, "헤딩", "Heading", "text", MCELL),
  d("mcell.tech.title", "mcell", mcellTechSec, "제목", "Title", "text", MCELL),
  d("mcell.tech.description", "mcell", mcellTechSec, "설명", "Description", "text", MCELL),
  d("mcell.tech.image", "mcell", mcellTechSec, "단면 다이어그램 이미지", "Cross-section image", "image", MCELL),
  ...[0, 1, 2, 3].map((i) => [
    d(`mcell.tech.layers.${i}.title`, "mcell", mcellTechLayerSec, `레이어 ${i + 1} 제목`, `Layer ${i + 1} title`, "text", MCELL),
    d(`mcell.tech.layers.${i}.lines`, "mcell", mcellTechLayerSec, `레이어 ${i + 1} 본문`, `Layer ${i + 1} body`, "textarea", MCELL),
  ]).flat(),

  // ── MCELL 제품 정보 (6) ──
  ...[0, 1, 2, 3, 4, 5].map((i) => [
    d(`mcell.products.${i}.name`, "mcell", mcellProductsSec, `제품 ${i + 1} 이름`, `Product ${i + 1} name`, "text", MCELL),
    d(`mcell.products.${i}.thumb`, "mcell", mcellProductsSec, `제품 ${i + 1} 썸네일`, `Product ${i + 1} thumbnail`, "image", MCELL),
    d(`mcell.products.${i}.image`, "mcell", mcellProductsSec, `제품 ${i + 1} 이미지`, `Product ${i + 1} image`, "image", MCELL),
    d(`mcell.products.${i}.description`, "mcell", mcellProductsSec, `제품 ${i + 1} 설명`, `Product ${i + 1} description`, "textarea", MCELL),
  ]).flat(),

  // ── MCELL 성능 비교 (2) ──
  ...[0, 1].map((i) => [
    d(`mcell.comparisons.${i}.image`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 열화상 이미지`, `Comparison ${i + 1} thermal image`, "image", MCELL),
    d(`mcell.comparisons.${i}.heading`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 헤딩`, `Comparison ${i + 1} heading`, "text", MCELL),
    d(`mcell.comparisons.${i}.subheading`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 부제`, `Comparison ${i + 1} subheading`, "text", MCELL),
    d(`mcell.comparisons.${i}.description`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 설명`, `Comparison ${i + 1} description`, "text", MCELL),
    d(`mcell.comparisons.${i}.competitorTitle`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 타사 제목`, `Comparison ${i + 1} competitor title`, "text", MCELL),
    d(`mcell.comparisons.${i}.competitorLogo`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 타사 로고`, `Comparison ${i + 1} competitor logo`, "image", MCELL),
    d(`mcell.comparisons.${i}.competitorLines`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 타사 본문`, `Comparison ${i + 1} competitor body`, "textarea", MCELL),
    d(`mcell.comparisons.${i}.oursTitle`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 히트플렉스 제목`, `Comparison ${i + 1} ours title`, "text", MCELL),
    d(`mcell.comparisons.${i}.oursLogo`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 히트플렉스 로고`, `Comparison ${i + 1} ours logo`, "image", MCELL),
    d(`mcell.comparisons.${i}.oursLines`, "mcell", mcellComparisonsSec, `비교 ${i + 1} 히트플렉스 본문`, `Comparison ${i + 1} ours body`, "textarea", MCELL),
  ]).flat(),

  // ── MCELL 기술 확장 ──
  d("mcell.platform.heading", "mcell", mcellPlatformSec, "헤딩", "Heading", "text", MCELL),
  d("mcell.platform.title", "mcell", mcellPlatformSec, "제목", "Title", "text", MCELL),
  d("mcell.platform.description", "mcell", mcellPlatformSec, "설명", "Description", "text", MCELL),
  d("mcell.platform.image", "mcell", mcellPlatformSec, "이미지", "Image", "image", MCELL),
  d("mcell.platform.banner", "mcell", mcellPlatformSec, "배너 문구", "Banner text", "text", MCELL),

  // ── MCELL 적용 산업 ──
  d("mcell.industries.heading", "mcell", mcellIndustriesSec, "헤딩", "Heading", "text", MCELL),
  d("mcell.industries.title", "mcell", mcellIndustriesSec, "제목", "Title", "text", MCELL),
  d("mcell.industries.description", "mcell", mcellIndustriesSec, "설명", "Description", "text", MCELL),
  d("mcell.industries.image", "mcell", mcellIndustriesSec, "이미지", "Image", "image", MCELL),

  // ── MCELL 기술 협력 ──
  d("mcell.cooperation.heading", "mcell", mcellCooperationSec, "헤딩", "Heading", "text", MCELL),
  d("mcell.cooperation.title", "mcell", mcellCooperationSec, "제목", "Title", "text", MCELL),
  d("mcell.cooperation.description", "mcell", mcellCooperationSec, "설명", "Description", "text", MCELL),
  ...[0, 1, 2, 3].map((i) =>
    d(`mcell.cooperation.slides.${i}`, "mcell", mcellCooperationSec, `슬라이드 ${i + 1} 이미지`, `Slide ${i + 1} image`, "image", MCELL),
  ),

  // ── MCELL OEM/ODM 배너 ──
  d("mcell.oemBanner.bg", "mcell", mcellOemBannerSec, "배경 이미지", "Background image", "image", MCELL),
  d("mcell.oemBanner.logo", "mcell", mcellOemBannerSec, "로고 이미지", "Logo image", "image", MCELL),
  d("mcell.oemBanner.lines", "mcell", mcellOemBannerSec, "본문 (줄바꿈 구분)", "Body (one per line)", "textarea", MCELL),

  // ── MCELL OEM 적용 분야 (3) ──
  ...[0, 1, 2].map((i) => [
    d(`mcell.oemBlocks.${i}.title`, "mcell", mcellOemBlocksSec, `분야 ${i + 1} 제목`, `Field ${i + 1} title`, "text", MCELL),
    d(`mcell.oemBlocks.${i}.subtitle`, "mcell", mcellOemBlocksSec, `분야 ${i + 1} 부제`, `Field ${i + 1} subtitle`, "text", MCELL),
    d(`mcell.oemBlocks.${i}.lines`, "mcell", mcellOemBlocksSec, `분야 ${i + 1} 본문`, `Field ${i + 1} body`, "textarea", MCELL),
    d(`mcell.oemBlocks.${i}.image`, "mcell", mcellOemBlocksSec, `분야 ${i + 1} 이미지`, `Field ${i + 1} image`, "image", MCELL),
  ]).flat(),

  // ── MCELL R&D ──
  d("mcell.rnd.heading", "mcell", mcellRndSec, "헤딩", "Heading", "text", MCELL),
  d("mcell.rnd.title", "mcell", mcellRndSec, "제목", "Title", "text", MCELL),
  d("mcell.rnd.image", "mcell", mcellRndSec, "이미지", "Image", "image", MCELL),

  // ── MCELL 파트너십 실적 ──
  d("mcell.oemProof.heading", "mcell", mcellOemProofSec, "헤딩", "Heading", "text", MCELL),
  d("mcell.oemProof.title", "mcell", mcellOemProofSec, "제목", "Title", "text", MCELL),
  ...[0, 1, 2, 3, 4, 5].map((i) => [
    d(`mcell.proof.${i}.icon`, "mcell", mcellProofSec, `항목 ${i + 1} 아이콘`, `Item ${i + 1} icon`, "image", MCELL),
    d(`mcell.proof.${i}.title`, "mcell", mcellProofSec, `항목 ${i + 1} 제목`, `Item ${i + 1} title`, "text", MCELL),
    d(`mcell.proof.${i}.lines`, "mcell", mcellProofSec, `항목 ${i + 1} 본문`, `Item ${i + 1} body`, "textarea", MCELL),
  ]).flat(),

  // ── ABOUT CEO 인사말 ──
  d("about.ceo.banner.bg", "about", aboutCeoSec, "배너 이미지", "Banner image", "image", ABOUT),
  d("about.ceo.banner.title", "about", aboutCeoSec, "제목", "Title", "text", ABOUT),
  d("about.ceo.banner.quote", "about", aboutCeoSec, "인용구", "Quote", "text", ABOUT),
  d("about.ceo.paragraphs", "about", aboutCeoSec, "본문 (줄바꿈 = 문단 구분)", "Body (one paragraph per line)", "textarea", ABOUT),
  d("about.ceo.signature", "about", aboutCeoSec, "서명", "Signature", "text", ABOUT),

  // ── ABOUT 연혁 (상단 배너 이미지 + 동적 연도 목록) ──
  d("about.historyBanner.bg", "about", aboutHistorySec, "상단 배너 이미지", "Top banner image", "image", ABOUT),
  d("about.history", "about", aboutHistorySec, "연혁 목록", "History list", "historyList", ABOUT),

  // ── ABOUT 인증서 (상단 배너 이미지 + 동적 목록 — JSON: [{"thumb":"...","full":"..."}, ...]) ──
  d("about.certsBanner.bg", "about", aboutCertsSec, "상단 배너 이미지", "Top banner image", "image", ABOUT),
  d("about.certs", "about", aboutCertsSec, "인증서 목록", "Certificates list", "certList", ABOUT),

  // ── ABOUT 문의 배너 ──
  d("about.contact.banner.bg", "about", aboutContactBannerSec, "배경 이미지", "Background image", "image", ABOUT),
  d("about.contact.banner.lines.0", "about", aboutContactBannerSec, "문구 1", "Line 1", "text", ABOUT),
  d("about.contact.banner.lines.1", "about", aboutContactBannerSec, "문구 2", "Line 2", "text", ABOUT),

  // ── ABOUT 오피스 (상단 배너 이미지 + 동적 목록 — JSON: [{"name","mapSrc","tel","email","address"}, ...]) ──
  d("about.contactBanner.bg", "about", aboutOfficesSec, "상단 배너 이미지", "Top banner image", "image", ABOUT),
  d("about.contact.offices", "about", aboutOfficesSec, "오피스 목록", "Offices list", "officeList", ABOUT),

  // ── FOOTER ──
  d("footer.companyName", "footer", footerSec, "회사명 (로고 alt)", "Company name (logo alt)", "text", FOOTER),
  d("footer.address", "footer", footerSec, "본점 주소", "Head office address", "text", FOOTER),
  d("footer.lab", "footer", footerSec, "연구실 주소", "Research lab address", "text", FOOTER),
  d("footer.telPrefix", "footer", footerSec, "전화 접두사", "Tel prefix", "text", FOOTER),
  d("footer.faxPrefix", "footer", footerSec, "팩스 접두사", "Fax prefix", "text", FOOTER),
  d("footer.emailPrefix", "footer", footerSec, "이메일 접두사", "Email prefix", "text", FOOTER),
  d("footer.terms", "footer", footerSec, "이용약관 링크 문구", "Terms link label", "text", FOOTER),
  d("footer.privacy", "footer", footerSec, "개인정보처리방침 링크 문구", "Privacy link label", "text", FOOTER),
];

export const CONTENT_DEF_MAP: Record<string, ContentDef> = Object.fromEntries(
  CONTENT_DEFS.map((def) => [def.key, def]),
);

export const CONTENT_KEYS = CONTENT_DEFS.map((def) => def.key);
export const HOME_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "home").map((def) => def.key);
export const SHOP_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "shop").map((def) => def.key);
export const PARTNERSHIP_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "partnership").map((def) => def.key);
export const MCELL_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "mcell").map((def) => def.key);
export const ABOUT_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "about").map((def) => def.key);
export const FOOTER_CONTENT_KEYS = CONTENT_DEFS.filter((def) => def.group === "footer").map((def) => def.key);

export const MAX_LENGTH: Record<ContentKind, number> = {
  text: 500,
  textarea: 20000,
  image: 2000,
  video: 2000,
  url: 2000,
  historyList: 20000,
  officeList: 20000,
  certList: 20000,
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

