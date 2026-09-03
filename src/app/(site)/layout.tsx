import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileDrawer from "@/components/layout/MobileDrawer";
import ImageViewer from "@/components/ui/ImageViewer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MobileDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
      <ImageViewer />
    </>
  );
}
