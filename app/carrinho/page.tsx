"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft, Tag } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/mock-data"

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const [coupon, setCoupon] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  const shipping = subtotal >= 299 ? 0 : 29.90
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount + shipping

  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "hawtec10") {
      setCouponApplied(true)
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Seu carrinho esta vazio</h1>
          <p className="mt-2 text-muted-foreground">
            Explore nossos produtos e adicione algo ao carrinho.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continuar comprando
          </Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" aria-label="Voltar">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          Carrinho ({itemCount} {itemCount === 1 ? "item" : "itens"})
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <Card key={`${item.productId}-${item.color}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary sm:h-28 sm:w-28">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={`/produto/${item.productId}`}
                        className="line-clamp-2 text-sm font-medium text-foreground hover:underline sm:text-base"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">Cor: {item.color}</p>
                      <p className="text-sm font-semibold text-foreground sm:text-base">
                        {formatPrice(item.price)}
                      </p>
                      {item.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </p>
                      )}

                      <div className="mt-auto flex items-center gap-3 pt-2">
                        <div className="flex items-center gap-2 rounded-lg border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.color, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.color, item.quantity + 1)}
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <span className="ml-auto text-sm font-semibold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.productId, item.color)}
                          aria-label="Remover item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="lg:sticky lg:top-24">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Cupom de desconto"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="pl-10"
                    disabled={couponApplied}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleApplyCoupon}
                  disabled={!coupon || couponApplied}
                >
                  {couponApplied ? "Aplicado" : "Aplicar"}
                </Button>
              </div>
              {couponApplied && (
                <p className="text-xs text-accent">Cupom HAWTEC10 aplicado: -10%</p>
              )}

              <Separator />

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-accent">Desconto</span>
                    <span className="text-accent">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className={shipping === 0 ? "font-medium text-accent" : "text-foreground"}>
                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Frete gratis acima de R$ 299
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-base font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                ou 12x de {formatPrice(total / 12)} sem juros
              </p>

              <Button asChild size="lg" className="mt-2">
                <Link href="/checkout">Finalizar compra</Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continuar comprando
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
