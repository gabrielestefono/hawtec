"use client"

import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useLikes } from "@/contexts/likes-context"
import { formatPrice } from "@/lib/mock-data"

interface LikesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LikesDrawer({ open, onOpenChange }: LikesDrawerProps) {
  const { addItem } = useCart()
  const { items, itemCount, removeItem } = useLikes()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <Heart className="h-5 w-5" />
            Favoritos ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Voce nao tem favoritos ainda</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Clique no coracao dos produtos para salvar aqui.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.productId}>
                  <div className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <p className="line-clamp-2 text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Cor: {item.color}</p>
                      <p className="text-sm font-semibold text-foreground">{formatPrice(item.price)}</p>
                      <div className="mt-auto flex items-center gap-2">
                        <Button
                          size="sm"
                          className="h-8 gap-1.5 px-3"
                          onClick={() =>
                            addItem({
                              productId: item.productId,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              color: item.color,
                              quantity: 1,
                            })
                          }
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Adicionar ao carrinho
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.productId)}
                          aria-label="Remover dos favoritos"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
