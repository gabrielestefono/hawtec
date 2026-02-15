import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { ProductsSection } from "@/components/products-section"
import { OffersSection } from "@/components/offers-section"
import { BestsellersSection } from "@/components/bestsellers-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <ProductsSection />
        <OffersSection />
        <BestsellersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
