import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileDrawer from "@/components/layout/MobileDrawer";
import ImageViewer from "@/components/ui/ImageViewer";
import { getLocale } from "@/i18n/server";
import { getCurrentUser } from "@/lib/session";
import { getActor } from "@/lib/roles";
import { getSiteSettings } from "@/lib/settings";
import { getFooterContent } from "@/lib/footer-content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, actor, settings, locale] = await Promise.all([
    getCurrentUser(),
    getActor(),
    getSiteSettings(),
    getLocale(),
  ]);
  const footer = await getFooterContent(locale);
  const headerUser = user
    ? { ...user, isAdmin: actor?.isAdmin ?? false }
    : null;

  return (
    <>
      <Header user={headerUser} settings={{ companyName: settings.company.name }} />
      <MobileDrawer user={headerUser} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} content={footer} locale={locale} />
      <ImageViewer />
    </>
  );
}
