import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";

export const metadata: Metadata = {
  title: "SHOP",
};

export default function ShopPage() {
  return (
    <>
      <SubHero groupLabel="SHOP" title="SHOP" currentHref="/shop" />
      <section className="bg-white">
        <div className="container-site py-20 text-center">
          <p className="text-[18px] text-ink">
            엠셀의 기술력으로 완성된 다양한 제품을 만나보세요.
          </p>
          <p className="mt-10 text-[15px] text-ink/50">준비 중입니다.</p>
        </div>
      </section>
    </>
  );
}