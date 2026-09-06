import Hero from "@/components/home/Hero";
import TechIntro from "@/components/home/TechIntro";
import FeatureGrid from "@/components/home/FeatureGrid";
import LayerCta from "@/components/home/LayerCta";
import Industries from "@/components/home/Industries";
import CertCarousel from "@/components/home/CertCarousel";
import AboutBanner from "@/components/home/AboutBanner";
import Production from "@/components/home/Production";
import HeatFlex from "@/components/home/HeatFlex";
import { getLocale } from "@/i18n/server";
import { getHomeContent } from "@/lib/home-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();
  const c = await getHomeContent(locale);
  return (
    <>
      <Hero slide={c.hero[0]} />
      <TechIntro content={c.tech} />
      <FeatureGrid cards={c.features} />
      <LayerCta content={c.layer} />
      <Industries content={c.industries} />
      <CertCarousel content={c.certs} />
      <AboutBanner content={c.aboutBanner} />
      <Production content={c.production} />
      <HeatFlex content={c.heatFlex} />
    </>
  );
}
