import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { platform, industries, cooperation } from "@/data/mcell";

export default function Platform() {
  return (
    <>
      <section className="bg-white">
        <div className="container-site py-20 text-center">
          <Reveal>
            <p className="text-[18px] font-bold text-navy-900">{platform.heading}</p>
            <h2 className="mt-2 text-[30px] font-bold text-navy-900">{platform.title}</h2>
            <p className="mt-3 text-[16px]">{platform.description}</p>
            <Image
              src={platform.image}
              alt={platform.title}
              width={1173}
              height={0}
              className="mx-auto mt-10 h-auto w-full max-w-[1173px]"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 bg-navy-900 py-10 text-[20px] font-bold text-white lg:text-[24px]">
              {platform.banner}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image
          src={industries.image}
          alt={industries.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-site relative py-32 text-white">
          <Reveal>
            <p className="text-[18px] font-bold">{industries.heading}</p>
            <h2 className="mt-2 text-[30px] font-bold">{industries.title}</h2>
            <p className="mt-3 text-[16px]">{industries.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-20 text-center">
          <Reveal>
            <p className="text-[18px] font-bold text-navy-900">{cooperation.heading}</p>
            <h2 className="mt-2 text-[30px] font-bold text-navy-900">{cooperation.title}</h2>
            <p className="mt-3 text-[16px]">{cooperation.description}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {cooperation.logos.map((logo, i) => (
              <Reveal key={logo} delay={i * 0.08}>
                <Image
                  src={logo}
                  alt="협력사"
                  width={300}
                  height={200}
                  className="h-[200px] w-full border border-black/10 object-cover"
                  sizes="300px"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}