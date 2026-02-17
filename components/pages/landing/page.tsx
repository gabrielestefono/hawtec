"use client";

import { HeroSection } from "@/components/hero-section";
import { CategoriesSection, Category } from "@/components/categories-section";
import { OffersSection } from "@/components/offers-section";
import { BestsellersSection } from "@/components/bestsellers-section";
import { ContactSection } from "@/components/contact-section";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BannerSlide } from "@/types/components/landing/HeroSection";
import { Product } from "@/components/product/product-card";
import ProductsSection from "@/components/products-section";

interface HomeProps {
  banners: BannerSlide[];
  categories: Category[];
  products: Product[];
  offers: Product[];
}

export default function Home({
  banners,
  categories,
  products,
  offers,
}: Readonly<HomeProps>) {
  return (
    <DefaultLayout>
      <HeroSection bannerSlides={banners} />
      <CategoriesSection categories={categories} />
      <ProductsSection products={products} />
      <OffersSection offers={offers} />
      <BestsellersSection />
      <ContactSection />
    </DefaultLayout>
  );
}
