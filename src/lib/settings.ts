import "server-only";
import { prisma } from "@/lib/prisma";
import { company as defaultCompany } from "@/data/site";
import { SITE_SETTING_KEYS } from "@/lib/site-settings";

export interface ResolvedSocial {
  label: string;
  href: string;
}

export interface ResolvedSiteSettings {
  company: typeof defaultCompany;
  socials: ResolvedSocial[];
}

/**
 * 사이트 설정 조회 — DB 오버라이드 값을 우선하고, 비어 있으면
 * src/data/site.ts 의 기본값을 사용한다.
 * 서버 컴포넌트에서만 호출 가능 (server-only).
 */
export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  const keys = SITE_SETTING_KEYS.map((k) => k.key);
  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: keys } },
  });
  const db: Record<string, string> = {};
  for (const r of rows) db[r.key] = r.value;

  const pick = (key: string, fallback: string): string => {
    const v = db[key];
    return v === undefined ? fallback : v;
  };

  const company: typeof defaultCompany = {
    ...defaultCompany,
    name: pick("company.name", defaultCompany.name),
    address: pick("company.address", defaultCompany.address),
    lab: pick("company.lab", defaultCompany.lab),
    tel: pick("company.tel", defaultCompany.tel),
    fax: pick("company.fax", defaultCompany.fax),
    email: pick("company.email", defaultCompany.email),
  };

  const socials: ResolvedSocial[] = [
    { label: "Facebook", href: pick("social.facebook", "#") },
    { label: "Instagram", href: pick("social.instagram", "#") },
    { label: "YouTube", href: pick("social.youtube", "#") },
  ];

  return { company, socials };
}
