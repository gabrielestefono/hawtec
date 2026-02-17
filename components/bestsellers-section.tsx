"use client";

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import ProductCard, { Product } from "./product/product-card";

function getBadgeStyles(variant: string) {
  switch (variant) {
    case "new":
      return "bg-accent text-accent-foreground";
    case "discount":
      return "bg-destructive text-destructive-foreground";
    case "bestseller":
      return "bg-primary text-primary-foreground";
    case "limited":
      return "bg-foreground text-background";
    default:
      return "bg-muted text-muted-foreground";
  }
}

interface BestsellersSectionProps {
  bestsellers: Product[];
}

export function BestsellersSection({
  bestsellers,
}: Readonly<BestsellersSectionProps>) {
  if (bestsellers.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Mais Vendidos do Dia
              </h2>
              <p className="text-sm text-muted-foreground">
                Os produtos que estão bombando agora
              </p>
            </div>
          </div>

          <Link
            href="/mais-vendidos"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
