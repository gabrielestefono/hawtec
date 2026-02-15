"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BadgeType = "new" | "discount" | "bestseller" | "limited" | null

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  badge: BadgeType
  discountPercent?: number
  inStock: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14" M3',
    description: "Chip M3 Pro, 18GB RAM, 512GB SSD",
    price: 12499,
    originalPrice: 14999,
    rating: 4.9,
    reviewCount: 128,
    image: "/products/macbook.jpg",
    badge: "discount",
    discountPercent: 17,
    inStock: true,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    description: "256GB, Titânio Natural",
    price: 9499,
    rating: 4.8,
    reviewCount: 256,
    image: "/products/iphone.jpg",
    badge: "bestseller",
    inStock: true,
  },
  {
    id: 3,
    name: "Monitor LG UltraGear 27''",
    description: "4K 144Hz, 1ms, HDR600",
    price: 2899,
    originalPrice: 3499,
    rating: 4.7,
    reviewCount: 89,
    image: "/products/monitor.jpg",
    badge: "discount",
    discountPercent: 17,
    inStock: true,
  },
  {
    id: 4,
    name: "Teclado Keychron Q1 Pro",
    description: "Mecânico, Hot-swap, RGB",
    price: 1299,
    rating: 4.9,
    reviewCount: 67,
    image: "/products/keyboard.jpg",
    badge: "new",
    inStock: true,
  },
  {
    id: 5,
    name: "RTX 4080 Super Gaming",
    description: "16GB GDDR6X, Ray Tracing",
    price: 8999,
    originalPrice: 10499,
    rating: 4.8,
    reviewCount: 45,
    image: "/products/gpu.jpg",
    badge: "discount",
    discountPercent: 14,
    inStock: true,
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    description: "Noise Cancelling, 30h bateria",
    price: 2199,
    rating: 4.9,
    reviewCount: 312,
    image: "/products/headphone.jpg",
    badge: "bestseller",
    inStock: true,
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra",
    description: "512GB, AI Features, S Pen",
    price: 8499,
    originalPrice: 9999,
    rating: 4.7,
    reviewCount: 178,
    image: "/products/samsung.jpg",
    badge: "discount",
    discountPercent: 15,
    inStock: true,
  },
  {
    id: 8,
    name: "SSD Samsung 990 Pro 2TB",
    description: "NVMe M.2, 7450MB/s",
    price: 1199,
    rating: 4.8,
    reviewCount: 234,
    image: "/products/ssd.jpg",
    badge: "new",
    inStock: true,
  },
]

function Badge({ type, discountPercent }: { type: BadgeType; discountPercent?: number }) {
  if (!type) return null

  const badgeConfig = {
    new: {
      label: "Novo",
      className: "bg-accent text-accent-foreground",
    },
    discount: {
      label: `-${discountPercent}%`,
      className: "bg-destructive text-destructive-foreground",
    },
    bestseller: {
      label: "Mais Vendido",
      className: "bg-primary text-primary-foreground",
    },
    limited: {
      label: "Limitado",
      className: "bg-foreground text-background",
    },
  }

  const config = badgeConfig[type]

  return (
    <span
      className={cn(
        "absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-xs font-semibold",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5",
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating} ({reviewCount})
      </span>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      {/* Badge */}
      <Badge type={product.badge} discountPercent={product.discountPercent} />

      {/* Like Button */}
      <button
        type="button"
        onClick={() => setIsLiked(!isLiked)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
        aria-label={isLiked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
          )}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        {!imageError ? (
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShoppingCart className="h-8 w-8 text-primary/60" />
              </div>
              <span className="text-xs text-muted-foreground">Imagem em breve</span>
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
            <Link href={`/produto/${product.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              Ver mais
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating */}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

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
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Installment */}
        <p className="mt-1 text-xs text-muted-foreground">
          ou 12x de {formatPrice(product.price / 12)}
        </p>

        {/* Add to Cart Button */}
        <Button className="mt-4 w-full gap-2" size="sm">
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  )
}

export function ProductsSection() {
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
  )
}
