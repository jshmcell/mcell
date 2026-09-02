import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";

export const metadata: Metadata = {
  title: "이용약관",
};

export default function PolicyPage() {
  return (
    <>
      <SubHero groupLabel="엠셀" title="이용약관" currentHref="/policy" />
      <section className="bg-white">
        <div className="container-site py-16">
          <div className="mx-auto max-w-[840px] space-y-4 text-[15px] leading-7 text-ink/85">
            <h2 className="text-[20px] font-bold text-ink">제 1 조 (목적)</h2>
            <p>
              본 약관은 엠셀(이하 &quot;회사&quot;)이 운영하는 웹사이트의 이용과 관련하여 회사와
              회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
            <h2 className="pt-4 text-[20px] font-bold text-ink">제 2 조 (약관의 효력과 변경)</h2>
            <p>
              본 약관은 웹사이트에 게시함으로써 효력이 발생하며, 회사는 필요한 경우 약관을 변경할 수
              있습니다.
            </p>
            <h2 className="pt-4 text-[20px] font-bold text-ink">제 3 조 (회원의 의무)</h2>
            <p>
              회원은 관련 법령과 본 약관, 공지사항을 준수해야 하며, 회사의 업무에 방해가 되는 행위를
              해서는 안 됩니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}