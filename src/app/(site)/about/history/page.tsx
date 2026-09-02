import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import Reveal from "@/components/ui/Reveal";
import { history } from "@/data/about";

export const metadata: Metadata = {
  title: "연혁",
};

export default function HistoryPage() {
  return (
    <>
      <SubHero groupLabel="About" title="연혁" currentHref="/about/history" />
      <section className="bg-white">
        <div className="container-site py-20">
          <ul className="mx-auto max-w-[840px]">
            {history.map((item, i) => (
              <Reveal key={item.year} delay={Math.min(i * 0.05, 0.3)}>
                <li className="flex gap-8 border-b border-black/10 py-6 last:border-0">
                  <strong className="w-[110px] shrink-0 text-[22px] font-bold text-navy-900">
                    {item.year}
                  </strong>
                  <div className="pt-1 text-[16px] leading-7 text-ink">
                    {item.events.map((event) => (
                      <p key={event}>- {event}</p>
                    ))}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}