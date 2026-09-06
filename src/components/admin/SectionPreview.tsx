"use client";

import SmartImage from "@/components/ui/SmartImage";
import type { ResolvedHome } from "@/lib/home-content-resolve";
import type { ResolvedShopHero } from "@/lib/shop-content-resolve";
import type { ShopProduct } from "@/data/shop";

const CTA_LABEL = "→";

function Cta({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-[3px] bg-navy-900 px-4 py-1.5 text-[12px] text-white">
      {label} {CTA_LABEL}
    </span>
  );
}

function HeroPreview({ hero }: { hero: ResolvedHome["hero"][number] }) {
  return (
    <div className="relative min-h-[300px] overflow-hidden">
      <SmartImage src={hero.bg} alt="" fill className="object-cover" sizes="500px" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative flex min-h-[300px] flex-col items-center justify-center px-4 py-8 text-center text-white">
        <SmartImage src={hero.logo} alt="" width={110} height={0} className="h-auto w-[110px]" />
        <p className="mt-3 text-[13px]">{hero.tagline}</p>
        <h3 className="mt-2 whitespace-pre-line text-[20px] leading-[1.5] font-bold">
          {hero.title}
        </h3>
        <p className="mt-2 whitespace-pre-line text-[12px] leading-[2]">{hero.description}</p>
      </div>
    </div>
  );
}

function TechPreview({ tech }: { tech: ResolvedHome["tech"] }) {
  return (
    <div className="relative overflow-hidden p-5">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tech.bg})` }}
      />
      <div className="relative grid grid-cols-1 items-start gap-4">
        <SmartImage
          src={tech.photo}
          alt=""
          width={280}
          height={0}
          className="h-auto w-full rounded-[6px]"
        />
        <div>
          <h3 className="text-[17px] font-bold text-navy-900">{tech.title}</h3>
          <div className="mt-2 text-[12px] leading-[1.9] text-ink">
            {tech.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <SmartImage src={tech.image} alt="" width={240} height={0} className="mt-2 h-auto w-full max-w-[240px]" />
        </div>
      </div>
    </div>
  );
}

function FeaturesPreview({ cards }: { cards: ResolvedHome["features"] }) {
  return (
    <div className="bg-navy-900 p-5">
      <div className="grid grid-cols-2 gap-2.5">
        {cards.map((card) => (
          <div
            key={card.no}
            className="rounded-[10px] bg-white px-2 py-3 text-center"
          >
            <span className="text-[14px]">{card.no}</span>
            <h4 className="mt-1 text-[12px] leading-[1.5] font-bold text-[#2a2a2a]">
              {card.title}
            </h4>
            <div className="mt-1.5 text-[11px] leading-[1.6] text-[#2a2a2a]">
              {card.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerPreview({ layer }: { layer: ResolvedHome["layer"] }) {
  return (
    <div className="relative overflow-hidden p-5">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${layer.bg})` }}
      />
      <div className="absolute inset-0 bg-white/75" />
      <div className="relative">
        <h3 className="text-[19px] font-bold text-navy-900">{layer.title}</h3>
        <div className="mt-2 text-[12px] leading-[1.9] text-ink">
          {layer.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-3">
          <Cta label={layer.cta.label} />
        </div>
      </div>
    </div>
  );
}

function IndustriesPreview({ industries }: { industries: ResolvedHome["industries"] }) {
  return (
    <div className="bg-[#f5f4f4] p-5">
      <h3 className="text-[18px] font-bold leading-[1.6] text-navy-900">
        {industries.title}
        <span className="block">{industries.subtitle}</span>
      </h3>
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {industries.items.map((item) => (
          <div key={item.label}>
            <div className="relative h-[110px] overflow-hidden border border-[#eee] bg-white">
              <SmartImage src={item.thumb} alt="" fill className="object-cover" sizes="150px" />
            </div>
            <div className="bg-white px-1 py-1.5 text-center">
              <p className="text-[11px] text-[#212121]">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertsPreview({ certs }: { certs: ResolvedHome["certs"] }) {
  return (
    <div className="bg-white p-5">
      <h3 className="text-[18px] font-bold text-navy-900">{certs.title}</h3>
      <div className="mt-2 text-[12px] leading-[1.9] text-ink">
        {certs.description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {certs.images.map((img, i) => (
          <div key={i} className="relative h-[80px] overflow-hidden border border-[#eee]">
            <SmartImage src={img.thumb} alt="" fill className="object-cover" sizes="120px" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutBannerPreview({ banner }: { banner: ResolvedHome["aboutBanner"] }) {
  return (
    <div className="relative overflow-hidden">
      <SmartImage src={banner.bg} alt="" fill className="object-cover" sizes="500px" />
      <div className="relative px-5 py-6 text-white">
        <h3 className="text-[18px] font-bold">{banner.title}</h3>
        <p className="mt-2 text-[12px] leading-[1.9]">{banner.description}</p>
        <div className="mt-4 flex justify-end">
          <span className="inline-block rounded-[3px] border border-white px-4 py-1.5 text-[12px]">
            {banner.cta.label} {CTA_LABEL}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProductionPreview({ production }: { production: ResolvedHome["production"] }) {
  return (
    <div className="bg-white p-5">
      <h3 className="text-[18px] font-bold text-navy-900">{production.title}</h3>
      <p className="mt-2 text-[12px] text-ink">{production.description}</p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {production.cards.map((card, i) => (
          <div key={i} className="rounded-[8px] bg-[#fafafa] pb-3 pt-4 text-center">
            <SmartImage
              src={card.icon}
              alt=""
              width={48}
              height={48}
              className="mx-auto h-[48px] w-[48px]"
            />
            <h4 className="mt-2 px-1 text-[11px] leading-[1.5] font-bold text-[#363636]">
              {card.title}
            </h4>
            <div className="mx-2 mt-2 rounded-[3px] bg-white px-1 py-1.5 text-[10px] leading-[1.6] text-[#363636]">
              {card.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatFlexPreview({ heatFlex }: { heatFlex: ResolvedHome["heatFlex"] }) {
  return (
    <div className="relative overflow-hidden p-6 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heatFlex.bg})` }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative text-white">
        <SmartImage src={heatFlex.logo} alt="" width={90} height={0} className="mx-auto h-auto w-[90px]" />
        <h3 className="mt-2 text-[22px] font-bold">{heatFlex.title}</h3>
        <div className="mt-2 text-[12px] leading-[1.9]">
          {heatFlex.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <span className="inline-block rounded-[3px] border border-white px-4 py-1.5 text-[12px]">
            {heatFlex.cta.label} {CTA_LABEL}
          </span>
        </div>
      </div>
    </div>
  );
}

export function HomeSectionPreview({
  section,
  home,
}: {
  section: ResolvedHome[keyof ResolvedHome] extends never ? never : keyof ResolvedHome;
  home: ResolvedHome;
}) {
  switch (section) {
    case "hero":
      return <HeroPreview hero={home.hero[0]} />;
    case "tech":
      return <TechPreview tech={home.tech} />;
    case "features":
      return <FeaturesPreview cards={home.features} />;
    case "layer":
      return <LayerPreview layer={home.layer} />;
    case "industries":
      return <IndustriesPreview industries={home.industries} />;
    case "certs":
      return <CertsPreview certs={home.certs} />;
    case "aboutBanner":
      return <AboutBannerPreview banner={home.aboutBanner} />;
    case "production":
      return <ProductionPreview production={home.production} />;
    case "heatFlex":
      return <HeatFlexPreview heatFlex={home.heatFlex} />;
  }
}

export function ShopHeroPreview({ hero }: { hero: ResolvedShopHero }) {
  return (
    <div className="relative h-[200px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.banner})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative flex h-full flex-col justify-center px-5 text-white">
        <h3 className="text-[26px] font-bold">{hero.title}</h3>
        <p className="mt-2 text-[12px]">{hero.description}</p>
      </div>
    </div>
  );
}

export function ShopProductsPreview({ products }: { products: ShopProduct[] }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 bg-white p-5">
      {products.map((product) => (
        <div key={product.name}>
          <SmartImage
            src={product.image}
            alt={product.name}
            width={160}
            height={0}
            className="h-auto w-full object-cover"
          />
          <div className="py-2 text-center">
            <p className="text-[12px] text-[#212121]">{product.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
