"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

interface Offer {
  id: string
  name: string
  image: string
  originalPrice: number
  discountPrice: number
  discountPercent: number
}

const offers: Offer[] = [
  {
    id: "offer-1",
    name: "Fone Bluetooth TWS",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 199.9,
    discountPrice: 89.9,
    discountPercent: 55,
  },
  {
    id: "offer-2",
    name: "Carregador Turbo 65W",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 149.9,
    discountPrice: 79.9,
    discountPercent: 47,
  },
  {
    id: "offer-3",
    name: "Mouse Gamer RGB",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 259.9,
    discountPrice: 129.9,
    discountPercent: 50,
  },
  {
    id: "offer-4",
    name: "Hub USB-C 7 em 1",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 299.9,
    discountPrice: 159.9,
    discountPercent: 47,
  },
  {
    id: "offer-5",
    name: "Webcam Full HD",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 349.9,
    discountPrice: 189.9,
    discountPercent: 46,
  },
  {
    id: "offer-6",
    name: "SSD 256GB NVMe",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 279.9,
    discountPrice: 149.9,
    discountPercent: 46,
  },
  {
    id: "offer-7",
    name: "Cabo HDMI 2.1 2m",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 89.9,
    discountPrice: 39.9,
    discountPercent: 56,
  },
  {
    id: "offer-8",
    name: "Mousepad XL Gamer",
    image: "/placeholder.svg?height=80&width=80",
    originalPrice: 119.9,
    discountPrice: 59.9,
    discountPercent: 50,
  },
]

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Link
      href={`/produto/${offer.id}`}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={offer.image || "/placeholder.svg"}
          alt={offer.name}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <span className="absolute -right-1 -top-1 rounded-bl-md rounded-tr-md bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
          -{offer.discountPercent}%
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-foreground group-hover:text-primary">
          {offer.name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground line-through">
            R$ {offer.originalPrice.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-sm font-bold text-primary">
            R$ {offer.discountPrice.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function OffersSection() {
  return (
    <section className="bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <Clock className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Ofertas Relâmpago
              </h2>
              <p className="text-sm text-muted-foreground">
                Aproveite antes que acabe
              </p>
            </div>
          </div>

          <Link
            href="/ofertas"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  )
}
