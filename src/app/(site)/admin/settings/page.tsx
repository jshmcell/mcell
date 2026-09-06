import { prisma } from "@/lib/prisma";
import { SITE_SETTING_KEYS } from "@/lib/site-settings";
import { getLocale } from "@/i18n/server";
import { adminDict } from "@/i18n/admin";
import SiteSettingsPanel from "@/components/admin/SiteSettingsPanel";

/** /admin/settings — 사이트 설정 (회사/연락처/소셜) */
export default async function AdminSettingsPage() {
  const rows = await prisma.siteSetting.findMany();
  const values: Record<string, string> = {};
  for (const r of rows) values[r.key] = r.value;
  const locale = await getLocale();
  const t = adminDict[locale].settings;

  return (
    <div>
      <p className="mb-4 text-[13px] text-ink/60">{t.blurb}</p>
      <SiteSettingsPanel defs={SITE_SETTING_KEYS} values={values} />
    </div>
  );
}
