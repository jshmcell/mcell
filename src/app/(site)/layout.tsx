import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileDrawer from "@/components/layout/MobileDrawer";
import ImageViewer from "@/components/ui/ImageViewer";
import { getCurrentUser } from "@/lib/session";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <Header user={user} />
      <MobileDrawer user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ImageViewer />
    </>
  );
}
