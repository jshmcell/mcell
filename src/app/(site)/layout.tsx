import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileDrawer from "@/components/layout/MobileDrawer";
import ImageViewer from "@/components/ui/ImageViewer";
import { getCurrentUser } from "@/lib/session";
import { getSiteSettings } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const settings = await getSiteSettings();

  return (
    <>
      <Header user={user} settings={{ companyName: settings.company.name }} />
      <MobileDrawer user={user} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <ImageViewer />
    </>
  );
}
