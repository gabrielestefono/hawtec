"use client";

import {
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ColorSelector } from "./color-selector";
import { QuantitySelector } from "./quantity-selector";
import { useCart } from "@/contexts/cart-context";
import { useLikes } from "@/contexts/likes-context";
import StarRating from "./star-rating";
import { ProductComplete } from "@/types/components/products";

interface ProductInfoProps {
  product: ProductComplete;
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function ProductInfo({ product }: Readonly<ProductInfoProps>) {
  const { addItem } = useCart();
  const { isLiked, toggleItem } = useLikes();
  const liked = isLiked(product.id);

  return (
    <div className="flex flex-col gap-6">
      {/* Badge & Brand */}
      <div className="flex items-center gap-3">
        {product.badge?.badge_type === "discount" &&
          product.badge?.discountPercentage && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{product.badge?.discountPercentage}%
            </Badge>
          )}
        {product.badge?.badge_type === "new" && (
          <Badge className="bg-accent text-accent-foreground">Novo</Badge>
        )}
        {product.badge?.badge_type === "highlight" && (
          <Badge className="bg-primary text-primary-foreground">Destaque</Badge>
        )}
        <span className="text-sm font-medium text-muted-foreground">
          {product.product.brand}
        </span>
        <span className="text-xs text-muted-foreground">
          SKU: {product.sku}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight text-foreground text-balance lg:text-3xl">
        {product.product.name} • {product.variant_label}
      </h1>

      {/* Rating */}
      <StarRating
        rating={product.reviews_avg_rating ?? 0}
        reviewCount={product.reviews_count}
      />

      {/* Short Description */}
      <p className="leading-relaxed text-muted-foreground">
        {product.product.description}
      </p>

      <Separator />

      {/* Price Block */}
      <div className="flex flex-col gap-1">
        {product.offer && (
          <span className="text-sm text-muted-foreground line-through">
            De {formatPrice(product.price)}
          </span>
        )}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-foreground">
            {formatPrice(product.offer?.offer_price ?? product.price)}
          </span>
          {product.offer && (
            <span className="text-sm font-medium text-accent">
              Economize {formatPrice(product.price - product.offer.offer_price)}
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          ou 12x de{" "}
          <span className="font-medium text-foreground">
            FAZER ESSA PARTE APÓS IMPLEMENTAR O PAGAMENTO!!!
          </span>{" "}
          sem juros
        </span>
        <span className="mt-1 text-sm font-medium text-accent">
          {formatPrice((product.offer?.offer_price ?? product.price) * 0.9)} no
          PIX (10% off)
        </span>
      </div>

      <Separator />

      {/* Color */}
      {/* <ColorSelector colors={product.grouped_specs.selectable} /> */}

      {/* Quantity */}
      <QuantitySelector max={product.stock_quantity} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          size="lg"
          className="gap-2 text-base"
          // onClick={() =>
          //   addItem({
          //     productId: product.id,
          //     name: product.name,
          //     price: product.price,
          //     image: product.images[0].url ?? "/placeholder.svg",
          //     color: firstAvailableColor,
          //     quantity: 1,
          //   })
          // }
        >
          <ShoppingCart className="h-5 w-5" />
          Adicionar ao carrinho
        </Button>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1 gap-2 text-base"
          >
            <Zap className="h-5 w-5" />
            Comprar agora
          </Button>
          <Button
            variant="outline"
            size="lg"
            // onClick={() =>
            //   toggleItem({
            //     productId: product.id,
            //     name: product.name,
            //     price: product.price,
            //     image: product.images[0].url ?? "/placeholder.svg",
            //     color: firstAvailableColor,
            //   })
            // }
            className="px-4"
            aria-label={
              liked ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                liked
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground",
              )}
            />
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-secondary/30 p-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              Frete gratis
            </span>
            <span className="text-xs text-muted-foreground">
              Acima de R$ 299
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              Garantia
            </span>
            <span className="text-xs text-muted-foreground">2 anos HawTec</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <RotateCcw className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              Troca facil
            </span>
            <span className="text-xs text-muted-foreground">Ate 30 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
