"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard, { Product } from "./product/product-card";
import { Image } from "@/types/components/landing/HeroSection";
import { Category } from "./categories-section";

export interface Offer {
  id: number;
  name: string;
  description: string;
  price: string;
  sale_price: string;
  has_offer: boolean;
  discount_percentage: number;
  badge: string | null;
  stock_quantity: number;
  images: Image[];
  category: Category;
  reviews_count: number;
  reviews_avg_rating: number;
}

interface ProductsSectionProps {
  products: Product[];
}

export default function ProductsSection({
  products,
}: Readonly<ProductsSectionProps>) {
  return (
    <section className="border-t border-border bg-muted/30 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Produtos em Destaque
            </h2>
            <p className="mt-1 text-muted-foreground">
              Os melhores precos em tecnologia
            </p>
          </div>
          <Link
            href="/produtos"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile: Ver todos */}
        <Link
          href="/produtos"
          className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
        >
          Ver todos os produtos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
