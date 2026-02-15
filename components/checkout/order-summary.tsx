"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/mock-data"

interface OrderSummaryProps {
  shipping?: number
  discount?: number
}

export function OrderSummary({ shipping = 0, discount = 0 }: OrderSummaryProps) {
  const { items, subtotal } = useCart()
  const [collapsed, setCollapsed] = useState(true)
  const total = subtotal - discount + shipping

  return (
    <Card>
      <CardHeader className="pb-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-between lg:pointer-events-none"
        >
          <CardTitle className="text-base">Resumo do pedido</CardTitle>
          <span className="lg:hidden">
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </span>
        </button>
      </CardHeader>
      <CardContent className={collapsed ? "hidden lg:block" : ""}>
        {/* Items */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={`${item.productId}-${item.color}`} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1">
                <p className="line-clamp-1 text-sm text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.color}</p>
              </div>
              <span className="text-sm font-medium text-foreground">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Totals */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frete</span>
            <span className={shipping === 0 ? "font-medium text-accent" : "text-foreground"}>
              {shipping === 0 ? "Gratis" : formatPrice(shipping)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span className="text-accent">Desconto</span>
              <span className="text-accent">-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-lg font-bold text-foreground">{formatPrice(total)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          ou 12x de {formatPrice(total / 12)} sem juros
        </p>
      </CardContent>
    </Card>
  )
}
