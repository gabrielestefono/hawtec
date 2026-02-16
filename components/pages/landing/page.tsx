"use client";

import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductsSection } from "@/components/products-section";
import { OffersSection } from "@/components/offers-section";
import { BestsellersSection } from "@/components/bestsellers-section";
import { ContactSection } from "@/components/contact-section";
import DefaultLayout from "@/layouts/DefaultLayout";

export default function Home() {
  return (
    <DefaultLayout>
      <HeroSection />
      {/* <CategoriesSection /> */}
      {/* <ProductsSection /> */}
      {/* <OffersSection /> */}
      {/* <BestsellersSection /> */}
      {/* <ContactSection /> */}
    </DefaultLayout>
  );
}
