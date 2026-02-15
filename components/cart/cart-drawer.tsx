"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/mock-data"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingBag className="h-5 w-5" />
            Carrinho ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Seu carrinho esta vazio</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Adicione produtos para comecar suas compras.
              </p>
            </div>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link href="/">Continuar comprando</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.color}`} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="line-clamp-2 text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Cor: {item.color}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(item.price)}
                      </p>
                      <div className="mt-auto flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.color, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.color, item.quantity + 1)
                          }
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.productId, item.color)}
                          aria-label="Remover item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Frete e descontos calculados no checkout.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild size="lg" onClick={() => onOpenChange(false)}>
                  <Link href="/checkout">Finalizar compra</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/carrinho">Ver carrinho completo</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
