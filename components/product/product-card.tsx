"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useLikes } from "@/contexts/likes-context";
import { cn } from "@/lib/utils";
import { Image as ImageInterface } from "@/types/components/landing/HeroSection";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Category } from "../categories-section";
import Badge from "./badge";
import StarRating from "./star-rating";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  sale_price: string;
  has_offer: boolean;
  discount_percentage: number;
  badge: string | null;
  stock_quantity: number;
  images: ImageInterface[];
  category: Category;
  reviews_count: number;
  reviews_avg_rating: number;
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: Readonly<ProductCardProps>) {
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const { isLiked, toggleItem } = useLikes();
  const liked = isLiked(String(product.id));

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      {/* Badge */}
      <Badge type={"discount"} discountPercent={product.discount_percentage} />

      {/* Like Button */}
      <button
        type="button"
        onClick={() =>
          toggleItem({
            productId: String(product.id),
            name: product.name,
            price: Number.parseFloat(product.price),
            image: product.images[0]?.url || "/placeholder.svg",
            color: "Padrao",
          })
        }
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
        aria-label={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            liked
              ? "fill-destructive text-destructive"
              : "text-muted-foreground",
          )}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        {!imageError ? (
          <Image
            src={product.images[0]?.url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-secondary to-muted">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-8 w-8 text-primary/60" />
              </div>
              <span className="text-xs text-muted-foreground">
                Imagem em breve
              </span>
            </div>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/5 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            className="translate-y-4 transition-transform group-hover:translate-y-0"
            asChild
          >
            <Link href={`/produtos/item/${product.slug}`}>
              <Eye className="mr-2 h-4 w-4" />
              Ver mais
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating */}
        <StarRating
          rating={product.reviews_avg_rating}
          reviewCount={product.reviews_count}
        />

        {/* Title & Description */}
        <h3 className="mt-2 line-clamp-1 font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(Number(product.sale_price))}
          </span>
          {!!product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(Number(product.price))}
            </span>
          )}
        </div>

        {/* Installment */}
        <p className="mt-1 text-xs text-muted-foreground">
          ou 12x de {formatPrice(Number(product.sale_price) / 12)}
        </p>

        {/* Add to Cart Button */}
        <Button
          className="mt-4 w-full gap-2"
          size="sm"
          onClick={() =>
            addItem({
              productId: String(product.id),
              name: product.name,
              price: Number(product.sale_price),
              image: product.images[0]?.url || "/placeholder.svg",
              color: "Padrao",
              quantity: 1,
            })
          }
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
}
