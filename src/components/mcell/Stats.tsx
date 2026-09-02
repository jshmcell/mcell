"use client";

import Image from "next/image";
import CountUp from "react-countup";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/data/mcell";

export default function Stats() {
  return (
    <section className="bg-[#eaeef2]">
      <div className="container-site grid grid-cols-2 gap-4 py-14 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const num = parseFloat(stat.value.replace(/[^\d.]/g, ""));
          const suffix = stat.value.replace(/[\d.,]/g, "");
          return (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex h-[171px] flex-col items-center justify-center rounded-[15px] bg-navy-900 px-4 text-center text-white">
                <p className="text-[16px]">{stat.label}</p>
                <p className="mt-1 text-[26px] font-bold lg:text-[30px]">
                  <CountUp end={num} decimals={num % 1 !== 0 ? 1 : 0} duration={2} />
                  {suffix}
                </p>
                <p className="mt-2 text-[13px] text-white/80">{stat.note}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}