import type { Locale } from "@/i18n/config";
import {
  hero as dHero,
  stats as dStats,
  tech as dTech,
  products as dProducts,
  comparisons as dComparisons,
  platform as dPlatform,
  industries as dIndustries,
  cooperation as dCooperation,
  oemBanner as dOemBanner,
  oemBlocks as dOemBlocks,
  rnd as dRnd,
  oemProof as dOemProof,
  proof as dProof,
  type Stat,
  type Product,
  type Comparison,
  type OemBlock,
  type ProofItem,
} from "@/data/mcell";
import { pickLines, pickText, type ContentRows } from "@/lib/content-resolve";
import { EN_MCELL } from "@/data/content-en";

/** DB/드래프트 오버라이드가 적용된 mcell 데이터 — data/mcell.ts 와 동일한 shape. */
export interface ResolvedMcell {
  hero: typeof dHero;
  stats: Stat[];
  tech: typeof dTech;
  products: Product[];
  comparisons: Comparison[];
  platform: typeof dPlatform;
  industries: typeof dIndustries;
  cooperation: typeof dCooperation;
}

/** DB/드래프트 오버라이드가 적용된 mcell OEM/ODM 데이터 — data/mcell.ts 와 동일한 shape. */
export interface ResolvedMcellOem {
  oemBanner: typeof dOemBanner;
  oemBlocks: OemBlock[];
  rnd: typeof dRnd;
  oemProof: typeof dOemProof;
  proof: ProofItem[];
}

/** 순수 함수 — 서버(mcell-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용.
 *  collect 를 넘기면 키 → 적용된 기본/오버라이드 값 맵이 채워진다 (관리자 placeholder 용). */
export function resolveMcellFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedMcell {
  // EN 사전(data/content-en.ts) → 한국어 기본값 → DB 오버라이드 순으로 결정
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_MCELL[key] ?? fallback) : fallback;
  const fbLines = (key: string, fallback: string[]) =>
    locale === "en" && EN_MCELL[key] ? EN_MCELL[key].split(/\r?\n/) : fallback;
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

  const hero = {
    ...dHero,
    bg: t("mcell.hero.bg", dHero.bg),
    title: t("mcell.hero.title", dHero.title),
    description: t("mcell.hero.description", dHero.description),
    logo: t("mcell.hero.logo", dHero.logo),
    strip: t("mcell.hero.strip", dHero.strip),
  };

  const stats = dStats.map((s, i) => ({
    ...s,
    label: t(`mcell.stats.${i}.label`, s.label),
    value: t(`mcell.stats.${i}.value`, s.value),
    note: t(`mcell.stats.${i}.note`, s.note),
  }));

  const tech = {
    ...dTech,
    bg: t("mcell.tech.bg", dTech.bg),
    heading: t("mcell.tech.heading", dTech.heading),
    title: t("mcell.tech.title", dTech.title),
    description: t("mcell.tech.description", dTech.description),
    image: t("mcell.tech.image", dTech.image),
    layers: dTech.layers.map((layer, i) => ({
      ...layer,
      title: t(`mcell.tech.layers.${i}.title`, layer.title),
      lines: l(`mcell.tech.layers.${i}.lines`, layer.lines),
    })),
  };

  const products = dProducts.map((p, i) => ({
    ...p,
    name: t(`mcell.products.${i}.name`, p.name),
    thumb: t(`mcell.products.${i}.thumb`, p.thumb),
    image: t(`mcell.products.${i}.image`, p.image),
    description: t(`mcell.products.${i}.description`, p.description),
  }));

  const comparisons = dComparisons.map((c, i) => ({
    ...c,
    image: t(`mcell.comparisons.${i}.image`, c.image),
    heading: t(`mcell.comparisons.${i}.heading`, c.heading),
    subheading: t(`mcell.comparisons.${i}.subheading`, c.subheading),
    description: t(`mcell.comparisons.${i}.description`, c.description),
    competitorTitle: t(`mcell.comparisons.${i}.competitorTitle`, c.competitorTitle),
    competitorLogo: t(`mcell.comparisons.${i}.competitorLogo`, c.competitorLogo),
    competitorLines: l(`mcell.comparisons.${i}.competitorLines`, c.competitorLines),
    oursTitle: t(`mcell.comparisons.${i}.oursTitle`, c.oursTitle),
    oursLogo: t(`mcell.comparisons.${i}.oursLogo`, c.oursLogo),
    oursLines: l(`mcell.comparisons.${i}.oursLines`, c.oursLines),
  }));

  const platform = {
    ...dPlatform,
    heading: t("mcell.platform.heading", dPlatform.heading),
    title: t("mcell.platform.title", dPlatform.title),
    description: t("mcell.platform.description", dPlatform.description),
    image: t("mcell.platform.image", dPlatform.image),
    banner: t("mcell.platform.banner", dPlatform.banner),
  };

  const industries = {
    ...dIndustries,
    heading: t("mcell.industries.heading", dIndustries.heading),
    title: t("mcell.industries.title", dIndustries.title),
    description: t("mcell.industries.description", dIndustries.description),
    image: t("mcell.industries.image", dIndustries.image),
  };

  const cooperation = {
    ...dCooperation,
    heading: t("mcell.cooperation.heading", dCooperation.heading),
    title: t("mcell.cooperation.title", dCooperation.title),
    description: t("mcell.cooperation.description", dCooperation.description),
    slides: dCooperation.slides.map((slide, i) =>
      t(`mcell.cooperation.slides.${i}`, slide),
    ),
  };

  return { hero, stats, tech, products, comparisons, platform, industries, cooperation };
}

/** 순수 함수 — 서버(mcell-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용. */
export function resolveMcellOemFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedMcellOem {
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_MCELL[key] ?? fallback) : fallback;
  const fbLines = (key: string, fallback: string[]) =>
    locale === "en" && EN_MCELL[key] ? EN_MCELL[key].split(/\r?\n/) : fallback;
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

  const oemBanner = {
    ...dOemBanner,
    bg: t("mcell.oemBanner.bg", dOemBanner.bg),
    logo: t("mcell.oemBanner.logo", dOemBanner.logo),
    lines: l("mcell.oemBanner.lines", dOemBanner.lines),
  };

  const oemBlocks = dOemBlocks.map((b, i) => ({
    ...b,
    title: t(`mcell.oemBlocks.${i}.title`, b.title),
    subtitle: t(`mcell.oemBlocks.${i}.subtitle`, b.subtitle),
    lines: l(`mcell.oemBlocks.${i}.lines`, b.lines),
    image: t(`mcell.oemBlocks.${i}.image`, b.image),
  }));

  const rnd = {
    ...dRnd,
    heading: t("mcell.rnd.heading", dRnd.heading),
    title: t("mcell.rnd.title", dRnd.title),
    image: t("mcell.rnd.image", dRnd.image),
  };

  const oemProof = {
    ...dOemProof,
    heading: t("mcell.oemProof.heading", dOemProof.heading),
    title: t("mcell.oemProof.title", dOemProof.title),
  };

  const proof = dProof.map((p, i) => ({
    ...p,
    icon: t(`mcell.proof.${i}.icon`, p.icon),
    title: t(`mcell.proof.${i}.title`, p.title),
    lines: l(`mcell.proof.${i}.lines`, p.lines),
  }));

  return { oemBanner, oemBlocks, rnd, oemProof, proof };
}
