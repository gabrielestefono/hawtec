"use client";

import { BestsellersSection } from "@/components/bestsellers-section";
import { CategoriesSection } from "@/components/categories-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { OffersSection } from "@/components/offers-section";
import ProductsSection from "@/components/products-section";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Landing } from "@/types/components/landing";

export default function Home({
  banners,
  categories,
  products,
  offers,
  bestsellers,
}: Readonly<Landing>) {
  return (
    <DefaultLayout>
      <HeroSection bannerSlides={banners} />
      <CategoriesSection categories={categories} />
      <ProductsSection variants={products} />
      <OffersSection offers={offers} />
      <BestsellersSection bestsellers={bestsellers} />
      <ContactSection />
    </DefaultLayout>
  );
}
