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
import type { Locale } from "@/i18n/config";
import type { ResolvedHome } from "@/lib/home-content-resolve";
import type { ResolvedShopHero } from "@/lib/shop-content-resolve";
import type { ShopProduct } from "@/data/shop";

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
