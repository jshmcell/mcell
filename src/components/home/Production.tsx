import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { production } from "@/data/home";

export default function Production() {
  return (
    <section className="bg-white">
      <div className="container-site py-20">
        <Reveal>
          <h2 className="text-[30px] font-bold text-navy-900">{production.title}</h2>
          <p className="mt-4 text-[18px] leading-8">{production.description}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {production.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="flex h-full flex-col items-center overflow-hidden rounded-[20px] bg-[#fafafa] px-6 py-10 text-center">
                <Image src={card.icon} alt="" width={74} height={74} className="h-[74px] w-[74px]" />
                <h3 className="mt-4 text-[20px] font-bold leading-8">{card.title}</h3>
                <div className="mt-4 w-full rounded-[20px] bg-white px-4 py-6 text-[14px] leading-6">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}