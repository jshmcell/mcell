/**
 * 영어 기본 문구 — 데이터 파일(data/home.ts, shop.ts, partnership.ts) 한국어 기본값의 EN 사본.
 * 키 = 콘텐츠 레지스트리 키. 미디어(image/video/url) 키는 언어 무관이라 여기에 없음.
 * EN 사전에 없는 키는 한국어 기본값으로 폴백한다.
 */

export const EN_HOME: Record<string, string> = {
  // Hero
  "home.hero.title": "Leading industrial innovation with smart heating technology.",
  "home.hero.titleMobile": "Leading industrial innovation\nwith smart heating technology.",
  "home.hero.description":
    "Thinner, lighter and safer heat-transfer structures deliver high-efficiency energy solutions.",
  "home.hero.descriptionMobile":
    "Thinner, lighter and safer heat-transfer structures\ndeliver high-efficiency energy solutions.",

  // Tech intro
  "home.techIntro.title": "Technology drives energy innovation",
  "home.techIntro.lines":
    "By applying carbon nanotube ink technology directly to textiles,\nwe go beyond the limits of conventional film-based methods.",

  // Feature cards
  "home.features.0.title": "Highly dispersible CNT composite ink",
  "home.features.0.lines": "Uniform particle dispersion\nensures stable conductivity",
  "home.features.1.title": "Precision printing process",
  "home.features.1.lines": "Supports a variety of printing methods\nincluding screen, dispensing and spray",
  "home.features.2.title": "Ultra-thin heating element design",
  "home.features.2.lines": "Flexible structure under 1mm thick\nadapts to a wide range of curved surfaces",
  "home.features.3.title": "Smart temperature control",
  "home.features.3.lines": "Rapid heating and precise temperature holding\nimprove energy efficiency",
  "home.features.4.title": "TPU protective film",
  "home.features.4.lines": "Protects the heating layer\nand prevents insulation failure",
  "home.features.5.title": "Conductive fabric electrode",
  "home.features.5.lines": "Electrodes built on precisely designed,\nhigh-tensile conductive fabric",
  "home.features.6.title": "CNT coating layer",
  "home.features.6.lines": "Nano composite ink coated\nwith uniform dispersion",
  "home.features.7.title": "Self-assembled monolayer fiber structure",
  "home.features.7.lines": "Secures heating efficiency\nand durability at the same time",

  // Layer CTA
  "home.layer.title": "Raising heating quality with CNT ink coating technology",
  "home.layer.titleMobile": "Raising heating quality\nwith CNT ink coating technology",
  "home.layer.lines":
    "MCELL forms a self-assembled monolayer on the textile, then\nbuilds the heating layer by precisely adsorbing carbon nanotube ink.",
  "home.layer.linesMobile":
    "MCELL forms a self-assembled monolayer on the textile, then builds the heating layer by precisely adsorbing carbon nanotube ink.",
  "home.layer.ctaLabel": "Explore our technology →",

  // Industries
  "home.industries.title": "A flexible structure applicable across",
  "home.industries.subtitle": "a wide range of industries",

  // Certifications
  "home.certs.title": "Proven by papers and patents",
  "home.certs.description":
    "MCELL's technology is validated through domestic and international patent filings and registrations, as well as SCI-indexed publications.",

  // About banner
  "home.aboutBanner.title": "MCELL's competitive edge: bridging technology and market",
  "home.aboutBanner.description":
    "MCELL delivers high-quality material solutions through heating and insulation technology.",

  // Production
  "home.production.title": "In-house production facilities",
  "home.production.description":
    "We operate a production system with stable quality and mass-production capacity.",
  "home.production.0.title": "Roll-to-roll CNT coating line completed",
  "home.production.0.lines":
    "We built our own roll-to-roll process system, enabling mass production\nwith a smart dispensing inspection system\nthat maintains uniform quality.",
  "home.production.1.title": "Anseong plant registered in Gyeonggi Province",
  "home.production.1.lines":
    "We established a dedicated production line in Anseong, Gyeonggi Province,\nstrengthening the stability of material supply\nand quality control.",
  "home.production.2.title": "ISO 9001 quality certification",
  "home.production.2.lines":
    "Certified with the international quality management system (ISO 9001)\nacross the entire production process, our system\nsatisfies both sustainable quality control and customer trust.",

  // HEAT FLEX
  "home.heatFlex.title": "Discover MCELL HEAT FLEX technology",
  "home.heatFlex.lines":
    "HEAT FLEX is a smart heating textile built on MCELL's core technology.\nHigh efficiency, low power and high reliability bring new value to a wide range of industries.",
  "home.heatFlex.ctaLabel": "Partnership & inquiries →",
};

export const EN_SHOP: Record<string, string> = {
  "shop.hero.title": "SHOP",
  "shop.hero.description": "Explore a range of products powered by MCELL technology.",
  "shop.product.0.name": "Heated Vest",
  "shop.product.1.name": "Heated Eye Mask",
  "shop.product.2.name": "Heated Blanket",
};

export const EN_PARTNERSHIP: Record<string, string> = {
  "partnership.heading": "PARTNERSHIP INQUIRY",
  "partnership.title": "Build new technology value together with MCELL.",
  "partnership.lines":
    "From material development to co-designed products, sample testing and mass-production readiness, we propose a collaboration structure tailored to your goals —\nas a partner with proven technology and execution.",
};

/**
 * mcell(/mcell, /mcell/oem-odm) 영어 기본 문구.
 * 현재 mcell 페이지/컴포넌트에는 EN 분기가 없어(전부 한국어 정적 콘텐츠) 빈 사전으로 시작한다.
 * EN 사전에 없는 키는 한국어 기본값으로 폴백한다 — 번역 추가 시 여기에 키를 채우면 된다.
 */
export const EN_MCELL: Record<string, string> = {};

/**
 * about(/about, /about/history, /about/certifications, /about/contact) 영어 기본 문구.
 * 현재 about 페이지/컴포넌트에는 EN 분기가 없어(전부 한국어 정적 콘텐츠) 빈 사전으로 시작한다.
 * EN 사전에 없는 키는 한국어 기본값으로 폴백한다 — 번역 추가 시 여기에 키를 채우면 된다.
 */
export const EN_ABOUT: Record<string, string> = {};
