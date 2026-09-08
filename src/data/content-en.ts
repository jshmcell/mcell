/**
 * 영어 기본 문구 — 데이터 파일(data/home.ts, shop.ts, partnership.ts) 한국어 기본값의 EN 사본.
 * 키 = 콘텐츠 레지스트리 키. 미디어(image/video/url) 키는 언어 무관이라 여기에 없음.
 * EN 사전에 없는 키는 한국어 기본값으로 폴백한다.
 */

export const EN_HOME: Record<string, string> = {
  // Hero
  "home.hero.tagline": "Empower Heat, Shape Innovation",
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
  "home.industries.0.label": "Mobility",
  "home.industries.1.label": "Wearable & Fashion",
  "home.industries.2.label": "Home Living",

  // Certifications
  "home.certs.title": "Proven by papers and patents",
  "home.certs.description":
    "MCELL's technology is validated through domestic and international patent filings and registrations, as well as SCI-indexed publications.",

  // About banner
  "home.aboutBanner.title": "MCELL's competitive edge: bridging technology and market",
  "home.aboutBanner.description":
    "MCELL delivers high-quality material solutions through heating and insulation technology.",
  "home.aboutBanner.ctaLabel": "About company →",

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
 * EN 사전에 없는 키는 한국어 기본값으로 폴백한다.
 */
export const EN_MCELL: Record<string, string> = {
  // Hero
  "mcell.hero.title": "MCELL, the innovation of smart heating technology",
  "mcell.hero.description":
    "Technology that combines efficiency and eco-friendliness for a better future",

  // Stats
  "mcell.stats.0.label": "Total investment raised",
  "mcell.stats.0.value": "KRW 1.25 billion",
  "mcell.stats.0.note": "Participation of major investors",
  "mcell.stats.1.label": "Government support",
  "mcell.stats.1.value": "KRW 1.2 billion",
  "mcell.stats.1.note": "10 government R&D projects in total",
  "mcell.stats.2.label": "R&D investment",
  "mcell.stats.2.value": "KRW 5.26 billion",
  "mcell.stats.2.note": "Continuous investment in technology innovation",
  "mcell.stats.3.label": "New partners",
  "mcell.stats.3.value": "13 companies in total",
  "mcell.stats.3.note": "Participation of major investors",

  // Tech
  "mcell.tech.heading": "Core technology",
  "mcell.tech.title": "HeatFlex, smart heating textile technology",
  "mcell.tech.description":
    "Carbon nanotube conductive ink coating delivers a high-efficiency, high-durability heating system.",
  "mcell.tech.layers.0.title": "TPU protective film",
  "mcell.tech.layers.0.lines":
    "A TPU protective film is coated over the heating layer\nto insulate the heating fiber surface and prevent delamination",
  "mcell.tech.layers.1.title": "Conductive yarn electrode",
  "mcell.tech.layers.1.lines":
    "Made with high-tensile conductive yarn for excellent durability\nwith a computer-designed, highly integrated electrode layout",
  "mcell.tech.layers.2.title": "Carbon nano coating",
  "mcell.tech.layers.2.lines":
    "Adsorbed between the fibers for excellent durability\nmaintaining elasticity, recovery and heating efficiency even under deformation",
  "mcell.tech.layers.3.title": "Self-assembled monolayer",
  "mcell.tech.layers.3.lines":
    "Improves the bond between fiber and heating layer and the durability of the heating fiber",

  // Products
  "mcell.products.0.name": "Heated Eye Mask",
  "mcell.products.0.description":
    "The heated eye mask applies HEAT-FLEX planar heating technology. Far-infrared heat works gently on sensitive skin around the eyes, providing comfortable eye care during rest and sleep.",
  "mcell.products.1.name": "Heated Band",
  "mcell.products.1.description":
    "A flexible textile integrated with a high-efficiency heating material. It conforms to moving areas such as the abdomen and lower back, delivering heat transfer specialized for local pain relief and body temperature maintenance.",
  "mcell.products.2.name": "Heated Blanket",
  "mcell.products.2.description":
    "The HEAT-FLEX blanket delivers uniform heating across a wide area. Its low-power, high-efficiency structure offers powerful warmth that can replace indoor heating, with safe circuits and a soft feel for peace of mind.",
  "mcell.products.3.name": "Heated Vest",
  "mcell.products.3.description":
    "A heated vest that integrates HEAT-FLEX fiber into fashion wear. It maintains a steady temperature during outdoor activity while offering flexibility and breathability for both mobility and style.",
  "mcell.products.4.name": "Heated Cushion",
  "mcell.products.4.description":
    "A heated cushion with a HEAT-FLEX heating layer across the entire surface. Optimized for lower-body warmth with fast preheating and heat retention, it works reliably in cars, offices and other environments.",
  "mcell.products.5.name": "Heated Pad",
  "mcell.products.5.description":
    "The HEAT-FLEX pad conforms to the body's curves and can be applied to the abdomen, shoulders, legs and more. Precisely controlled heating delivers scientifically proven heat therapy effects.",

  // Comparisons
  "mcell.comparisons.0.heading": "Technology performance comparison",
  "mcell.comparisons.0.subheading": "Technology that leads on every criterion",
  "mcell.comparisons.0.description":
    "Clear performance differences are proven even under identical conditions.",
  "mcell.comparisons.0.competitorTitle": "Competitor heated cushion",
  "mcell.comparisons.0.competitorLines":
    "Typical competitor products use wire or linear-pattern methods, causing large temperature differences between heated and unheated areas.\nThis leads to uneven heat distribution, concentrated overheating and energy loss, which can result in inconsistent body temperature and reduced stability depending on the environment.",
  "mcell.comparisons.0.oursTitle": "HeatFlex heated cushion",
  "mcell.comparisons.0.oursLines":
    "A structural design that distributes heat evenly across the entire surface provides stable heating across the whole textile rather than at a single point.\nThe combination of high-precision electrode dispersion and carbon nano conductive ink maintains a consistent heat balance without temperature deviation, and prevents overheating or localized concentration even during extended use.",
  "mcell.comparisons.1.heading": "",
  "mcell.comparisons.1.subheading": "",
  "mcell.comparisons.1.description": "",
  "mcell.comparisons.1.competitorTitle": "Competitor heated cushion",
  "mcell.comparisons.1.competitorLines":
    "Conventional heating materials have low conduction efficiency and uneven heating structures, so heat does not spread evenly even with the same energy, and they show large differences in response speed and temperature retention.\nIn particular, in low-power environments heating can be incomplete or initial performance may not be maintained consistently.",
  "mcell.comparisons.1.oursTitle": "HeatFlex heated cushion",
  "mcell.comparisons.1.oursLines":
    "HeatFlex reaches the target temperature within 10 seconds of operation and achieves over 99% heating efficiency even under low-power conditions.\nBased on a uniformly dispersed carbon conductive layer and high-precision electrode structure, it delivers excellent performance in heating speed, heat retention and efficiency relative to power consumption.",

  // Platform
  "mcell.platform.heading": "Scalability of the technology",
  "mcell.platform.title": "Beyond heating technology, toward a smart material platform",
  "mcell.platform.description":
    "We are preparing to expand into the global market based on eco-friendly, high-performance materials.",
  "mcell.platform.banner":
    "MCELL is completing a smart material platform for eco-friendly, high-performance and global expansion.",

  // Industries
  "mcell.industries.heading": "Industries",
  "mcell.industries.title": "MCELL technology expanding now and into the future",
  "mcell.industries.description":
    "Already applied across a wide range of industries, with strong potential for future expansion.",

  // Cooperation
  "mcell.cooperation.heading": "Technology partnerships",
  "mcell.cooperation.title": "Technology collaboration with diverse companies and institutions",
  "mcell.cooperation.description":
    "Joint development and supply agreements are strengthening our path to commercialization.",

  // OEM banner
  "mcell.oemBanner.lines":
    "Based on accumulated heating technology and production know-how,\nMCELL works with diverse brands to build products together from planning and development to mass production.",

  // OEM blocks
  "mcell.oemBlocks.0.title": "Smart wear",
  "mcell.oemBlocks.0.subtitle": "Heated apparel solutions that combine function and everyday style",
  "mcell.oemBlocks.0.lines":
    "MCELL's HEAT-FLEX maintains flexibility and breathability while\ndelivering stable heating performance, so it applies naturally to golf wear, sportswear, everyday clothing and\nother smart apparel products. From textile design tailored to a brand's concept\nto integrated battery structures,\nwe consider both design and technology together.",
  "mcell.oemBlocks.1.title": "Healthcare",
  "mcell.oemBlocks.1.subtitle": "Warm technology that cares for people, a choice for a healthier daily life",
  "mcell.oemBlocks.1.lines":
    "MCELL's heating technology delivers gentle far-infrared warmth,\noptimized for healthcare products such as heat packs, sleep-assist mats and heated eye masks.\nThrough OEM/ODM, we enable product planning that considers both a brand's direction\nand user safety.",
  "mcell.oemBlocks.2.title": "Home appliances",
  "mcell.oemBlocks.2.subtitle": "Warmer and more efficient everyday spaces",
  "mcell.oemBlocks.2.lines":
    "Based on high-efficiency heating materials, MCELL provides customized heating solutions\nfor home appliances such as heated mats, heated cushions and\nsmart heating systems.\nFrom component-level supply to co-development of finished products,\nflexible collaboration is possible.",

  // R&D
  "mcell.rnd.heading": "R&D & MANUFACTURING",
  "mcell.rnd.title": "MCELL builds and verifies everything in-house",

  // OEM proof
  "mcell.oemProof.heading": "PARTNERSHIP & PROOF",
  "mcell.oemProof.title": "MCELL with proven trust and track record",

  // Proof items
  "mcell.proof.0.title": "MOUs signed",
  "mcell.proof.0.lines":
    "7 MOUs signed with domestic and international companies,\nsecuring technology trust across diverse industries",
  "mcell.proof.1.title": "Partners secured",
  "mcell.proof.1.lines":
    "Discovered 13+ new partner companies and\njoint development is underway",
  "mcell.proof.2.title": "Government projects",
  "mcell.proof.2.lines":
    "10 government R&D projects completed,\nvalidating technology and building public trust",
  "mcell.proof.3.title": "Technology awards",
  "mcell.proof.3.lines":
    "5 technology-related awards, recognized for heating materials\nand their applications",
  "mcell.proof.4.title": "Patents registered",
  "mcell.proof.4.lines":
    "4 domestic and 3 overseas registrations completed\n→ 7 registered patents in total",
  "mcell.proof.5.title": "Factory & quality certification",
  "mcell.proof.5.lines":
    "Factory registration completed, ISO certification and mass-production system\nestablished, securing production stability and quality certification",
};

/**
 * about(/about, /about/history, /about/certifications, /about/contact) 영어 기본 문구.
 * EN 사전에 없는 키는 한국어 기본값으로 폴백한다.
 */
export const EN_ABOUT: Record<string, string> = {
  "about.ceo.banner.title": "CEO Message",
  "about.ceo.banner.quote": '"MCELL, leading smart textile technology"',
  "about.ceo.paragraphs":
    "MCELL is a technology-based startup developing smart textiles for a variety of uses with advanced nano-coating technology.\nSince its founding in August 2015, we have continued research and development on carbon heating textiles, stretch-sensing sensors and hydrogen fuel cells.\nBy providing core technology components for a range of smart apparel and bedding products combined with information and communication technology, we deliver smart devices for a more comfortable life.\n\nMCELL is focused on developing high-quality heating materials based on carbon nanotubes.\nCarbon nanotubes are a carbon composite material characterized by high strength, high efficiency and light weight, and because of their high conductivity they are used in a wide range of applications.\nThey are already widely used in sports and leisure, and are also used as cutting-edge materials in apparel, sleep and medical fields.\n\nMCELL will continue to make relentless efforts to develop future-oriented, eco-friendly advanced materials,\nand we will serve our customers with the attitude of providing the best products and satisfaction.\nWe promise to lead change and innovation in the carbon heating textile field and to grow into a global company, not just one that stays in Korea.",
  "about.ceo.signature": "All MCELL employees",
  "about.contact.banner.lines.0": "Leave us your inquiry",
  "about.contact.banner.lines.1": "and we will reply quickly and in detail",
};

/**
 * 연혁 (about.history) 영어 기본 목록 — data/about.ts 한국어 기본값의 EN 사본.
 * locale=en 이고 EN DB 행이 없을 때 사용한다.
 */
export const EN_HISTORY: { year: string; events: string[] }[] = [
  { year: "2015", events: ["MCell founded"] },
  { year: "2016", events: ["Investment from FuturePlay"] },
  { year: "2017", events: ["TIPS program"] },
  { year: "2018", events: ["Defense Venture business"] },
  { year: "2019", events: ["HEAT-FLEX launched"] },
  {
    year: "2020",
    events: [
      "Ministry of Land smart construction technology R&D project",
      "Hyundai Motor ZERO ONE program",
    ],
  },
  { year: "2021", events: ["Investment from Huvis", "Selected for Startup Growth Technology R&D project"] },
  { year: "2022", events: ["Anseong, Gyeonggi factory established"] },
  { year: "2023", events: ["Conditional purchase R&D project"] },
  { year: "2023.00", events: ["Selected as a promising SME of Gyeonggi Province"] },
  { year: "2024", events: ["Selected for the Regional Legend 50+ program"] },
  { year: "2024.00", events: ["MOU signed with KyungDong Navien for next-generation mat development"] },
];

/**
 * 오피스 (about.contact.offices) 영어 기본 목록 — data/contact.ts 한국어 기본값의 EN 사본.
 * locale=en 이고 EN DB 행이 없을 때 사용한다. mapSrc/tel/email 은 언어 무관이라 KO와 동일.
 */
export const EN_OFFICES: {
  name: string;
  mapSrc: string;
  tel: string;
  email: string;
  address: string;
}[] = [
  {
    name: "Headquarters",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.193961517312!2d127.0924654762911!3d37.40889013315143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca708858c7857%3A0x16ff2dd565dca11d!2z7ISx64Ko6riA66Gc67KM7Jy17ZWp7IS87YSw!5e0!3m2!1sko!2skr!4v1747197067399!5m2!1sko!2skr",
    tel: "+8270-4333-5233",
    email: "contact@mcell.co.kr",
    address: "Global Convergence Center A401, 46 Dallaenae-ro, Sujeong-gu, Seongnam-si, Gyeonggi-do, Korea",
  },
  {
    name: "Research Lab",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.87487055068!2d127.3411454762781!3d37.0366297543357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3564b5a1b930ce3b%3A0xac5c7ac0ec884aff!2z6rK96riw64-EIOyViOyEseyLnCDsgrzso73rqbQg642V6rOE7IukMuq4uCA2NA!5e0!3m2!1sko!2skr!4v1747197105171!5m2!1sko!2skr",
    tel: "+8270-4333-5233",
    email: "contact@mcell.co.kr",
    address: "64, Deokgyesil 2-gil, Samjuk-myeon, Anseong-si, Gyeonggi-do, Korea",
  },
];
