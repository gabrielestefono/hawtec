import { Category } from "@/components/categories-section";
import { Product } from "@/components/product/product-card";
import { Offer } from "@/components/products-section";
import { BannerSlide } from "@/types/components/landing/HeroSection";
import { off } from "node:cluster";

export interface Landing {
  banners: BannerSlide[];
  categories: Category[];
  products: Product[];
  offers: Offer[];
  bestsellers: Product[];
}
