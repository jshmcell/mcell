import type { Locale } from "@/i18n/config";
import {
  aboutBanner as dAboutBanner,
  certifications as dCerts,
  featureCards as dFeatures,
  heatFlex as dHeatFlex,
  heroSlides as dHero,
  industries as dIndustries,
  layerSection as dLayer,
  production as dProduction,
  techIntro as dTech,
  type FeatureCard,
} from "@/data/home";
import { pickLines, pickText, type ContentRows } from "@/lib/content-resolve";
import { EN_HOME } from "@/data/content-en";

/** DB/드래프트 오버라이드가 적용된 홈 데이터 — data/home.ts 와 동일한 shape. */
export interface ResolvedHome {
  hero: typeof dHero;
  tech: typeof dTech;
  features: FeatureCard[];
  layer: typeof dLayer;
  industries: typeof dIndustries;
  certs: typeof dCerts;
  aboutBanner: typeof dAboutBanner;
  production: typeof dProduction;
  heatFlex: typeof dHeatFlex;
}

/** 순수 함수 — 서버(home-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용.
 *  collect 를 넘기면 키 → 적용된 기본/오버라이드 값 맵이 채워진다 (관리자 placeholder 용). */
export function resolveHomeFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedHome {
  // EN 사전(data/content-en.ts) → 한국어 기본값 → DB 오버라이드 순으로 결정
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_HOME[key] ?? fallback) : fallback;
  const fbLines = (key: string, fallback: string[]) =>
    locale === "en" && EN_HOME[key] ? EN_HOME[key].split(/\r?\n/) : fallback;
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback));
    collect?.set(key, v);
    return v;
  };
  const l = (key: string, fallback: string[]) => {
    const v = pickLines(rows, key, locale, fbLines(key, fallback));
    collect?.set(key, v.join("\n"));
    return v;
  };

  const s0 = dHero[0];
  const hero = [
    {
      ...s0,
      bg: t("home.hero.bg", s0.bg),
      bgMobile: t("home.hero.bgMobile", s0.bgMobile ?? s0.bg),
      logo: t("home.hero.logo", s0.logo),
      tagline: t("home.hero.tagline", s0.tagline),
      title: t("home.hero.title", s0.title),
      titleMobile: t("home.hero.titleMobile", s0.titleMobile ?? s0.title),
      description: t("home.hero.description", s0.description),
      descriptionMobile: t(
        "home.hero.descriptionMobile",
        s0.descriptionMobile ?? s0.description,
      ),
    },
  ];

  const tech = {
    ...dTech,
    bg: t("home.techIntro.bg", dTech.bg),
    photo: t("home.techIntro.photo", dTech.photo),
    title: t("home.techIntro.title", dTech.title),
    lines: l("home.techIntro.lines", dTech.lines),
    image: t("home.techIntro.image", dTech.image),
  };

  const features = dFeatures.map((c, i) => ({
    ...c,
    title: t(`home.features.${i}.title`, c.title),
    lines: l(`home.features.${i}.lines`, c.lines),
  }));

  const layer = {
    ...dLayer,
    bg: t("home.layer.bg", dLayer.bg),
    title: t("home.layer.title", dLayer.title),
    titleMobile: t("home.layer.titleMobile", dLayer.titleMobile),
    lines: l("home.layer.lines", dLayer.lines),
    linesMobile: l("home.layer.linesMobile", dLayer.linesMobile),
    cta: {
      label: t("home.layer.ctaLabel", dLayer.cta.label),
      href: t("home.layer.ctaHref", dLayer.cta.href),
    },
  };

  const industries = {
    ...dIndustries,
    title: t("home.industries.title", dIndustries.title),
    subtitle: t("home.industries.subtitle", dIndustries.subtitle),
    items: dIndustries.items.map((item, i) => ({
      ...item,
      label: t(`home.industries.${i}.label`, item.label),
      thumb: t(`home.industries.${i}.thumb`, item.thumb),
      image: t(`home.industries.${i}.image`, item.image),
    })),
  };

  const certs = {
    ...dCerts,
    title: t("home.certs.title", dCerts.title),
    description: l("home.certs.description", dCerts.description),
    images: dCerts.images.map((img, i) => ({
      thumb: t(`home.certs.${i}.thumb`, img.thumb),
      full: t(`home.certs.${i}.full`, img.full),
    })),
  };

  const aboutBanner = {
    ...dAboutBanner,
    bg: t("home.aboutBanner.bg", dAboutBanner.bg),
    title: t("home.aboutBanner.title", dAboutBanner.title),
    description: t("home.aboutBanner.description", dAboutBanner.description),
    cta: {
      label: t("home.aboutBanner.ctaLabel", dAboutBanner.cta.label),
      href: t("home.aboutBanner.ctaHref", dAboutBanner.cta.href),
    },
  };

  const production = {
    ...dProduction,
    title: t("home.production.title", dProduction.title),
    description: t("home.production.description", dProduction.description),
    cards: dProduction.cards.map((card, i) => ({
      ...card,
      icon: t(`home.production.${i}.icon`, card.icon),
      title: t(`home.production.${i}.title`, card.title),
      lines: l(`home.production.${i}.lines`, card.lines),
    })),
  };

  const heatFlex = {
    ...dHeatFlex,
    bg: t("home.heatFlex.bg", dHeatFlex.bg),
    logo: t("home.heatFlex.logo", dHeatFlex.logo),
    title: t("home.heatFlex.title", dHeatFlex.title),
    lines: l("home.heatFlex.lines", dHeatFlex.lines),
    cta: {
      label: t("home.heatFlex.ctaLabel", dHeatFlex.cta.label),
      href: t("home.heatFlex.ctaHref", dHeatFlex.cta.href),
    },
  };

  return { hero, tech, features, layer, industries, certs, aboutBanner, production, heatFlex };
}

/** 홈 섹션 식별자 — 관리자 미리보기에서 섹션 → resolveHome 필드 매핑용. */
export type HomeSectionKey =
  | "hero"
  | "tech"
  | "features"
  | "layer"
  | "industries"
  | "certs"
  | "aboutBanner"
  | "production"
  | "heatFlex";

/** 콘텐츠 키 prefix → 홈 섹션. */
export function homeSectionOfKey(key: string): HomeSectionKey | null {
  if (key.startsWith("home.hero.")) return "hero";
  if (key.startsWith("home.techIntro.")) return "tech";
  if (key.startsWith("home.features.")) return "features";
  if (key.startsWith("home.layer.")) return "layer";
  if (key.startsWith("home.industries.")) return "industries";
  if (key.startsWith("home.certs.")) return "certs";
  if (key.startsWith("home.aboutBanner.")) return "aboutBanner";
  if (key.startsWith("home.production.")) return "production";
  if (key.startsWith("home.heatFlex.")) return "heatFlex";
  return null;
}
