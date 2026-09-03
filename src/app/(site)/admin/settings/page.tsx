import { prisma } from "@/lib/prisma";
import { SITE_SETTING_KEYS } from "@/lib/site-settings";
import SiteSettingsPanel from "@/components/admin/SiteSettingsPanel";

/** /admin/settings — 사이트 설정 (회사/연락처/소셜) */
export default async function AdminSettingsPage() {
  const rows = await prisma.siteSetting.findMany();
  const values: Record<string, string> = {};
  for (const r of rows) values[r.key] = r.value;

  return (
    <div>
      <p className="mb-4 text-[13px] text-ink/60">
        사이트 전역에 반영되는 회사·연락처·소셜 정보를 관리합니다.
      </p>
      <SiteSettingsPanel defs={SITE_SETTING_KEYS} values={values} />
    </div>
  );
}
