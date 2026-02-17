"use client";

import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { ProductsSection } from "@/components/products-section";
import { OffersSection } from "@/components/offers-section";
import { BestsellersSection } from "@/components/bestsellers-section";
import { ContactSection } from "@/components/contact-section";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BannerSlide } from "@/types/components/landing/HeroSection";

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "Notebooks de Alta Performance",
    subtitle: "Para trabalho e gaming",
    description: "Processadores de última geração e placas de vídeo dedicadas",
    cta: "Ver Notebooks",
    href: "/notebooks",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Smartphones",
    subtitle: "As melhores marcas",
    description: "iPhone, Samsung, Xiaomi e muito mais com garantia estendida",
    cta: "Ver Smartphones",
    href: "/smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Periféricos Gamer",
    subtitle: "Setup completo",
    description: "Teclados, mouses, headsets e monitores para o seu setup",
    cta: "Ver Periféricos",
    href: "/perifericos",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Home() {
  return (
    <DefaultLayout>
      <HeroSection bannerSlides={bannerSlides} />
      <CategoriesSection />
      <ProductsSection />
      <OffersSection />
      <BestsellersSection />
      <ContactSection />
    </DefaultLayout>
  );
}
