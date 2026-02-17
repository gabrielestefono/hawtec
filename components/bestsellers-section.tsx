"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLikes } from "@/contexts/likes-context"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: {
    text: string
    variant: "new" | "discount" | "bestseller" | "limited"
  }
  discountPercent?: number
  installments?: {
    quantity: number
    value: number
  }
  soldToday: number
}

const bestsellers: Product[] = [
  {
    id: "best-1",
    name: "MacBook Air M3 256GB",
    image: "/placeholder.svg?height=200&width=200",
    price: 9499.0,
    originalPrice: 10999.0,
    rating: 4.9,
    reviews: 523,
    badge: { text: "Mais Vendido", variant: "bestseller" },
    discountPercent: 14,
    installments: { quantity: 12, value: 791.58 },
    soldToday: 47,
  },
  {
    id: "best-2",
    name: "iPhone 15 Pro 128GB",
    image: "/placeholder.svg?height=200&width=200",
    price: 7299.0,
    originalPrice: 7999.0,
    rating: 4.8,
    reviews: 891,
    badge: { text: "-9%", variant: "discount" },
    discountPercent: 9,
    installments: { quantity: 12, value: 608.25 },
    soldToday: 38,
  },
  {
    id: "best-3",
    name: "Samsung Galaxy S24 Ultra",
    image: "/placeholder.svg?height=200&width=200",
    price: 6499.0,
    originalPrice: 7499.0,
    rating: 4.7,
    reviews: 445,
    badge: { text: "-13%", variant: "discount" },
    discountPercent: 13,
    installments: { quantity: 12, value: 541.58 },
    soldToday: 31,
  },
  {
    id: "best-4",
    name: "AirPods Pro 2ª Geração",
    image: "/placeholder.svg?height=200&width=200",
    price: 1799.0,
    originalPrice: 2299.0,
    rating: 4.9,
    reviews: 1203,
    badge: { text: "-22%", variant: "discount" },
    discountPercent: 22,
    installments: { quantity: 10, value: 179.9 },
    soldToday: 89,
  },
  {
    id: "best-5",
    name: "iPad Air 5ª Geração",
    image: "/placeholder.svg?height=200&width=200",
    price: 5299.0,
    originalPrice: 5999.0,
    rating: 4.8,
    reviews: 334,
    badge: { text: "Mais Vendido", variant: "bestseller" },
    discountPercent: 12,
    installments: { quantity: 12, value: 441.58 },
    soldToday: 26,
  },
  {
    id: "best-6",
    name: "Monitor LG UltraWide 34\"",
    image: "/placeholder.svg?height=200&width=200",
    price: 2899.0,
    originalPrice: 3499.0,
    rating: 4.6,
    reviews: 267,
    badge: { text: "-17%", variant: "discount" },
    discountPercent: 17,
    installments: { quantity: 12, value: 241.58 },
    soldToday: 19,
  },
  {
    id: "best-7",
    name: "PlayStation 5 Slim Digital",
    image: "/placeholder.svg?height=200&width=200",
    price: 3499.0,
    originalPrice: 3999.0,
    rating: 4.9,
    reviews: 678,
    badge: { text: "Mais Vendido", variant: "bestseller" },
    discountPercent: 13,
    installments: { quantity: 12, value: 291.58 },
    soldToday: 52,
  },
  {
    id: "best-8",
    name: "Teclado Mecânico Keychron K2",
    image: "/placeholder.svg?height=200&width=200",
    price: 599.0,
    originalPrice: 799.0,
    rating: 4.7,
    reviews: 445,
    badge: { text: "-25%", variant: "discount" },
    discountPercent: 25,
    installments: { quantity: 6, value: 99.83 },
    soldToday: 34,
  },
]

function getBadgeStyles(variant: string) {
  switch (variant) {
    case "new":
      return "bg-accent text-accent-foreground"
    case "discount":
      return "bg-destructive text-destructive-foreground"
    case "bestseller":
      return "bg-primary text-primary-foreground"
    case "limited":
      return "bg-foreground text-background"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { isLiked, toggleItem } = useLikes()
  const liked = isLiked(product.id)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg">
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-semibold ${getBadgeStyles(product.badge.variant)}`}
          >
            {product.badge.text}
          </span>
        )}

        {/* Like button */}
        <button
          type="button"
          onClick={() =>
            toggleItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image || "/placeholder.svg",
              color: "Padrao",
            })
          }
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${liked ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </button>

        {/* Sold today indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 backdrop-blur-sm">
          <TrendingUp className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-medium text-foreground">
            {product.soldToday} vendidos hoje
          </span>
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
          <Link href={`/produto/${product.id}`}>
            <Button variant="secondary" size="sm" className="shadow-lg">
              Ver mais
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Product name */}
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-foreground">
          {product.name}
        </h3>

        {/* Prices */}
        <div className="flex flex-col gap-0.5">
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <span className="text-lg font-bold text-foreground">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          {product.installments && (
            <span className="text-xs text-muted-foreground">
              ou {product.installments.quantity}x de{" "}
              <span className="text-foreground">
                R$ {product.installments.value.toFixed(2).replace(".", ",")}
              </span>
            </span>
          )}
        </div>

        {/* Add to cart */}
        <Button
          className="mt-auto w-full gap-2"
          size="sm"
          onClick={() =>
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image || "/placeholder.svg",
              color: "Padrao",
              quantity: 1,
            })
          }
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </div>
  )
}

export function BestsellersSection() {
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
  )
}
