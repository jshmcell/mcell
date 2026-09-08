"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Hero from "@/components/home/Hero";
import TechIntro from "@/components/home/TechIntro";
import FeatureGrid from "@/components/home/FeatureGrid";
import LayerCta from "@/components/home/LayerCta";
import Industries from "@/components/home/Industries";
import CertCarousel from "@/components/home/CertCarousel";
import AboutBanner from "@/components/home/AboutBanner";
import Production from "@/components/home/Production";
import HeatFlex from "@/components/home/HeatFlex";
import ShopHero from "@/components/shop/ShopHero";
import ShopGrid from "@/components/shop/ShopGrid";
import McellHero from "@/components/mcell/Hero";
import Stats from "@/components/mcell/Stats";
import TechLayers from "@/components/mcell/TechLayers";
import Products from "@/components/mcell/Products";
import Comparisons from "@/components/mcell/Comparisons";
import McellIndustries from "@/components/mcell/Industries";
import Cooperation from "@/components/mcell/Cooperation";
import Platform from "@/components/mcell/Platform";
import OemBanner from "@/components/mcell/oem/OemBanner";
import OemBlocks from "@/components/mcell/oem/OemBlocks";
import OemRnd from "@/components/mcell/oem/OemRnd";
import OemProof from "@/components/mcell/oem/OemProof";
import CeoIntro from "@/components/about/CeoIntro";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import ContactBanner from "@/components/about/ContactBanner";
import ContactOffices from "@/components/about/ContactOffices";
import CertGallery from "@/components/subpage/CertGallery";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import type { Locale } from "@/i18n/config";
import type { ResolvedHome } from "@/lib/home-content-resolve";
import type { ResolvedShopHero } from "@/lib/shop-content-resolve";
import type { ShopProduct } from "@/data/shop";
import type {
  ResolvedMcell,
  ResolvedMcellOem,
} from "@/lib/mcell-content-resolve";
import type {
  ResolvedAbout,
  ResolvedAboutHistory,
  ResolvedAboutCertifications,
  ResolvedAboutContact,
} from "@/lib/about-content-resolve";

/** Renders children at the real desktop width (1280px container) scaled down
 *  to fit the preview column, so the preview is a true WYSIWYG thumbnail of
 *  the big-screen layout. */
function ScaledDesktop({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [innerH, setInnerH] = useState(0);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      setScale(Math.min(1, outer.clientWidth / 1280));
      setInnerH(inner.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      className="overflow-hidden"
      style={{ height: innerH ? innerH * scale : undefined }}
    >
      <div
        ref={innerRef}
        className="pointer-events-none"
        style={{
          width: 1280,
          transform: scale ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function HeroPreview({ hero }: { hero: ResolvedHome["hero"][number] }) {
  return (
    <ScaledDesktop>
      <Hero slide={hero} />
    </ScaledDesktop>
  );
}

function TechPreview({ tech }: { tech: ResolvedHome["tech"] }) {
  return (
    <ScaledDesktop>
      <TechIntro content={tech} />
    </ScaledDesktop>
  );
}

function FeaturesPreview({ cards }: { cards: ResolvedHome["features"] }) {
  return (
    <ScaledDesktop>
      <FeatureGrid cards={cards} />
    </ScaledDesktop>
  );
}

function LayerPreview({
  layer,
  locale,
}: {
  layer: ResolvedHome["layer"];
  locale: Locale;
}) {
  return (
    <ScaledDesktop>
      <LayerCta content={layer} locale={locale} />
    </ScaledDesktop>
  );
}

function IndustriesPreview({
  industries,
  locale,
}: {
  industries: ResolvedHome["industries"];
  locale: Locale;
}) {
  return (
    <ScaledDesktop>
      <Industries content={industries} locale={locale} />
    </ScaledDesktop>
  );
}

function CertsPreview({ certs }: { certs: ResolvedHome["certs"] }) {
  return (
    <ScaledDesktop>
      <CertCarousel content={certs} />
    </ScaledDesktop>
  );
}

function AboutBannerPreview({
  banner,
  locale,
}: {
  banner: ResolvedHome["aboutBanner"];
  locale: Locale;
}) {
  return (
    <ScaledDesktop>
      <AboutBanner content={banner} locale={locale} />
    </ScaledDesktop>
  );
}

function ProductionPreview({ production }: { production: ResolvedHome["production"] }) {
  return (
    <ScaledDesktop>
      <Production content={production} />
    </ScaledDesktop>
  );
}

function HeatFlexPreview({
  heatFlex,
  locale,
}: {
  heatFlex: ResolvedHome["heatFlex"];
  locale: Locale;
}) {
  return (
    <ScaledDesktop>
      <HeatFlex content={heatFlex} locale={locale} />
    </ScaledDesktop>
  );
}

export function HomeSectionPreview({
  section,
  home,
  locale,
}: {
  section: ResolvedHome[keyof ResolvedHome] extends never ? never : keyof ResolvedHome;
  home: ResolvedHome;
  locale: Locale;
}) {
  switch (section) {
    case "hero":
      return <HeroPreview hero={home.hero[0]} />;
    case "tech":
      return <TechPreview tech={home.tech} />;
    case "features":
      return <FeaturesPreview cards={home.features} />;
    case "layer":
      return <LayerPreview layer={home.layer} locale={locale} />;
    case "industries":
      return <IndustriesPreview industries={home.industries} locale={locale} />;
    case "certs":
      return <CertsPreview certs={home.certs} />;
    case "aboutBanner":
      return <AboutBannerPreview banner={home.aboutBanner} locale={locale} />;
    case "production":
      return <ProductionPreview production={home.production} />;
    case "heatFlex":
      return <HeatFlexPreview heatFlex={home.heatFlex} locale={locale} />;
  }
}

export function ShopHeroPreview({ hero }: { hero: ResolvedShopHero }) {
  return (
    <ScaledDesktop>
      <ShopHero content={hero} />
    </ScaledDesktop>
  );
}

export function ShopProductsPreview({ products }: { products: ShopProduct[] }) {
  return (
    <ScaledDesktop>
      <ShopGrid products={products} />
    </ScaledDesktop>
  );
}

/* ── MCELL (기술력 소개 /mcell + OEM/ODM /mcell/oem-odm) ──────────────── */

function McellHeroPreview({ hero }: { hero: ResolvedMcell["hero"] }) {
  return (
    <ScaledDesktop>
      <McellHero content={hero} />
    </ScaledDesktop>
  );
}

function McellStatsPreview({ stats }: { stats: ResolvedMcell["stats"] }) {
  return (
    <ScaledDesktop>
      <Stats content={stats} />
    </ScaledDesktop>
  );
}

function McellTechPreview({ tech }: { tech: ResolvedMcell["tech"] }) {
  return (
    <ScaledDesktop>
      <TechLayers content={tech} />
    </ScaledDesktop>
  );
}

function McellProductsPreview({ products }: { products: ResolvedMcell["products"] }) {
  return (
    <ScaledDesktop>
      <Products content={products} />
    </ScaledDesktop>
  );
}

function McellComparisonsPreview({ comparisons }: { comparisons: ResolvedMcell["comparisons"] }) {
  return (
    <ScaledDesktop>
      <Comparisons content={comparisons} />
    </ScaledDesktop>
  );
}

function McellIndustriesPreview({ industries }: { industries: ResolvedMcell["industries"] }) {
  return (
    <ScaledDesktop>
      <McellIndustries content={industries} />
    </ScaledDesktop>
  );
}

function McellCooperationPreview({ cooperation }: { cooperation: ResolvedMcell["cooperation"] }) {
  return (
    <ScaledDesktop>
      <Cooperation content={cooperation} />
    </ScaledDesktop>
  );
}

function McellPlatformPreview({ platform }: { platform: ResolvedMcell["platform"] }) {
  return (
    <ScaledDesktop>
      <Platform content={platform} />
    </ScaledDesktop>
  );
}

function OemBannerPreview({ oemBanner }: { oemBanner: ResolvedMcellOem["oemBanner"] }) {
  return (
    <ScaledDesktop>
      <OemBanner content={oemBanner} />
    </ScaledDesktop>
  );
}

function OemBlocksPreview({ oemBlocks }: { oemBlocks: ResolvedMcellOem["oemBlocks"] }) {
  return (
    <ScaledDesktop>
      <OemBlocks content={oemBlocks} />
    </ScaledDesktop>
  );
}

function OemRndPreview({ rnd }: { rnd: ResolvedMcellOem["rnd"] }) {
  return (
    <ScaledDesktop>
      <OemRnd content={rnd} />
    </ScaledDesktop>
  );
}

function OemProofPreview({
  oemProof,
  proof,
}: {
  oemProof: ResolvedMcellOem["oemProof"];
  proof: ResolvedMcellOem["proof"];
}) {
  return (
    <ScaledDesktop>
      <OemProof content={oemProof} proof={proof} />
    </ScaledDesktop>
  );
}

/** /mcell과 /mcell/oem-odm 두 페이지의 섹션 → 실제 컴포넌트 미리보기. */
export function McellSectionPreview({
  section,
  mcell,
  oem,
}: {
  section: keyof ResolvedMcell | keyof ResolvedMcellOem;
  mcell: ResolvedMcell;
  oem: ResolvedMcellOem;
}) {
  switch (section) {
    case "hero":
      return <McellHeroPreview hero={mcell.hero} />;
    case "stats":
      return <McellStatsPreview stats={mcell.stats} />;
    case "tech":
      return <McellTechPreview tech={mcell.tech} />;
    case "products":
      return <McellProductsPreview products={mcell.products} />;
    case "comparisons":
      return <McellComparisonsPreview comparisons={mcell.comparisons} />;
    case "industries":
      return <McellIndustriesPreview industries={mcell.industries} />;
    case "cooperation":
      return <McellCooperationPreview cooperation={mcell.cooperation} />;
    case "platform":
      return <McellPlatformPreview platform={mcell.platform} />;
    case "oemBanner":
      return <OemBannerPreview oemBanner={oem.oemBanner} />;
    case "oemBlocks":
      return <OemBlocksPreview oemBlocks={oem.oemBlocks} />;
    case "rnd":
      return <OemRndPreview rnd={oem.rnd} />;
    case "oemProof":
      return <OemProofPreview oemProof={oem.oemProof} proof={oem.proof} />;
  }
}

/* ── ABOUT (/about, /about/history, /about/certifications, /about/contact) ── */

function CeoIntroPreview({ ceo }: { ceo: ResolvedAbout["ceo"] }) {
  return (
    <ScaledDesktop>
      <CeoIntro content={ceo} />
    </ScaledDesktop>
  );
}

function CeoContactBannerPreview({ contact, locale }: { contact: ResolvedAboutContact["contact"]; locale: Locale }) {
  return (
    <ScaledDesktop>
      <ContactBanner content={contact} locale={locale} />
    </ScaledDesktop>
  );
}

function AboutHistoryPreview({ history }: { history: ResolvedAboutHistory }) {
  return (
    <ScaledDesktop>
      <SubPageBanner image={history.banner} overlay />
      <HistoryTimeline content={history} />
    </ScaledDesktop>
  );
}

function AboutCertsPreview({ certifications }: { certifications: ResolvedAboutCertifications }) {
  return (
    <ScaledDesktop>
      <SubPageBanner image={certifications.banner} overlay />
      <CertGallery items={certifications.certifications} />
    </ScaledDesktop>
  );
}

function AboutContactOfficesPreview({ contact }: { contact: ResolvedAboutContact }) {
  return (
    <ScaledDesktop>
      <SubPageBanner image={contact.banner} overlay />
      <ContactOffices content={contact.contact} />
    </ScaledDesktop>
  );
}

/** about 그룹 4개 페이지(/about, /history, /certifications, /contact)의 섹션 → 실제 컴포넌트 미리보기. */
export function AboutSectionPreview({
  section,
  about,
  history,
  certifications,
  contact,
  locale,
}: {
  section:
    | keyof ResolvedAbout
    | keyof ResolvedAboutHistory
    | "contactBanner"
    | keyof ResolvedAboutCertifications
    | keyof ResolvedAboutContact;
  about: ResolvedAbout;
  history: ResolvedAboutHistory | null;
  certifications: ResolvedAboutCertifications | null;
  contact: ResolvedAboutContact | null;
  locale: Locale;
}) {
  switch (section) {
    case "ceo":
      return <CeoIntroPreview ceo={about.ceo} />;
    case "history":
      return history ? <AboutHistoryPreview history={history} /> : null;
    case "historyImages":
      return history ? <AboutHistoryPreview history={history} /> : null;
    case "certifications":
      return certifications ? <AboutCertsPreview certifications={certifications} /> : null;
    case "contactBanner":
      return contact ? <CeoContactBannerPreview contact={contact.contact} locale={locale} /> : null;
    case "contact":
      return contact ? <AboutContactOfficesPreview contact={contact} /> : null;
  }
}
