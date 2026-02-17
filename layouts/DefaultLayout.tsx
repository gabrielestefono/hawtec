// import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Header } from "@/components/layout/header";
import { PropsWithChildren } from "react";

export default function DefaultLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <Header/>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
