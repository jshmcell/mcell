import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { industries } from "@/data/home";

export default function Industries() {
  return (
    <section className="bg-[#f5f4f4]">
      <div className="container-site pb-[48px] pt-[102px] md-header:pb-[110px] md-header:pt-[110px]">
        <div className="my-[15px] grid grid-cols-1 items-start gap-y-[15px] md-header:grid-cols-[31.76%_1fr] md-header:gap-[30px] md-header:gap-y-0">
          <Reveal direction="fade" duration={0.7}>
            <h2 className="text-[20px] font-bold leading-[35px] text-navy-900 md-header:pt-[110px] md-header:text-[30px] md-header:leading-[36px]">
              {industries.title}
              <span className="block md-header:mt-[13px]">
                {industries.subtitle}
              </span>
            </h2>
          </Reveal>

          <Reveal direction="fade" duration={2}>
            <div className="grid grid-cols-2 gap-[5px] py-[5px] md-header:grid-cols-3 md-header:gap-[10px]">
              {industries.items.map((item) => (
                <Link
                  key={item.label}
                  href="/shop"
                  className="group relative block transition-transform duration-300 ease-out hover:-translate-y-[17px]"
                >
                  {/* thumb ↔ full image crossfade on hover (imweb gallery behavior) */}
                  <div className="relative h-[224px] overflow-hidden border border-[#eee] bg-white md-header:h-[355px]">
                    <Image
                      src={item.thumb}
                      alt={item.label}
                      fill
                      sizes="(max-width: 991px) 50vw, 27vw"
                      className="object-cover transition-opacity duration-[400ms] group-hover:opacity-0"
                    />
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 991px) 50vw, 27vw"
                      className="object-cover opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
                    />
                  </div>
                  <div className="bg-white px-[10px] py-[10px] text-center">
                    <p className="text-[14px] leading-[22.4px] text-[#212121]">
                      {item.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
